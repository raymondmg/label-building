var img_div = document.getElementById('canvas');
var img_canvas = img_div.getContext('2d');
var drag =false;
var rect = {};
var rectArray = new Array();

var img = new Image();
img.src = "./image/demo.jpg";
img.onload = init_img;

var btn_download = document.getElementById('btn_download');

btn_download.onclick = function(){
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rectArray));

  var btn_href = document.getElementById('btn_href');
  btn_href.href = 'data:' + data;
  btn_href.download = 'data.json';
};


function windowPos2CanvasPos(cvs, x, y) {
    var box = cvs.getBoundingClientRect();
    return {
        x: x - box.left * (cvs.width / box.width),
        y: y - box.top * (cvs.height / box.height)
    }
}

function mouseDown(e) {

  var loc = windowPos2CanvasPos(img_div,e.clientX,e.clientY);
  rect.startX = loc.x;
  rect.startY = loc.y;
  drag = true;
}

function mouseUp() {
  var newRect = {};
  newRect.startX = rect.startX;
  newRect.startY = rect.startY;
  newRect.w = rect.w;
  newRect.h = rect.h;

  rectArray.push(newRect);
  drag = false;
  img_canvas.clearRect(0,0,img_div.width,img_div.height);
  freshImage();
}

function mouseMove(e) {
  if (drag) {
    var loc = windowPos2CanvasPos(img_div,e.clientX,e.clientY);
    rect.w = loc.x - rect.startX;
    rect.h = loc.y - rect.startY;
    img_canvas.clearRect(0,0,img_div.width,img_div.height);

    freshImage();
    img_canvas.strokeStyle = "rgb(255, 0, 0)";
    img_canvas.lineWidth = 3;
    img_canvas.setLineDash([6]);
    img_canvas.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
    
  }
}

function drawRect(){

  rectArray.forEach(r => {
    img_canvas.beginPath();
    img_canvas.setLineDash([]);
    img_canvas.lineWidth="3";
    img_canvas.strokeStyle="blue";
    img_canvas.rect(r.startX, r.startY, r.w, r.h);
    img_canvas.stroke();
  });

}

function freshImage() {
    img_canvas.drawImage(img, 0, 0);
    drawRect();
}

function init_img() {
    img_div.addEventListener('mousedown', mouseDown, false);
    img_div.addEventListener('mouseup', mouseUp, false);
    img_div.addEventListener('mousemove', mouseMove, false);

    img_div.width = img.width;
    img_div.height = img.height;
    freshImage();
}