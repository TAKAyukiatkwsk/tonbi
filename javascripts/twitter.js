function Twitter() {
  this.requestToken = '';
}

Twitter.prototype.isAuthorized = function () {
  return false;
}

Twitter.prototype.userLogin = function () {
  function extractQueryOauthToken(responseText) {
    // responseText はクエリパラメータ形式になっている
    var arrayOfResponseText = responseText.split('&');

    // oauth_token=で始まる文字列を見つけて返す
    for (var index in arrayOfResponseText) {
      var mathchesOauthToken = arrayOfResponseText[index].match(/^oauth_token=.*$/);
      if (mathchesOauthToken !== null) {
        return mathchesOauthToken[0];
      }
    }
    return null;
  }

  var options = {
    consumerKey: CONSUMER_KEY,
    consumerSecret: CONSUMER_SECRET
  };
  var oauth = OAuth(options);
  var twitter = this;

  oauth.get('https://api.twitter.com/oauth/request_token',
      function (data) {
        // succeed to get request token
        // レスポンスからoauth_tokenを抜き出す
        var queryOauthToken = extractQueryOauthToken(data.text);
        if (queryOauthToken === null) {
          console.log('Cannot get oauth token!');
          return;
        }

        // request token を保存する
        twitter.requestToken = queryOauthToken;

        // 新しいタブでauthorizeページを開く
        chrome.tabs.create({
          url: 'https://api.twitter.com/oauth/authorize?' + queryOauthToken
        });
      },
      function (data) {
        // fail to get request token
        console.log(data);
      });
}

// Request tokenが保存されていればtrue
Twitter.prototype.hasRequestToken = function () {
  if (this.requestToken) {
    return true;
  }
  return false;
}

Twitter.prototype.sendPincode = function () {
  return false;
}
