// face to AOP 借用面向切面的概念
Function.prototype.before = function( middleware ) {
  var _self = this;
  return function() {
    middleware.apply(this, arguments);
    return _self.apply(this, arguments);
  }
}

Function.prototype.after = function( middleware ) {
  var _self = this;
  return function() {
    var res = _self.apply(this, arguments);
    middleware.apply(this, arguments);
    return res;
  }
}

// 核心的业务功能
var func = function() {
  console.log('management system');
}

var userManage = function() {
  console.log('user login management');
}

var logManage = function() {
  console.log('log management');
}

func = func.before(
  userManage
).after(
  logManage
);

func()
