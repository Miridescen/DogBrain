
[Solidity英文文档连接](http://solidity.readthedocs.io/en/latest/index.html)

[Solidity简体中文文档连接](http://solidity-cn.readthedocs.io/zh/develop/)

[Solidity编辑器Remix](https://remix.ethereum.org/)

[Solidity关键字索引](http://solidity.readthedocs.io/en/latest/genindex.html)

[中文文档](https://solidity-cn.readthedocs.io/zh/develop/types.html#function-types)

[英文文档](https://link.jianshu.com/?t=http://solidity.readthedocs.io/en/develop/types.html#function-types)

文章目录

- 函数的构成
- 构造函数（construction）和函数修饰器（modifier）
- 函数的调用
- 其他

---

##函数的构成
在各种语言中，函数都是最最重要的东西，solidity也一样，看下面的函数列子，然后一部分一部分拆解

```
function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
```
####函数命名

你喜欢就好，不做过多介绍

####函数参数

包括三部分

- **参数类型**
- **参数存储形式**：可以用`storage`和`memory`修饰，后面会详细介绍，上面例子中没有体现
- **参数名**：参数名是可选的，省略参数名的参数也会存储在栈上，但是不可访问（一般省略参数名都是在返回值中，如上面的例子）

####函数返回值

`returns`到大括号中间的部分，允许同时返回多个值，以元组（元素数量固定，但可以包含不同类型）的形式返回，见下面的例子

```
function operation(uint a, uint b) public pure returns(uint add, uint sub, uint mul, uint div){
        return (a+b, a-b, a*b, a/b); // 以元组的形式返回多个值
    }
```
使用返回值的时候，只要以元组的形式接收就可以了（元组中不关注的信息可以省略）见下面的例子

```
function callTest() public pure returns(uint){
        (, , ,uint div) = operation(4, 2); // 调用上面的operation函数
        // 元组中元素以逗号分割，不关注的元素可以省略，但是要注意逗号的数量
        return div;
    }
```
####函数修饰词（个人这样命名的）

函数修饰词对于一个函数很关键，他标明了函数的很多特性，修饰词分为几类

**1.标明函数类型**

- `internal`：内部函数，可以在当前合约内被调用，除此以外还可以被子合约调用，调用方式`f`
- `external`：外部函数，合约外调用，调用方式是`this.f()`或`C.f()`（`C`是合约实例），其实合约内部也可以实现外部调用，但是要用`this.f()`的形式，后面函数调用部分会讲解

**2.标明函数可见性**

- `public`：函数没有限制，在合约内合约外等任何地方都可调用，函数默认都是`public`
- `private `：和`internal`类似，区别是子合约不能调用父合约中`private `修饰的函数

>其实`internal`、`external`、`public`、`private `都属于函数可见性修饰词，所以，一个函数只允许四个词当中的一个修饰，另外，`internal`、`external`是函数特有的修饰词，而`public`、`private `除了修饰函数外还可以修饰别的，如状态变量

**3.标明函数状态**

- `view`：修饰的函数不能修改状态变量的值，只能从区块中读取状态变量的值（修改状态变量值需要花费gas）
- `constant `：`view`的旧版本，作用和`view`一样
- `pure`：修饰的函数不能读取和也不能修改状态变量的值，比`view`更严格

**4.Ether相关**

- `payable `：如果一个函数想进行Ether货币操作（比如转账），必须用该关键字修饰

>在高版本Remix编译器中，当缺少函数修饰词的时候，会出现编译警告，提示该用哪些词修饰，但是一个函数的修饰词应该是设计函数的时候就想好的


##构造函数（construction）和函数修饰器（modifier）

####构造函数（construction）

构造函数大概这个样子

```
pragma solidity ^0.4.22;
contract HelloWorld{
    string str;
    constructor(string str1) public { // 构造函数
        str = str1;
    }
}
```
构造函数在合约中只会在合约初始化时执行一次，作用就是初始化一些状态变量
使用构造函数的时候要注意几点：

- 不能再构造函数中使用`this`，因为这个时候合约还没有初始化完成
- constructor关键字是在0.4.22版本才加入到solidity中的，之前的版本构造函数大概这个样子

```
pragma solidity ^0.4.1;
contract HelloWorld{
    string str;
    function HelloWorld(string _str) public { // 构造函数，和合约同名
        str = _str;
    }
}

```
这样做的目的是为了区分构造函数，幸运的是，在0.4.22及以后版本中如果构造函数不使用`constructor`，编译器会有警告

####函数修饰器（modifier）

可以简单的理解就是给原有函数添加额外功能，定义一个函数修饰器大致如下

```
modifier onlyMyself(address _address) {
    require(msg.sender == _address, "传入的address不是函数调用者"); 
    _;  //这行是被修饰函数内容执行的地方
  }
```

上面定义了一个修饰器，功能是验证输入的参数是否是函数调用者，如果不是，会抛出异常，如果是，会往下执行
调用方式如下，结合上面的代码

```
function justExample(address _address) public view onlyMyself(_address) returns(address){
        return _address;
    }
```
**注意：**

- 函数修饰器中`_`所在的位置，就是被修饰函数内容被执行的位置
- 使用时函数修饰器在`returns`前面，其传入参数就是函数的传入参数（当然也可以没有参数）
- 一个函数可以同时调用多个函数修饰器，中间用空格隔开就可以，执行时会按顺序执行
- 函数修饰器可以被继承，并且可以被重写
- 函数修饰器可以是将相同功能的代码包装起来，在合适的地方调用

##函数的调用

首先大体了解一个东西EVM虚拟机，类似java虚拟机，solidity是面向用户的高级开发语言，最终写好的solidity代码都会经过编译变成机器能识别的机器码，这些机器码在执行的时候又分为字节跳转执行和发消息执行，具体的机制可以见另外一篇文章[EVM相关文章]()

####内部调用（internal）

被`internal`修饰的函数支持内部调用，调用方式`f()`，内部调用不会产生EVM消息调用（消息调用和交易类似，他们都有一个源，一个目标，数据负载，以太币，gas和返回的数据）
内部调用可以理解为EVM指令的跳转，这样在函数调用的时候内存不会被回收，各种数据的传递更快，内部调用支持继承的函数，并且可以递归调用

####外部调用（external）

被`external`修饰的函数支持内部调用，调用方式是`this.f()`或`C.f()`（C是合约实例）,外部调用会产生EVM消息调用
介绍一下如何进行一次外部调用
首先我们需要一个外部合约，他的代码是这样子的

```
pragma solidity ^0.4.22;
contract inter{
    function say() public pure returns(string){
        return "helloWorld";
    }
}
```
把合约部署之后会得到一个这样`0x194c33d2b48331b4fab8f7ea7f2105874e8bdacc`的合约地址
然后编写当前合约代码，类似这样

```
pragma solidity ^0.4.22;
// 抽象合约
contract Inter{function say() public pure returns (string);}
contract HelloWorld { 
    // 合约地址
    address interAdd = 0x194c33d2b48331b4fab8f7ea7f2105874e8bdacc;
    // 实例化合约
    Inter inter = Inter(interAdd); 
    function sayHello() payable public returns(string){
        // 调用inter合约的say方法
        return inter.say();
    }
}
```
solidity0.4.11及之后的版本增加了另外一种外部调用的方式`interface`

```
pragma solidity ^0.4.22;
// 接口
interface Inter{function say() external returns (string);}
contract HelloWorld { 
    // 合约地址
    address interAdd = 0x194c33d2b48331b4fab8f7ea7f2105874e8bdacc;
    // 实例化合约
    Inter inter = Inter(interAdd); 
    function sayHello() payable public returns(string){
        // 调用inter合约的say方法
        return inter.say();
    }
}
```
注意除了关键字的不同，函数的修饰词也不一样
其实我觉得接口（interface）这种形式更像是为了外部调用设计的
分开说一下这两种形式

#####抽象合约（Abstract Contracts）

- 抽象合约函数的定义形式和普通合约一样，唯一区别就是函数没有函数体，在返回参数之后用`;`隔开
- 抽象合约可以被继承，并且可以通过重写函数来实现未实现的函数
- 抽象合约更像是合约提前设计的一整套函数接口

#####接口（Interfaces）

接口和抽象合约很像，通过上面的例子也看出来了，但是他们之间有几点不同

- 无法继承其他合约或接口
- 无法定义构造函数
- 无法定义变量
- 无法定义结构体
- 无法定义枚举

虽然接口不能继承于另外一个接口，但是合约可以继承于一个接口

##其他

####区分函数类型（Function Type）和函数抽象

函数抽象

```
function foo(address) external returns (address); 
// `foo`是函数名
```
函数类型

```
function(address) external returns (address) foo;
// 声明了一种function(address) external returns (address)类型的变量，叫foo
```
函数类型定义如下

```
function (<parameter types>) {internal|external} [pure|constant|view|payable] [returns (<return types>)]
```
####外部函数调用发送eth和gas

```
// 调用函数发送的eth及gas
inter.say.value(10).gas(300)();  
```
value和gas只是声明要花费多少，最后面的括号才是执行