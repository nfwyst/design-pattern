// 将算法封装到策略中

// all strategies for calculateBonus
S = function(salary) {
  return salary * 4;
}
A = function(salary) {
  return salary * 3;
},
B = function(salary) {
  return salary * 2;
}
// core executor
var calculateBonus = function(level, salary) {
  return level(salary);
};

console.log(calculateBonus(S, 20000)); // 输出：80000
console.log(calculateBonus(A, 10000)); // 输出：30000
