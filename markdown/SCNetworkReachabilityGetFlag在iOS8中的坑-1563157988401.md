最近在做网络请求相关的东西，在测试不同iOS版本的时候发现SCNetworkReachabilityGetFlag方法在不同的iOS版本中对参数格式的支持不同，具体情况写了个小例子，如下：

```
    NSString *url111 = @"www.baidu.com";
    SCNetworkReachabilityRef ref111 = SCNetworkReachabilityCreateWithName(NULL, [url111 UTF8String]);
    
    SCNetworkReachabilityFlags flags111 = 0;
    SCNetworkReachabilityGetFlags(ref111, &flags111);
    
    NSLog(@"flags111 == %u" , flags111);
    
    NSString *url222 = @"www.baidu.com/";
    SCNetworkReachabilityRef ref222 = SCNetworkReachabilityCreateWithName(NULL, [url222 UTF8String]);
    
    SCNetworkReachabilityFlags flags222 = 0;
    SCNetworkReachabilityGetFlags(ref222, &flags222);
    
    NSLog(@"flags222 == %u" , flags222);
```
上面的代码分别用`www.baidu.com`和`www.baidu.com/`做了不同的测试，注意，连个网址后面差了一个`/`
在iOS 8.1版本中打印结果是：

```
2018-03-05 17:14:59.644 test1111[4632:474469] flags111 == 2
2018-03-05 17:14:59.645 test1111[4632:474469] flags222 == 0
```
在iOS 11.2版本中打印结果是：

```
2018-03-05 17:20:38.112919+0800 test1111[4792:482650] flags111 == 2
2018-03-05 17:20:38.113373+0800 test1111[4792:482650] flags222 == 2
```

其他的iOS版本没有测试
总结来说就是SCNetworkReachabilityGetFlag方法的第二个参数在iOS 8.1版本中不支持地址后拼接`/`等

具体是因为什么还不清楚，哪个大神知道的可以说明下，谢谢！