function Twitter() {
  this.requestToken = '';
}

// OAuthオブジェクト(jsOAuth)を生成する
// 認証が必要なHTTPリクエストはこのオブジェクトに委譲する
Twitter.prototype.oauth = (function () {
  var options = {
    consumerKey: CONSUMER_KEY,
    consumerSecret: CONSUMER_SECRET
  };
  return OAuth(options);
})();

Twitter.prototype.isAuthorized = function () {
  if (this.oauth.getAccessTokenKey()) {
    return true;
  }
  return false;
}

Twitter.prototype.userLogin = function () {
  function extractOauthToken(responseText) {
    // responseText はクエリパラメータ形式になっている
    var arrayOfResponseText = responseText.split('&');

    // oauth_token=で始まる文字列を見つけて値の部分を返す
    for (var index in arrayOfResponseText) {
      var mathchesOauthToken = arrayOfResponseText[index].match(/^oauth_token=(.*)$/);
      if (mathchesOauthToken !== null && mathchesOauthToken.length == 2) {
        return mathchesOauthToken[1];
      }
    }
    return null;
  }

  var twitter = this;
  var oauth = twitter.oauth

  oauth.get('https://api.twitter.com/oauth/request_token',
      function (data) {
        // succeed to get request token
        // レスポンスからoauth_tokenを抜き出す
        var oauthToken = extractOauthToken(data.text);
        if (oauthToken === null) {
          console.log('Cannot get oauth token!');
          return;
        }

        // request token を保存する
        twitter.requestToken = oauthToken;

        // 新しいタブでauthorizeページを開く
        chrome.tabs.create({
          url: 'https://api.twitter.com/oauth/authorize?oauth_token=' + oauthToken
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

Twitter.prototype.sendPincode = function (pincode) {
  console.log(pincode);
  var twitter = this;
  var oauth = twitter.oauth
  var params = {
    'oauth_token': twitter.requestToken,
    'oauth_verifier': pincode
  };

  oauth.post('https://api.twitter.com/oauth/access_token', params, function (data) {
    // succeed to get access_token
    // responseからaccess_tokenを抽出する
    var arrayOfResponseText = data.text.split('&');
    var responseParams = {};
    for (var index in arrayOfResponseText) {
      var keyValue = arrayOfResponseText[index].split('=');
      responseParams[keyValue[0]] = keyValue[1];
    };
    // access_tokenをOauthオブジェクトに保存
    oauth.setAccessToken([responseParams.oauth_token, responseParams.oauth_token_secret]);
  }, function (data) {
    // fail to get access_token
    console.log(data);
  });
}
