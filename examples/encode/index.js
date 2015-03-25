(function () {

  function displayInfo(message) {
    var el = document.getElementById('info');
    el.innerHTML = message;
  }

  function displayError(err) {
    var el = document.getElementById('errors');
    el.innerHTML = err ? err.message : '';
  }

  function clearError() {
    displayError()
  }

  function clearCanvas() {
    var canvas = document.getElementById('source-canvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect (0 , 0 , canvas.width, canvas.height);
  }

  function makeSourceData() {
    var width = 512;
    var height = 512;

    var canvas = document.getElementById('source-canvas');
    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext("2d");

    var imageData = ctx.getImageData(0, 0, width, height);
    var imageBytes = imageData.data;
    for (var i = 0, j = 0, size = width * height * 4; i < size; ) {
      imageBytes[i++] = 0;    // R
      imageBytes[i++] = 0;    // G
      imageBytes[i++] = 0xFF; // B
      imageBytes[i++] = 0xFF; // A
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function getImageData() {
    var canvas = document.getElementById('source-canvas');
    var ctx = canvas.getContext("2d");

    // { width, height, data }
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  function encodeCanvasData() {
    try {
      var imageData = getImageData();

      var buf = imageData.data;
      var options = {
        width: imageData.width,
        height: imageData.height,
        quality: 80
      };

      inkjet.encode(buf, options, function(err, encoded) {
        if(err) {
          displayError(err);
        } else {
          displayInfo('Image encoded successfully');
        }
      });
    } catch(err) {
      displayError(err);
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    clearError();
    makeSourceData();
    encodeCanvasData();
  });


}());