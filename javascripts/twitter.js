function Twitter() {
}

Twitter.prototype.isAuthorized = function () {
  return false;
}

Twitter.prototype.userLogin = function () {
  var options = {
    consumerKey: CONSUMER_KEY,
    consumerSecret: CONSUMER_SECRET
  };
  var oauth = OAuth(options);

  oauth.get('https://api.twitter.com/oauth/request_token',
      function (data) {
        // succeed to get request token
        // レスポンスからoauth_tokenを抜き出す
        var arrayOfResponseText = data.text.split('&');
        var queryOauthToken = null;
        for (var index in arrayOfResponseText) {
          var mathchesOauthToken = arrayOfResponseText[index].match(/^oauth_token=.*$/);
          if (mathchesOauthToken !== null) {
            queryOauthToken = mathchesOauthToken[0];
            break;
          }
        }
        console.log(queryOauthToken);
      },
      function (data) {
        // fail to get request token
        console.log(data);
      });
}

