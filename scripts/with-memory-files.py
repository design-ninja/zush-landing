#!/usr/bin/env python3
"""Provide credentials to file-only tools on RAM storage for the child lifetime."""
import argparse
from contextlib import contextmanager
import os
from pathlib import Path
import re
import shutil
import signal
import subprocess
import sys
import tempfile
import uuid


def checked(command):
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError('RAM storage command failed: ' + command[0])
    return result.stdout


@contextmanager
def memory_directory():
    device = None
    directory = None
    try:
        if sys.platform == 'darwin':
            output = checked(['/usr/bin/hdiutil', 'attach', '-nomount', 'ram://32768'])
            match = re.search(r'/dev/disk\d+\b', output)
            if not match:
                raise RuntimeError('Could not identify RAM disk')
            device = match.group(0)
            label = 'ZushMemory-' + uuid.uuid4().hex[:12]
            checked(['/usr/sbin/diskutil', 'eraseVolume', 'HFS+', label, device])
            mount = Path('/Volumes') / label
            if not mount.is_mount():
                raise RuntimeError('RAM disk is not mounted')
            directory = Path(tempfile.mkdtemp(prefix='credentials-', dir=mount))
        elif sys.platform == 'linux':
            if checked(['stat', '-f', '-c', '%T', '/dev/shm']).strip() != 'tmpfs':
                raise RuntimeError('/dev/shm must be tmpfs')
            directory = Path(tempfile.mkdtemp(prefix='zush-credentials-', dir='/dev/shm'))
        else:
            raise RuntimeError('RAM credential files require macOS or Linux')
        os.chmod(directory, 0o700)
        yield directory
    finally:
        if directory is not None:
            shutil.rmtree(directory)
        if device is not None:
            checked(['/usr/bin/hdiutil', 'detach', device])


def run(command, mappings):
    values = []
    for mapping in mappings:
        source, destination, encoding = mapping.split(':')
        if not re.fullmatch(r'[A-Z_][A-Z0-9_]*', source) or not re.fullmatch(r'[A-Z_][A-Z0-9_]*', destination):
            raise ValueError('Invalid environment variable name')
        value = os.environ[source]
        if encoding == 'pem':
            value = value.replace(r'\n', '\n')
        elif encoding != 'text':
            raise ValueError('Unknown file encoding')
        values.append((destination, value))
    with memory_directory() as directory:
        env = dict(os.environ)
        for destination, value in values:
            path = directory / destination
            fd = os.open(path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
            with os.fdopen(fd, 'w') as file:
                file.write(value)
            env[destination] = str(path)
        process = subprocess.Popen(command, env=env)
        previous = {}
        def forward(signum, _frame):
            if process.poll() is None:
                process.send_signal(signum)
        try:
            for sig in (signal.SIGINT, signal.SIGTERM, signal.SIGHUP):
                previous[sig] = signal.signal(sig, forward)
            result = process.wait()
        finally:
            for sig, handler in previous.items():
                signal.signal(sig, handler)
        return result if result >= 0 else 128 - result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--file', action='append', required=True, help='SOURCE_ENV:PATH_ENV:pem|text')
    parser.add_argument('command', nargs=argparse.REMAINDER)
    args = parser.parse_args()
    command = args.command[1:] if args.command[:1] == ['--'] else args.command
    if not command:
        parser.error('A command is required')
    try:
        return run(command, args.file)
    except (OSError, RuntimeError, ValueError, KeyError):
        print('Could not prepare RAM credentials; no disk fallback is allowed.', file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
