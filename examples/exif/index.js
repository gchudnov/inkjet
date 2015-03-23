(function () {

  // Check that the browser supports the FileReader API.
  if (!window.FileReader) {
    document.write('<strong>Sorry, your web browser does not support the FileReader API.</strong>');
    return;
  }

  function displayMetadata(tags) {
    var tableBody = document.getElementById('exif-table-body');
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }

    var row;
    for (name in tags) {
      if (tags.hasOwnProperty(name)) {
        row = document.createElement('tr');
        row.innerHTML = '<td>' + name + '</td><td>' + tags[name].description + '</td>';
        tableBody.appendChild(row);
      }
    }
  }

  var handleFile = function (event) {
    var files, reader;

    files = event.target.files;
    reader = new FileReader();
    reader.onload = function (event) {
      try {
        inkjet.exif(event.target.result, function(err, tags) {
          if(err) {
            displayMetadata({ ERROR: { description: err.message } });
          } else {
            displayMetadata(tags);
          }
        });

      } catch (err) {
        displayMetadata({ ERROR: { description: err.message } });
      }
    };

    // We only need the start of the file for the Exif info.
    var bufferSize = 128 * 1024;
    reader.readAsArrayBuffer(files[0].slice(0, bufferSize));
  };

  window.addEventListener('load', function () {
    document.getElementById('file').addEventListener('change', handleFile, false);
  }, false);

}());