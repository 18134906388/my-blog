# CSS中遇到的问题

## 盒模型
标准模式 盒子模型的width/height = content + padding + border + margin

IE模式  盒子模型的width/height = content + margin ，其中content包含上面的content + padding + border

两种模式通过html5 第一行的doctype区分

两种盒模型也可以通过box-size切换：content-box就是标准盒模型 border-box就是IE盒模型 inherit是从父div继承

## 行内元素与块级元素
- 行内元素，在文档流中水平排列，不可以设置宽高，宽高为元素内容的宽高，但可以设置行高line-height，不可以设置padding和margin的上下边距。其中不能包含块级元素。```<span>```

- 块级元素，在文档流中垂直排列，可以设置宽高，宽高为元素内容的宽高加，可以设置padding和margin的上下边距。其中可以包含行内元素。```<div>```

- 行内块级元素，在文档流中水平排列，可以设置宽高，宽高为元素内容的宽高加，可以设置padding和margin的上下边距。其中可以包含行内元素和块级元素。display:inline-block

行内元素可以和块级元素通过display相互转换。

## css选择器
- 类选择器
- id选择器
- 元素选择器
- 通用选择器
- 伪类选择器
- 属性选择器

内联样式>内部样式>外部样式  ！important权值最高 
- 内联样式表的权值最高 1000。
- ID 选择器的权值为 100。
- Class 类选择器的权值为 10。
- HTML 标签（类型）选择器的权值为 1。

## 块级元素并排
- float方法 漂浮的元素脱离了文档流，可能带来布局上的混乱（不推荐）。
- table布局 （各种各样的问题，不推荐）
- flex弹性盒模型
- grid栅格布局

## flex弹性盒模型
![flex](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)
推荐阮一峰老师的两篇文章http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html<br>
http://www.ruanyifeng.com/blog/2015/07/flex-examples.html
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。
```css
.class{
  display:flex/*指定元素为flex元素*/
  display:inline-flex/*指定行内元素为flex元素*/
}

.box {
  flex-direction: row | row-reverse | column | column-reverse; \*控制主轴方向*\
  flex-wrap: nowrap | wrap | wrap-reverse; \*控制元素是否换行以及换行方向*\
  flex-flow: <flex-direction> || <flex-wrap>; \*此属性是以上两个属性的简写*\
  justify-content: flex-start | flex-end | center | space-between | space-around; \*定义子元素在主轴上的对齐方式*\
  align-items: flex-start | flex-end | center | baseline | stretch; \*定义元素在交叉轴上的对齐方式*\
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;\*定义多根轴线的对齐方式*\
}

.item{
	order: <integer>;\*用来设置子元素的排列顺序，数值越小越靠前，默认为0*\
	flex-grow: <number>;\*用来设置子元素的放大比例*\
	flex-shrink: <number>;\*用来设置子元素的缩小比例*\
	flex-basis: <length> | auto;\*定义在分配剩余空间之前，子元素所占的空间，可以设置成固定值*\
	flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] \*前面几个属性的缩写*\
	align-self: auto | flex-start | flex-end | center | baseline | stretch;\*可以设置单个子元素不同的对齐方式*\
}
```
## 浮动以及清除浮动
使用float:left/right会使元素浮动，浮动元素会脱离文档流从而引起父元素的坍塌，所以使用完浮动要及时清除浮动，清除浮动有四种方法
- 给父元素加一个高度height:200px;
- 在浮动结束后加一个空div 设置css样式 clean:both;
- 给父级div设置css样式overflow:hidden/auto;
- 给父级元素添定义zoom

## BFC
BFC称为块级格式化上下文，它最大的特点就是每一个BFC都相当于一个容易，相互之间不会有影响，因此可以避免很多问题，比如div合并margin问题。
### BFC的特性
- BFC中的元素从上到下依次排列
- 垂直方向上的两个div会合并外边距
- 每个元素的margin box左边和包含块的border box左边接触
- BFC块不会与float box重叠
- 计算BFC高度时，浮动元素高度也会参与计算
- BFC之间不会相互影响
### BFC触发条件
- 根元素，即html
- float不为none（默认）
- overflow不为visible（默认）
- display为inline-block table-cell table-caption
- position为absolute fixed

## CSS实践中遇到的问题
#### 将input type="file" 伪装成一个按钮
具体代码见demo1
