const fs = require("fs");
const path = require("path");

const resolve = (p) => path.resolve(__dirname, p);

function readFile(file) {
  return (callback) => {
    fs.readFile(resolve(file), callback);
  };
}

function* task() {
  try {
    const data1 = yield readFile("file1.txt");
    console.log("data1", data1.toString());
    const data2 = yield readFile("file2.txt");
    console.log("data2", data2.toString());
    const data3 = yield readFile("file3.txt");
    console.log("data3", data3.toString());
    // 处理数据
  } catch (err) {
    throw err;
  }
}

function co(gen) {
  const g = gen();
  function next(err, data) {
    if (err) {
      g.throw(err);
      return;
    }
    const result = g.next(data);
    if (result.done) return;
    result.value(next);
  }
  next();
}

co(task);
