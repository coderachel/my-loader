// 测试使用
const { runLoaders } = require("loader-runner");
const fs = require("fs");
const path = require("path");

runLoaders(
  {
    resource: path.join(__dirname, "./loaders/index.css"),
    loaders: [
      {
        loader: path.join(__dirname, "./loaders/sprite-loader.js"),
        options: {
          name: "sprite",
        },
      },
    ],
    context: {
      minimize: true,
    },
    readResource: fs.readFile.bind(fs),
  },
  (err, result) => {
    err ? console.log(err) : console.log(result);
  }
);
