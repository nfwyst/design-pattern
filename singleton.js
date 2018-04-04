// 单例模式 确保一个类只有一个实例, 在全局命名空间提供唯一访问点防蚊对象
// 作用: 通信 封装
// ES5
var obja = function() {
  var door = null;
  var doorGetter = function(msg) {
    this.msg = msg;
  }

  this.receiveMsg = function(msg) {
    if (!door) {
      door = new doorGetter(msg);
    } else {
      door.msg = msg;
    }
    return this;
  }

  this.response = function() {
    if (door.msg === 'hello') {
      return {msg: 'hi'}
    } else if (door.msg) {
      return {msg: 'sorry'}
    } else {
      return {msg: null}
    }
  }
}

var objb = function() {
  this.call = function(obj, msg) {
    var res = obj.receiveMsg(msg).response();
    return res;
  }
}

var ob = new objb();
var oa = new obja();
var res = ob.call(oa, 'hello');
oa = ob = null;
console.log(res);

// ES6
var helper = {};
var get = function(obj, key) {
  return helper[obj] && helper[obj][key];
}
var set = function(obj, key, value) {
  if (!helper[obj]) {
    helper[obj] = {};
  }
  helper[obj][key] = value;
}
class Obja {
  constructor() {
    set(this, 'door', null);
    set(this, 'doorGetter', function(msg) {
      this.msg = msg;
    });
  }
  receiveMsg(msg) {
    var door = get(this, 'door');
    if (!door) {
      var creator = get(this, 'doorGetter');
      set(this, 'door', new creator(msg));
    } else {
      door.msg = msg;
      set(this, 'door', door);
    }
    return this;
  }
  response() {
    var door = get(this, 'door');
    if (door.msg === 'hey') {
      return {msg: "nice to meet you"}
    } else if (door.msg) {
      return {msg: "sorry again"}
    } else {
      return {msg: null};
    }
  }
}
class Objb {
  constructor() {}
  call(obj, msg) {
    var res = obj.receiveMsg(msg).response();
    return res;
  }
}

var OA = new Obja();
var OB = new Objb();
var res1 = OB.call(OA, 'hey');
OA = OB = null;
console.log(res1);
