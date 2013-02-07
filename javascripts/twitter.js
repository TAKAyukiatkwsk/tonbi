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
        console.log(data);
      },
      function (data) {
        // fail to get request token
        console.log(data);
      });
}

