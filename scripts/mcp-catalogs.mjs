import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const services = ['paddle', 'gsc', 'google-ads'];

export function backendCommand(service, args = []) {
  if (!services.includes(service)) throw new Error('Unknown MCP service');
  return { command: path.join(projectDirectory, 'scripts', `${service}-mcp-backend`), args, cwd: projectDirectory };
}

// Discovery commands never load Environment profiles or receive real credentials.
export function discoveryCommand(service) {
  const common = { cwd: projectDirectory, env: {}, stderr: 'pipe' };
  if (service === 'paddle') return {
    ...common,
    command: path.join(projectDirectory, 'node_modules/.bin/paddle'),
    env: { PADDLE_API_KEY: 'catalog-only-placeholder', PADDLE_ENVIRONMENT: 'production', PADDLE_MCP_TOOLS: 'non-destructive' },
  };
  if (service === 'gsc') return { ...common, command: 'python3', args: [path.join(projectDirectory, 'scripts/gsc_mcp_server.py')] };
  if (service === 'google-ads') return { ...common, command: path.join(projectDirectory, '.mcp/google-ads-mcp/bin/google-ads-mcp') };
  throw new Error('Unknown MCP service');
}
