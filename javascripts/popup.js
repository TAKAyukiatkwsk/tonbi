chrome.tabs.query({
  "active": true,
  "currentWindow": true,
}, function(tab) {
  $("h1").html(function () {
    return tab[0].title + " " + tab[0].url;
  });
});
