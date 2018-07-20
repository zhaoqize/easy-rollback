[![npm](https://img.shields.io/npm/v/easy-rollback.svg?style=flat)](https://github.com/zhaoqize/easy-rollback)
[![GitHub license](https://img.shields.io/github/license/zhaoqize/easy-rollback.svg)](https://github.com/zhaoqize/easy-rollback/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
# easy-rollback
easy-rollback是一个友好的帮助用户回滚到指定提交的库

## 使用
安装
```js
npm install easy-rollback
```

使用
```js
easy rollback
```

执行 `easy rollback -h`
```js

  Usage: rollback [options]

  A Rollback Solution For Git

  Options:

    -n, --number  show log number
    -h, --help    output usage information
```

## 效果
`normal` 模式
```js
➜  xxxx git:(develop) easy rollback
[2018-7-12] [14:21:52] [easy-rollback] › ✔  success   Work Tree Is Clean!
[2018-7-12] [14:21:52] [easy-rollback] › ✔  success   Pull Tag OK!
? 请选择CommitId的来源 Normal
? 请选择模式 reset
? 请选择CommitId 57fa074-publish log: branch:develop;timestamp:1521523982985;msg:zq
z131
[2018-7-12] [14:22:05] [easy-rollback] › ✔  success   ✨ rooback success!
```

`tag` 模式
```js
➜  xxxx git:(develop) easy rollback
[2018-7-12] [14:20:13] [easy-rollback] › ✔  success   Work Tree Is Clean!
[2018-7-12] [14:20:14] [easy-rollback] › ✔  success   Pull Tag OK!
? 请选择CommitId的来源 Tag
? 请选择模式 reset
? 请选择CommitId 4b532f1-publish log: branch:develop;timestamp:1521530777307;msg:zq
z/138
[2018-7-12] [14:20:33] [easy-rollback] › ✔  success   ✨ rooback success!
```

## License

MIT © [zhaoqize]()
