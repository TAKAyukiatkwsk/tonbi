function Twitter() {
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

  oauth.get('https://api.twitter.com/oauth/request_token',
      function (data) {
        // succeed to get request token
        // レスポンスからoauth_tokenを抜き出す
        var queryOauthToken = extractQueryOauthToken(data.text);
        console.log(queryOauthToken);
      },
      function (data) {
        // fail to get request token
        console.log(data);
      });
}

