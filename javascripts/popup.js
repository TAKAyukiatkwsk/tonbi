function displayPageTitleUrl() {
  chrome.tabs.query({
    "active": true,
    "currentWindow": true,
  }, function(tab) {
    $("h1").html(tab[0].title + " " + tab[0].url);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Twitter認証済みか？
  var twitter = new Twitter();
  if (! twitter.isAuthorized()) {
    // Twitterログインボタンを表示する
    
  }

  // ページのタイトルとURLを表示する
  displayPageTitleUrl();
}, false);
