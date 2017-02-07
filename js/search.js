(function() {
  var searcBbox = $('#searchbox');
  var searchButton = $('#searchbutton');
  var resultsContainer = $('#search-results');

  var startSpinner = function() {
    $('#spinner').show();
  };
  var stopSpinner = function() {
    $('#spinner').hide();
  };

  var error = function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus, errorThrown, jqXHR);
  };
  var success = function(searchMoreURL, query) {
    return function(data) {
      var count = "<div>" + data.length + " results </div>";
      var searchMore = "<div><a href=\"" + searchMoreURL + "\">Search more</a></div>";
      $(count + searchMore).appendTo(resultsContainer);
      for (i in data) {
        var rows = "";
        for (key in data[i]) {
          rows += "<tr><td>" + key + "</td><td>" + data[i][key] + "</td></tr>";
        }
        $('<table class="table"><tr><th>field</th><th>value</th></tr>' + rows + '</table>').appendTo(resultsContainer);
      };
      resultsContainer.mark(stemmer(query), {
        separateWordSearch: true,
        accuracy: "complementary"
      });
    }
  };
  var complete = function() {
    stopSpinner();
  }
  var search = function() {
    resultsContainer.empty();
    startSpinner();
    var searchMoreURL = "https://data.code4sa.org/Government/Tender-Awards-2015-2016/kvv2-xrvr/data?q=" + searchbox.value;
    $.ajax("https://data.code4sa.org/resource/9vmn-5tnb.json?$q=" + searchbox.value, {
      error: error,
      success: success(searchMoreURL, searchbox.value),
      complete: complete
    })
    return false;
  };


  $(searchbutton).on('click', search);
  stopSpinner();

})();
