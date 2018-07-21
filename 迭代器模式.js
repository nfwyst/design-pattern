// 内部迭代器 each
[1,2].forEach(item => console.log(item));
// 外部迭代器 next
class Iter extends Object {
  constructor(obj) {
    super(obj);
    this.index = 0;
    this.obj = obj;
  }

  next() {
    return this.isDone ? null : this.obj[this.index++];
  }

  get isDone() {
    return this.index >= this.obj.length;
  }
}
// 两个迭代器比较函数
const compare = function (iterator1) {
  return function (iterator2) {
    while (!iterator1.isDone && !iterator2.isDone) {
      if (iterator1.next() !== iterator2.next()) {
        throw new Error('sorry not equal');
      }
    }

    if (iterator1.isDone && iterator2.isDone) {
      console.log('equal');
    } else {
      throw new Error('sorry not equal');
    }
  }
}
const iterator1 = new Iter([1, 2, 3]);
const iterator2 = new Iter([1, 2, 3]);
const comparePartial = compare(iterator1);
comparePartial(iterator2);
