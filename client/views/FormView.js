var app = app || {};

app.FormView = Marionette.ItemView.extend({

  template: _.template("<div class='form-group'>"+
        "<label for='input-url'>Please enter the URL you would like to crawl:</label>"+
        "<input type='text' class='form-control' id='input-url' placeholder='https://gocardless.com/'/>"+
      "</div>"),

  className: "form-url",

  tagName: "form",

  events: {
    "submit": "handleSubmit"
  },

  handleSubmit: function(event){
    
    event.preventDefault();
    var url = $("#input-url").val();
    var requestUrl = "api/pages?" + "url=" + url;

    var xhr = new XMLHttpRequest();
    xhr.previous_text = "";

    xhr.onreadystatechange = function() {
      var entryModels = [];

      try {
        if(xhr.readyState > 2) {
          console.log("xhr.previous_text.length: ", xhr.previous_text.length);
          var new_response = xhr.responseText.substring(xhr.previous_text.length);
          var results = JSON.parse(JSON.stringify(new_response));
          xhr.previous_text = xhr.responseText;
          
          console.log("results: ", results);
          
          // for (var key in results) {
          //   results[key]["id"] = key;
          //   entryModels.push(results[key]);
          //   app.siteMap.add(entryModels);
          // }
        }
      } catch (error) {
        console.log("error receiving data chunks from server: ", error);
      }

    };

    xhr.open("GET", requestUrl, true);
    xhr.send("Making request to server...");

    // send get request to server for requested URL
    // $.get('api/pages', {url: url}, function(results){
      
    //   var entries = JSON.parse(results);
    //   var entryModels = [];

    //   // convert results into array of objects 
    //   // for adding to collection
    //   for (var key in entries) {
    //     entries[key]["url"] = key;
    //     entryModels.push(entries[key]);
    //   }

    //   // reset siteMap collection, and add new models
    //   app.siteMap.reset(entryModels);

    //   // clear out url in input field
    //   $("#input-url").val("");

    //   // title list of results with requested URL
    //   $("caption").html("<h2>Results from " + url + "</h2>");

    // });

  }

});
