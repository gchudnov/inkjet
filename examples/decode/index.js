(function () {

  // Check that the browser supports the FileReader API.
  if (!window.FileReader) {
    document.write('<strong>Sorry, your web browser does not support the FileReader API.</strong>');
    return;
  }

  function displayError(err) {
    var el = document.getElementById('errors');
    el.innerHTML = err ? err.message : '';
  }

  function displayDecodedData(decoded) {
    var canvas = document.getElementById('source-canvas');
    canvas.width = decoded.width;
    canvas.height = decoded.height;

    var ctx = canvas.getContext("2d");

    var imageData = ctx.getImageData(0, 0, decoded.width, decoded.height);
    var imageBytes = imageData.data;
    for (var i = 0, j = 0, size = decoded.width * decoded.height * 4; i < size; ) {
      imageBytes[i++] = decoded.data[j++];
      imageBytes[i++] = decoded.data[j++];
      imageBytes[i++] = decoded.data[j++];
      imageBytes[i++] = decoded.data[j++];
    }

    ctx.putImageData(imageData, 0, 0);
  }

  var handleFile = function (event) {
    var files = event.target.files;

    var reader = new FileReader();
    reader.onload = function (event) {
      var buf = event.target.result;
      try {
        inkjet.decode(buf, function(err, decoded) {
          if(err) {
            displayError(err);
          } else {
            displayDecodedData(decoded);
          }
        });
      } catch (err) {
        displayError(err);
      }
    };

    displayError();

    // We only need the start of the file for the Exif info.
    reader.readAsArrayBuffer(files[0]);
  };

  window.addEventListener('load', function () {
    document.getElementById('file').addEventListener('change', handleFile, false);
  }, false);

}());