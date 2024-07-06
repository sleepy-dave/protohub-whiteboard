$(document).ready(function () {
  const socket = io();
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let color = 'black';

  let drawingPath = [];
  let isDrawingUser = false;

  function drawLine(startX, startY, endX, endY, color, lineWidth) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
  }

  function toggleButtons(enable) {
    $('#clear-btn').prop('disabled', !enable);
    $('#step-back-btn').prop('disabled', !enable);
    $('#black-btn').prop('disabled', !enable);
    $('#white-btn').prop('disabled', !enable);
    $('#red-btn').prop('disabled', !enable);
    $('#blue-btn').prop('disabled', !enable);
    $('#green-btn').prop('disabled', !enable);
    $('#slider').prop('disabled', !enable);
    $('#start-drawing-btn').prop('disabled', enable);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  canvas.addEventListener('mousedown', function (e) {
    if (!isDrawingUser) return;
    const { offsetX, offsetY } = e;
    drawingPath.push({ x: offsetX, y: offsetY, color, lineWidth });
  });

  canvas.addEventListener('mousemove', function (e) {
    if (!isDrawingUser) return;
    const { offsetX, offsetY } = e;
    const lastPoint = drawingPath[drawingPath.length - 1];

    if (lastPoint) {
      drawLine(lastPoint.x, lastPoint.y, offsetX, offsetY, color, lineWidth);
      drawingPath.push({ x: offsetX, y: offsetY, color, lineWidth });
    }
  });

  canvas.addEventListener('mouseup', function () {
    if (isDrawingUser) {
      socket.emit('draw', { path: drawingPath });
      drawingPath = [];
    }
  });

  canvas.addEventListener('mouseleave', function () {
    if (isDrawingUser) {
      socket.emit('draw', { path: drawingPath });
      drawingPath = [];
    }
  });

  $('#black-btn').click(function () {
    if (isDrawingUser) {
      color = "#000000"
    }
  });

  $('#white-btn').click(function () {
    if (isDrawingUser) {
      color = "#ffffff"
    }
  });

  $('#red-btn').click(function () {
    if (isDrawingUser) {
      color = "#ff0000"
    }
  });

  $('#blue-btn').click(function () {
    if (isDrawingUser) {
      color = "#0000ff"
    }
  });

  $('#green-btn').click(function () {
    if (isDrawingUser) {
      color = "#00ff00"
    }
  });

  $('#clear-btn').click(function () {
    if (isDrawingUser) {
      clearCanvas();
      socket.emit('clear');
    }
  });

  $('#step-back-btn').click(function () {
    if (isDrawingUser) {
      socket.emit('stepBack');
    }
  });

  $('#start-drawing-btn').click(function () {
    console.log('Start Drawing button clicked on client');
    socket.emit('startDrawing');
  });

  socket.on('startDrawing', function () {
    console.log('Received startDrawing event on client');
  });

  socket.on('enableDrawing', function () {
    isDrawingUser = true;
    console.log('You can draw now!');
    toggleButtons(true);
  });

  socket.on('disableDrawing', function () {
    isDrawingUser = false;
    console.log('You cannot draw now.');
    toggleButtons(false);
  });
  
  socket.on('forceDisableDrawing', function () {
    isDrawingUser = false;
    console.log('Forced disable drawing.');
    toggleButtons(false);
  });
  

  socket.on('draw', function (data) {
    if (data.path) {
      data.path.forEach((point, index, array) => {
        if (index < array.length - 1) {
          drawLine(point.x, point.y, array[index + 1].x, array[index + 1].y, point.color, point.lineWidth);
        }
      });
    }
  });

  socket.on('yourId', function (socketId) {
    console.log('Your socket ID:', socketId);
  });

  socket.on('clear', function () {
    clearCanvas();
  });

  socket.emit('readyToDraw');
});