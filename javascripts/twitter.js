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
}

