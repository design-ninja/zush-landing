// Homepage hero wave: a field of points rolling like a slow swell, drawn with raw
// WebGL (no library). It is decoration only, so it never competes with the page:
//  - starts when the browser is idle after first paint (not part of LCP);
//  - animates only while the hero is on screen and the tab is visible;
//  - draws one still frame for prefers-reduced-motion;
//  - quietly does nothing when WebGL is unavailable.

const VERT = `
attribute vec3 aPos;
uniform mat4 uProj;
uniform mat4 uView;
uniform float uTime;
uniform float uPR;
uniform float uRotX;
uniform float uRotY;
varying float vAlpha;
varying float vMix;
varying float vGlow;
void main() {
  vec3 p = aPos;
  float w = sin(p.x * 0.28 + uTime * 0.6) * 0.7
          + sin(p.z * 0.42 + uTime * 0.45) * 0.55
          + sin((p.x + p.z) * 0.18 - uTime * 0.32) * 0.95;
  float r = length(p.xz - vec2(0.0, -8.0));
  w += sin(r * 0.55 - uTime * 1.2) * 0.45 * smoothstep(26.0, 4.0, r);
  // A bright band sweeps diagonally across the field.
  float band = sin(aPos.x * 0.1 + aPos.z * 0.07 - uTime * 0.9);
  vGlow = smoothstep(0.72, 1.0, band);
  p.y += w + vGlow * 0.35;
  float cy = cos(uRotY), sy = sin(uRotY);
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  float cx = cos(uRotX), sx = sin(uRotX);
  p = vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
  vec4 mv = uView * vec4(p, 1.0);
  gl_Position = uProj * mv;
  gl_PointSize = (1.8 + (w + 2.2) * 0.55 + vGlow * 1.8) * uPR * (22.0 / -mv.z);
  float edge = 1.0 - smoothstep(20.0, 31.0, abs(aPos.x));
  vAlpha = smoothstep(58.0, 12.0, -mv.z) * edge;
  vMix = clamp((w + 2.2) / 4.4, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
uniform float uOpacity;
varying float vAlpha;
varying float vMix;
varying float vGlow;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.05, d) * vAlpha * uOpacity * (1.0 + vGlow * 0.7);
  vec3 col = mix(mix(uA, uB, vMix), uC, vGlow * 0.85);
  gl_FragColor = vec4(col, min(a, 1.0));
}`;

// a/b: base gradient across the swell; c: the sweeping highlight band.
const THEMES = {
  dark: { a: [0x4b, 0x3b, 0xe0], b: [0xb4, 0xaa, 0xff], c: [0xf1, 0xee, 0xff], opacity: 1, additive: true },
  light: { a: [0x6e, 0x5c, 0xf3], b: [0x9d, 0x8f, 0xff], c: [0x3b, 0x2b, 0xd6], opacity: 1, additive: false },
} as const;

function perspective(fovy: number, aspect: number, near: number, far: number) {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
}

function lookAt(e: number[], c: number[]) {
  let zx = e[0] - c[0], zy = e[1] - c[1], zz = e[2] - c[2];
  let l = Math.hypot(zx, zy, zz);
  zx /= l; zy /= l; zz /= l;
  let xx = zz, xz = -zx; // up (0,1,0) × z
  const xy = 0;
  l = Math.hypot(xx, xy, xz);
  xx /= l; xz /= l;
  const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
  return new Float32Array([
    xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0,
    -(xx * e[0] + xy * e[1] + xz * e[2]), -(yx * e[0] + yy * e[1] + yz * e[2]), -(zx * e[0] + zy * e[1] + zz * e[2]), 1,
  ]);
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
  return s;
}

function startWave(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false, powerPreference: 'low-power' });
  if (!gl) return;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const small = window.innerWidth < 768;
  const COLS = small ? 120 : 240, ROWS = small ? 64 : 110, W = 66, D = 44;
  const pos = new Float32Array(COLS * ROWS * 3);
  let i = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      pos[i++] = (c / (COLS - 1) - 0.5) * W;
      pos[i++] = 0;
      pos[i++] = 8 - (r / (ROWS - 1)) * D;
    }
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(prog, name);
  const uProj = u('uProj'), uTime = u('uTime'), uPR = u('uPR'), uRotX = u('uRotX'), uRotY = u('uRotY');
  const uA = u('uA'), uB = u('uB'), uC = u('uC'), uOpacity = u('uOpacity');
  gl.uniformMatrix4fv(u('uView'), false, lookAt([0, 5.2, 19], [0, -0.6, -6]));
  gl.enable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
  const mouse = { x: 0, y: 0 };
  const rot = { x: 0, y: 0 };
  let t = 6;
  let running = false;
  let inView = true;
  let raf = 0;
  let last = 0;

  const draw = () => {
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, t);
    gl.uniform1f(uRotX, rot.x);
    gl.uniform1f(uRotY, rot.y);
    gl.drawArrays(gl.POINTS, 0, COLS * ROWS);
  };

  const applyTheme = () => {
    const theme = document.documentElement.dataset.theme === 'light' ? THEMES.light : THEMES.dark;
    gl.uniform3fv(uA, theme.a.map((v) => v / 255));
    gl.uniform3fv(uB, theme.b.map((v) => v / 255));
    gl.uniform3fv(uC, theme.c.map((v) => v / 255));
    gl.uniform1f(uOpacity, theme.opacity);
    if (theme.additive) gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    else gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    if (!running) draw();
  };

  const parent = canvas.parentElement ?? canvas;
  const resize = () => {
    const w = parent.clientWidth || 1, h = parent.clientHeight || 1;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniformMatrix4fv(uProj, false, perspective((42 * Math.PI) / 180, w / h, 0.1, 200));
    gl.uniform1f(uPR, dpr);
    if (!running) draw();
  };

  applyTheme();
  resize();
  new ResizeObserver(resize).observe(parent);
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  canvas.dataset.ready = 'true';
  if (reduce) return;

  window.addEventListener('pointermove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  const tick = (now: number) => {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;
    rot.y += (mouse.x * 0.2 - rot.y) * 0.05;
    rot.x += (mouse.y * 0.07 - rot.x) * 0.05;
    draw();
    raf = requestAnimationFrame(tick);
  };

  const sync = () => {
    const should = inView && !document.hidden;
    if (should && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    } else if (!should && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  };

  new IntersectionObserver((entries) => {
    inView = entries[0].isIntersecting;
    sync();
  }).observe(parent);
  document.addEventListener('visibilitychange', sync);
  sync();
}

function boot() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-hero-wave]');
  if (!canvas) return;
  try {
    startWave(canvas);
  } catch {
    // Decoration only: without WebGL the hero stays static.
  }
}

if ('requestIdleCallback' in window) window.requestIdleCallback(boot, { timeout: 2000 });
else setTimeout(boot, 300);
