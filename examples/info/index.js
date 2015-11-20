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

  function clearError() {
    displayError()
  }

  function displayData(data) {
    var tableBody = document.getElementById('info-table-body');

    var row;
    for (name in data) {
      if (data.hasOwnProperty(name)) {
        row = document.createElement('tr');
        row.innerHTML = '<td>' + name + '</td><td>' + data[name] + '</td>';
        tableBody.appendChild(row);
      }
    }
  }

  function clearData() {
    var tableBody = document.getElementById('info-table-body');
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  }

  var handleFile = function (event) {
    var files, reader;

    files = event.target.files;
    reader = new FileReader();
    reader.onload = function (event) {
      try {
        inkjet.info(event.target.result, function(err, data) {
          if(err) {
            displayError(err);
          } else {
            displayData(data);
          }
        });

      } catch (err) {
        displayData(err);
      }
    };

    clearError();
    clearData();

    // We only need the start of the file to get the info.
    var bufferSize = 1024 * 1024;
    reader.readAsArrayBuffer(files[0].slice(0, bufferSize));
  };

  window.addEventListener('load', function () {
    document.getElementById('file').addEventListener('change', handleFile, false);
  }, false);

}());