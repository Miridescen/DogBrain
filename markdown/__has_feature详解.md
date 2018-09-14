在iOS开发中总能看见`__has_feature`宏，最常见的例如`__has_feature(objc_arc)`，表示支持自动引用计数机制（ARC），类似的还有`objc_arc_weak `、`objc_arc_fields `等
`__has_feature`在Clang文档中的定义是这样的
>  `__has_feature` and `__has_extension`
>These function-like macros take a single identifier argument that is the name of a feature. `__has_feature` evaluates to 1 if the feature is both supported by Clang and standardized in the current language standard or 0 if not (but see [below](http://clang.llvm.org/docs/LanguageExtensions.html#langext-has-feature-back-compat)), while `__has_extension` evaluates to 1 if the feature is supported by Clang in the current language (either as a language extension or a standard language feature) or 0 if not. They can be used like this:

大致的意思是通过给定的值，判断编译器是否支持该特性
类似的特性检测宏还有`__has_builtin`、`__has_attribute`等，他们都属于Feature Checking Macros
类似的还有Include File Checking Macros大类的宏定义，用于检测是否包含文件，常见的有 `__has_include`等


[Clang Language Extensions文档连接](http://clang.llvm.org/docs/LanguageExtensions.html)


`__has_feature`支持哪些参数，可以看一下Clang源码`PPMacroExpansion.cpp`文件中的`HasFeature`方法，在文件的855行到1005行，方法再结合文档，基本可以熟练的使用这个宏了

[PPMacroExpansion.cpp文件代码连接](http://docs.huihoo.com/doxygen/clang/r222231/PPMacroExpansion_8cpp_source.html)

