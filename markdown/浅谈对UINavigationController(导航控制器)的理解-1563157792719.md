有时候会遇到这样的情况，一个导航控制器，push出的很多层controller，当我们在不同的页面对导航控制器的显示效果做不同的操作的时候，会发现针对导航控制器的逻辑操作很麻烦。因为是同一个控制器，在某一个页面的操作效果会影响到其他页面上的导航条显示效果，这样会增加控制器之间的耦合度，很不利于开发。

为了解决这样的问题，可以顺着下面的思路解决问题。

导航控制器作用无非两种，一种是push控制器，做页面之间的跳转，另外一种功能是，他是一个view，上面可以显示一些东西，例如按钮，搜索框等等。

既然这样，我们是不是可以把导航控制器功能进行分解，解决上面的问题。
下面介绍一下我的解决方法。

在整个项目中创建一个根导航控制器，这个根导航控制器的作用只用来做页面之间的跳转，不起显示作用，这样我们只要隐藏navigationBar就可以

![NavigationController](http://upload-images.jianshu.io/upload_images/2048405-0604f3447b8b6e1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
其实只要把navigationBar隐藏就行，其他的操作看自己的个人功能需求。

以后项目中push的控制器都添加上这个根控制器，这样做的效果就是虽然导航控制器存在，但是push出来的控制器上不在显示navigationBar了。

那么接下来我们要做的就是在push出的控制器view上添加上navigationBar就可以了

![ViewController](http://upload-images.jianshu.io/upload_images/2048405-08d654c66f45d1a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
好了，完成了，以后所有针对导航条的显示上的操作，只要在自己的控制器里就行了

这样做还有一个好处就是push后自带的从屏幕边缘滑动返回不会因为自定义导航栏控制器的返回按钮而取消

另外要注意一点就是页面上继续添加view的时候，frame的问题。

最后分享一个将导航条弄透明的方法，结合上面的代码，很简单只要三行代码

![nav设置透明.png](http://upload-images.jianshu.io/upload_images/2048405-f09bc3b8ad5146a2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/620)
只要这样navBar就变透明了，以后针对导航栏的颜色操作，只要改变里面的navBgView的背景色就可以了