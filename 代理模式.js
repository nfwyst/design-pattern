class MyImage extends Object {
  constructor() {
    super()
    this._img= new Image();
    this._img.style.width = '100%';
    document.body.appendChild(this._img);
  }

  set src(src) {
    this._img.src = src;
  }
}

// 虚拟代理, 图片懒加载
class ProxyImage extends Object {
  constructor(src) {
    super();
    this._img = new MyImage();
    this._img.src = 'https://zippy.gfycat.com/SkinnySeveralAsianlion.gif';
  }

  set src(src) {
    const img = new Image();
    img.src = src;
    img.onload = (e) => {
      this._img.src = e.target.src;
    }
  }
}


////////////////////////////// 缓存代理 multi ///////////////
function multi() {
  return Array.from(arguments).reduce((cur, next) => {
    return cur *= next;
  }, 1)
}

let proxyMults = (function () {
  const cache = {};
  return function () {
    let args = Array.prototype.join.call(arguments);
    if (cache[args]) {
      return cache[args];
    } else {
      return cache[args] = multi.apply(this, arguments);
    }
  }
})();

console.log(proxyMults(1,2,3));

////////////////////////// 动态代理 /////////////////////////
var mult = function () {
  var a = 1;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a * arguments[i];
  }
  return a;
};
var plus = function () {
  var a = 0;
  for (var i = 0, l = arguments.length; i < l; i++) {
    a = a + arguments[i];
  }
  return a;
};
var createProxyFactory = function (fn) {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = fn.apply(this, arguments);
  }
};
var proxyMult = createProxyFactory(mult),
    proxyPlus = createProxyFactory(plus);
console.log(proxyMult(1, 2, 3, 4)); // 输出：24
console.log(proxyMult(1, 2, 3, 4)); // 输出：24
console.log(proxyPlus(1, 2, 3, 4)); // 输出：10
console.log(proxyPlus(1, 2, 3, 4)); // 输出：10
