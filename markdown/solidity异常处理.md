[官方文档](https://solidity.readthedocs.io/en/v0.4.21/control-structures.html#error-handling-assert-require-revert-and-exceptions)

solidity错误处理是采用回退的办法，当出现异常的时候，所有状态会回退到开始的地方，简单来说就是调用一个函数，要么全部执行，要么一点改变都没有，不能只改变一部分

可以换一种方式理解，区块链相当于一个共享的事务性数据库，每次操作都要遵照事务性数据库的操作原则

###assert
`assert`使用方式如下
```
// assert函数只接受一个参数
// assert只能用于测试内部错误和检查非变量
assert(this.balance == balanceBeforeTransfer - msg.value / 2);
```
下列情况将会产生一个 assert 形式的异常
- 访问数组越界（访问数组的索引太大或为负数）
- 访问固定长度 `bytesN` 的索引太大或为负数
- 用零当除数做除法或模运算
- 对负数位进行移位操作
- 将一个太大或负数值转换为一个枚举类型
- 调用零初始化变量的内部函数类型
- 调用`assert`且条件表达式为`false`

`assert`的本质是执行一个无效操作（指令0xfe），促使函数回到原始状态
>注意：`assert`异常会消耗所有可用的gas

###require
`require`用于检查条件的有效性，调用方式如下
```
// 第一个参数是一个条件语句，若条件为true，则往下执行后面的语句，如条件为false，则抛出异常
// 第二个参数是自定义的异常信息，是可选参数
require(msg.value % 2 == 0, "Even value required.");
```

下列情况将会产生一个 require 形式的异常
- 调用`throw`
- 调用`require`且条件表达式为`false`
- 调用一个函数，但是函数没有正确结束
>注意：调用`call `、`send`、`delegatecall `、`callcode `这几个函数不会抛出异常，因为这几个是低级别函数，不过这几个函数异常时会返回`false`
- 使用`new`创建合约，但是合约未创建成功
- 对空合约（合约没有内容）执行外部函数调用
- 合约通过一个没有`payable`修饰符的公有函数（包括构造函数和 fallback 函数）接收 Ether
- 合约通过公有`getter`函数接收 Ether
- 调用`transfer()` 失败

`require`的本质是执行一个回退操作（指令0xfd）
>从 Metropolis 版本起 require 式的异常不会消耗任何 gas

###revert
`revert`可以标记一个错误，并且对当前函数执行回退操作，用法和`require`类似，看下面的例子
```
if (amount > msg.value / 2 ether)
revert("Not enough Ether provided.");
 // 下边是等价的方法来做同样的检查：
require(
    amount <= msg.value / 2 ether,
    "Not enough Ether provided."
);
```
>`revert`函数的参数是可选的，可直接调用`revert();`终止函数并执行回退操作
###throw
`throw`作用和`revert`相同，但是从0.4.13版本该函数已被废弃