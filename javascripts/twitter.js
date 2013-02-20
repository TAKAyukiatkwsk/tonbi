function Twitter() {
  this.requestToken = '';
}

Twitter.prototype.isAuthorized = function () {
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
  var options = {
    consumerKey: CONSUMER_KEY,
    consumerSecret: CONSUMER_SECRET
  };
  var oauth = OAuth(options);
  var twitter = this;
  var params = {
    'oauth_token': twitter.requestToken,
    'oauth_verifier': pincode
  };

  oauth.post('https://api.twitter.com/oauth/access_token', params, function (data) {
    // succeed to get access_token
    console.log(data);
  }, function (data) {
    // fail to get access_token
    console.log(data);
  });
  return false;
}
