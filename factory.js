// 工厂模式 简单工厂与复杂工厂 
//
// 工厂模式定义一个用于创建对象的接口, 这个接口由子类决定
// 实例化哪一个类, 该模式使一个类的实例化延迟到了子类, 
// 而子类可以重写接口方法以便在创建的时候指定自己的对象类型.
// 
//
//////////////////// 简单工厂 /////////////////
// ES5
var factory = {
  person: 0,
  line1: function(c) {
    this.person = c;
  },
  line2: function(c) {
    this.person = c;
  },
  admin: function(para, c) {
    this.person += c;
    return new this[para](c);
  }
}

var line1 = factory.admin('line1', 50);
var line2 = factory.admin('line2', 100);
console.log(line1.person, line2.person, factory.person);
// ES6 
class Factory {
  constructor() {
    this.person = 0;
  }
  admin(type, c) {
    this.person += c;
    return new Factory[type](c);
  }
}
Factory.Line1 = class Line1 extends Factory {
  constructor(c) {
    super(c);
    this.person = c; 
    this.name = 'line1';
  }
}
Factory.Line2 = class Line2  extends Factory {
  constructor(c) {
    super(c);
    this.person = c;
    this.name = 'line2';
  }
}
let fa = new Factory();
let l1 = fa.admin('Line1', 500);
let l2 = fa.admin('Line2', 5);
console.log(l1.person, l2.person, fa.person);

//////////////////// 抽象工厂 /////////////////
// ES5
var facs = function() {};
facs.prototype = {
  process: function() {
    throw new Error('dont active me');
  }
}

var fac1 = function() {
  facs.call(this);
}
fac1.prototype = new facs();
fac1.prototype.constructor = fac1;
fac1.prototype.process = function() {
  console.log('fac1 actived');
}

new fac1().process();
// ES6
class Fac {
  constructor() {
    this.person = 0;
  }
  process() {
    throw new Error('dont active me');
  }
}

class Fac1 extends Fac {
  constructor(c) {
    super(c);
    this.person = c;
  }
  process() {
    console.log('fac1 actived again');
  }
}

class Fac2 extends Fac {
  constructor(c) {
    super(c);
    this.person = c;
  }
  process() {
    console.log('fac2 actived again');
  }
}

new Fac1().process();
