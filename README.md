## 定义
loader只是一个导出为函数的javascript模块

```
module.exports = function(source) {
    return source
}
```

## loader的执行顺序
采用的是从右往左的执行顺序

```
compose = (f, g) => (...args) => f(g(...args))
```

## 编写loader的思路
1. 主要是对获取的source（string或者是buffer）进行处理
2. 借助loader-runner进行loader的测试

