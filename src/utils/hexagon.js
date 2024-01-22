function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
  }
  
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
var colors_hex;
var r1, r2, directions;
var n_gons, n_reps;
var seed, rand;
var current_angle;
var display_frame; 
var paused;
colors_hex = [
  ['#f05f57', '#360940'], //good
  ['#c33764', '#1d2671'], //similar to first, choose only one
  ['#81ffef', '#f067b4'], //vaporwave, maybe dump
  ['#b92b27', '#1565c0'], //no good
  ['#99f2c8', '#1f4037'], //green to black ish, looks nice
  ['#1a060e', '#104178'], //dark blue to purple, looks nice
  ['#f7a002', '#190b0c'], //yellow to black ish, not the best
  ['#d20932', '#0c0d11'], //red, too many strong colors if you keep this
  ['#0a5969', '#100b0d'], //teal to black, use instead of green to black
];
n_gons = colors_hex.length ;

const setup = (p5, parentRef) => {
  p5.createCanvas(Math.max(document.getElementById("hero").clientWidth || 0, window.innerWidth || 0), Math.max(document.getElementById("hero").clientHeight || 0, window.innerHeight || 0)).parent(parentRef);
  // p5.createCanvas(document.getElementById("hero").clientWidth, document.getElementById("hero").clientHeight)
  // p5.background('#050816');
  
  seed = cyrb128("SEXXX");
  rand = mulberry32(seed[0]);
  n_reps = 10;
  directions = [];
  r1 = [];
  r2 = [];
  for (let k = 0; k < n_gons; k += 1) {
    directions[k] = Math.sign(p5.map(10*rand(), 0, 10, -1, 1));
    r1[k] =  0.15*p5.map(10*rand(), 0, 10, -1, 1);;
    r2[k] =  0.13*p5.map(10*rand(), 0, 10, -1, 1);;
  }
  paused = false;
  display_frame = 0;
  current_angle = 39;
  p5.frameRate(60);
  p5.pixelDensity(1);
};
const draw = (p5, isMobile) => {
  p5.background('#050816');
  let decriment = [0.01, 0.008];
  for (let j = 0; j < n_gons; j += 1) {
    let start_ramp = p5.color(colors_hex[j][0])
    let end_ramp = p5.color(colors_hex[j][1])
    for (let i = 0; i <= n_reps; i += 1) {
      let inter = p5.map(i, 0, n_reps, 0, 1);
      let interp_color = p5.lerpColor(start_ramp, end_ramp, inter);
      let x = p5.width * (0.5 + directions[j] * i * decriment[0] + j * r1[j]);
      let y =  p5.height * (0.4  + directions[j] * i * decriment[1] + j * r2[j]) ;
      
      interp_color.setAlpha(255-15*i);
      p5.stroke(interp_color);
      if (!paused){
        display_frame += 1;
        current_angle = display_frame / 50000.0 + 39 ;
      }
      var sides=6
      var size=isMobile ? 75 : 130
      let angle = p5.TWO_PI / sides;
      p5.push();
      p5.translate(x,y);
      p5.rotate(current_angle);
      p5.strokeWeight(4);
      p5.fill(0, 0);
      p5.beginShape();
      for (let a = 0; a < p5.TWO_PI; a += angle) {
        let sx = p5.cos(a) * size;
        let sy = p5.sin(a) * size;
        p5.vertex(sx, sy);
      }
      p5.endShape(p5.CLOSE);
      p5.pop();
    }
  }
};
const resizeCanvas = (p5) => {
  p5.resizeCanvas(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0));
}
export {cyrb128, mulberry32, setup, draw, resizeCanvas}; 