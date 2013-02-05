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

  // ページのタイトルとURLを表示する
  displayPageTitleUrl();
}, false);
