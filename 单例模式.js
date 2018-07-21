// 通过代理控制对原对象的访问
class ProxySingleto {
  get instance () {
    return ProxySingleto.__instance;
  }
  set instance(instance) {
    ProxySingleto.__instance = instance;
  }
  constructor(className, ...args) {
    if(ProxySingleto.instance) {
      return ProxySingleto.instance;
    } else {
      return ProxySingleto.instance = new className(...args);
    }
  }
}


// 单一职责原则 创建对象
class Singleto {
  constructor({ name }) {
    this.__name = name;
  }

  get name() {
    return this.__name;
  }

  set name(name) {
    return false;
  }
}

var a = new ProxySingleto(Singleto, { name: 'steven' });
var b = new ProxySingleto(Singleto, { name: 'tely' });


a.name = 'a'
b.name = 'b'

console.log(a === b, a.name, b.name);
