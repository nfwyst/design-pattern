// 传统的封装
var myObjects = (function() {
  var __name = 'sven'; // 私有（private）变量
  return {
    getName: function() { // 公开（public）方法
      return __name;
    }
  }
})();


class myObject extends Object {
  constructor() {
    super();
    var __name = 'seven';
    this.__getName = function() {
      return __name;
    }
    this.__setName = function(name) {
      __name = name;
    }
  }
  get name() {
    return this.__getName();
  }
  set name(name) {
    this.__setName(name);
  }
}

console.log((new myObject).name); // 输出：seven
