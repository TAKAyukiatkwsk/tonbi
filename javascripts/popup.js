function displayPageTitleUrl() {
  chrome.tabs.query({
    "active": true,
    "currentWindow": true,
  }, function(tab) {
    $("h1").html(tab[0].title + " " + tab[0].url);
  });
}

// TODO: バックグラウンドでTwitterオブジェクトを作っておく？
//       今のままだとアカウントの状態を保存できない
//       localstorageに保存する？
document.addEventListener('DOMContentLoaded', function () {
  // バックグランドで作成したTwitterインスタンスを取得する
  var bg = chrome.extension.getBackgroundPage();
  var twitter = bg.getTwitterInstance();

  // Twitter認証済みか？
  if (twitter.isAuthorized()) {
    // ログイン&認証済み
  } else if (twitter.hasRequestToken()) {
    // request token 取得済み
    // PINコードを入力する
  } else {
    // Twitterログインボタンのクリックイベント
    $('#twitter_login').click(function () {
      twitter.userLogin();
    });
    
  }

  // ページのタイトルとURLを表示する
  displayPageTitleUrl();
}, false);
