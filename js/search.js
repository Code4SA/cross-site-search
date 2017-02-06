(function() {
  var searcBbox = $('#searchbox');
  var searchButton = $('#searchbutton');
  var resultsContainer = $('#search-results');

  var startSpinner = function() {
  };
  var stopSpinner = function() {
  };

  var error = function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus, errorThrown, jqXHR);
  };
  var success = function(data) {
    for (i in data) {
      var rows = "";
      for (key in data[i]) {
        rows += "<tr><td>" + key + "</td><td>" + data[i][key] + "</td></tr>";
      }
      $('<table class="table"><tr><th>field</th><th>value</th></tr>' + rows + '</table>').appendTo(resultsContainer);
    };
  }
  var complete = function() {
    stopSpinner();
  }
  var search = function() {
    resultsContainer.empty();
    startSpinner();
    $.ajax("https://data.code4sa.org/resource/9vmn-5tnb.json?$q=" + searchbox.value, {
      error: error,
      success: success
    })
    return false;
  };


  $(searchbutton).on('click', search);


})();
