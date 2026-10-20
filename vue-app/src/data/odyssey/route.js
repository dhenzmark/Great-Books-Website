/*
  Turns the stops into a smooth sea route in map units (see coast.js for the projection),
  with the distance travelled at every point, in map units and in kilometres.
*/
import { MAP } from "./coast.js";
import stops from "./stops.js";

export const project = (lat, lon) => [(lon - MAP.west) * MAP.k * MAP.unit, (MAP.north - lat) * MAP.unit];

function haversineKm([lat1, lon1], [lat2, lon2]) {
  const r = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * r) / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(((lon2 - lon1) * r) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

/* control points: every stop, with its waypoints before it; remember which ones are stops */
const controls = [];
stops.forEach((s, i) => {
  (s.via || []).forEach(([lat, lon]) => controls.push({ ll: [lat, lon] }));
  controls.push({ ll: [s.lat, s.lon], stop: i });
});

/* Catmull-Rom through the control points, sampled evenly per segment */
const SAMPLES = 14;
const pts = []; // { x, y, ll, stop? }
for (let i = 0; i < controls.length - 1; i++) {
  const p0 = controls[Math.max(0, i - 1)].ll, p1 = controls[i].ll, p2 = controls[i + 1].ll, p3 = controls[Math.min(controls.length - 1, i + 2)].ll;
  for (let k = 0; k < SAMPLES; k++) {
    const t = k / SAMPLES, t2 = t * t, t3 = t2 * t;
    const c = (a, b, c2, d) => 0.5 * (2 * b + (-a + c2) * t + (2 * a - 5 * b + 4 * c2 - d) * t2 + (-a + 3 * b - 3 * c2 + d) * t3);
    const ll = [c(p0[0], p1[0], p2[0], p3[0]), c(p0[1], p1[1], p2[1], p3[1])];
    pts.push({ ll, stop: k === 0 ? controls[i].stop : undefined });
  }
}
pts.push({ ll: controls[controls.length - 1].ll, stop: controls[controls.length - 1].stop });

let len = 0, km = 0;
pts.forEach((p, i) => {
  [p.x, p.y] = project(p.ll[0], p.ll[1]);
  if (i) {
    len += Math.hypot(p.x - pts[i - 1].x, p.y - pts[i - 1].y);
    km += haversineKm(pts[i - 1].ll, p.ll);
  }
  p.len = len;
  p.km = km;
});

export const routePoints = pts;
export const totalLength = len;
export const routePath = "M" + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join("L");

/* distance along the route at which each stop sits */
export const stopLengths = stops.map((_, i) => pts.find((p) => p.stop === i).len);
export const stopKm = stops.map((_, i) => pts.find((p) => p.stop === i).km);
export const stopXY = stops.map((s) => project(s.lat, s.lon));

/* the point (and km) at a given distance along the route */
export function pointAt(l) {
  if (l <= 0) return pts[0];
  if (l >= len) return pts[pts.length - 1];
  let lo = 0, hi = pts.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (pts[mid].len < l) lo = mid;
    else hi = mid;
  }
  const a = pts[lo], b = pts[hi], f = (l - a.len) / (b.len - a.len || 1);
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f, km: a.km + (b.km - a.km) * f };
}

export { stops };
