document.querySelector('button.search').onclick = () => {
  if (document.querySelector('input').value) {
    document.form.submit();
  }
};
let id;
document.querySelector('button.ghost').onclick = () => {
  clearInterval(id);
  id = setInterval(() => {
    let r1 = Math.random()*6-3;
    let r2 = Math.random()*6-3;
    ghost(r1, r2);
  }, 50);
  setTimeout(() => {
    clearInterval(id);
    googlee();
  }, 800);
};
document.querySelector('button.ghost').addEventListener('dblclick', () => {
  clearInterval(id);
  clearCvs();
  googlee();
  document.body.style.backgroundImage = 'url(gif.gif)';
  setTimeout(() => {
    document.body.style.backgroundImage = '';
  }, 800);
});

let wrapper = document.getElementById("cvs-wrapper");
let cvs = document.createElement('canvas');
cvs.width = 500;
cvs.height = 200;

wrapper.appendChild(cvs);
let ctx = cvs.getContext("2d");

let cx = cvs.clientWidth / 2 - 20;
let cy = cvs.clientHeight / 2;

window.onload = googlee;
function googlee() {  
  clearCvs();
  // G
  ctx.strokeStyle = "#4285f4";
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.arc(cx-130, cy, 30, 1.75*Math.PI, 0, true);
  ctx.lineTo(cx-130, cy);
  ctx.stroke();
  
  // o1
  ctx.strokeStyle = "#ea4335";
  ctx.beginPath();
  ctx.arc(cx-65, cy+10, 20, 0, 2*Math.PI, false);
  ctx.stroke();
  
  // o2
  ctx.strokeStyle = "#fbbc05";
  ctx.beginPath();
  ctx.arc(cx-10, cy+10, 20, 0, 2*Math.PI, false);
  ctx.stroke();
  
  // g
  ctx.strokeStyle = "#4285f4";
  ctx.beginPath();
  ctx.arc(cx+45, cy+10, 20, 0, 2*Math.PI, false);
  ctx.moveTo(cx+65, cy-15);
  ctx.lineTo(cx+65, cy+37);
  ctx.arc(cx+46, cy+37, 19, 0, 0.9*Math.PI);
  ctx.stroke();
  
  // l
  ctx.strokeStyle = "#34a853";
  ctx.beginPath();
  ctx.moveTo(cx+82, cy-34);
  ctx.lineTo(cx+82, cy+34);
  ctx.stroke();
  
  // e
  ctx.strokeStyle = "#ea4335";
  ctx.beginPath();
  ctx.arc(cx+118, cy+10, 20, 0.2*Math.PI, 1.9*Math.PI, false);
  ctx.lineTo(cx+98, cy+14);
  ctx.stroke(); 
  
  // e
  ctx.strokeStyle = "#fbbc05";
  ctx.beginPath();
  ctx.arc(cx+174, cy+10, 20, 0.2*Math.PI, 1.9*Math.PI, false);
  ctx.lineTo(cx+154, cy+14);
  ctx.stroke(); 
} 

function ghost(_x, _y) {
  clearCvs();
  // face
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(cx+_x, cy+_y, cvs.height/2.1, 0, 2*Math.PI);
  ctx.fill();
  
  // mouth
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(cx+_x, cy+cvs.height/4.6+_y, cvs.height/4.5, 0, 2*Math.PI);
  ctx.fill();
  
  // eyes
  ctx.beginPath();
  ctx.arc(cx+cvs.height/5+_x, cy-cvs.height/4.1+_y, cvs.height/8, 0, 2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx-cvs.height/5+_x, cy-cvs.height/4.1+_y, cvs.height/8, 0, 2*Math.PI);
  ctx.fill();
}

function clearCvs() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, cvs.width, cvs.height);
}