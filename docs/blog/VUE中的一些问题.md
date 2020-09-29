# VUE 中的一些问题

## MVVM 的理解

model 是我们的业务逻辑数据，view 是向用户展示的界面，他们之间通过 viewmodel 关联起来，viewmodel 负责监听 model 变化并且更新 view，处理用户交互操作。model 和 viewmodel 中存在双向数据绑定，因此 model 更改了会同步刷新 view，同时 view 中用户交互操作引起的数据变化也会在 model 中同步。这么模式最大的好处在于我们可以安心处理业务逻辑，不需要自己操作 dom 刷新数据。

## 生命周期详解

啥也不说了，先掏出祖传的生命周期图看一波，这里涉及到一个叫钩子函数的概念，在我理解就是像钩子一样，我们可以在 vue 的不同生命周期挂载自己的函数<br>
![vue生命周期](https://cn.vuejs.org/images/lifecycle.png)

- beforeCreate 发生在实例刚创建，属性还没有计算，这里取不到$el,$date，实际开发过程中我们可以在这里添加一个 loading 函数。
- created 这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调，这里我们可以访\$date,实际开发过程中在这结束 loading，数据初始化。
- beforeMount 挂载之前被调用，这里可以访问到$el,$date 但是在\$el 中所有双向绑定的数据均使用\{\{`xxxx`\}\}占位。
- mounted 挂载之后被调用，这里可以访问到正常的$el,$date。实际开发过程中在这发现后端查询，这里可以操作 dom。
- beforeUpdate 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。实际开发过程中可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
- updated 这里数据已经被更新，DOM 已重新渲染和补丁也已经打好，实际开发过程中避免在此期间更改状态，因为这可能会导致更新无限循环。
- activated keep-alive 组件独有的状态，组件激活时调用。
- deactivated keep-alive 组件独有的状态，组件停用时调用。
- beforeDestroy 实例销毁之前调用。在这一步，实例仍然完全可用，实际开发过程中可以做删除确认操作。
- destroyed 实例销毁之后调用。在这一步，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。实际开发过程中可以做内容清空操作。

## 响应式原理

![vue响应式原理](https://cn.vuejs.org/images/data.png)
将一个普通的 js 对象传给 vue 实例的 date 选项时，vue 会使用 Object.defineProperty 会便利对象的属性将它们转换为 getter 和 setter，每个 vue 实例都有一个 wacther 对象，当组件渲染的时候，watcher 会通过 getter 将属性记录为依赖，当依赖的 setter 被调用时，会通知 watcher 重新渲染组件。

Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。如果我们想在 DOM 状态更新后做点什么，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数在 DOM 更新完成后就会调用。

## 组件通信

### 父子组建通信

父组件通过 prop 将数据传入子组件，子组件通过$emit发送事件传递数据给父组件。另外如果你使用 Vue 2.3 及以上版本的话还可以使用 $listeners 和 .sync 这两个属性。

```javascript
<!--父组件中-->
<input :value.sync="value" />
<!--以上写法等同于-->
<input :value="value" @update:value="v => value = v"></comp>
<!--子组件中-->
<script>
  this.$emit('update:value', 1)
</script>
```

### 兄弟组件通信

对于这种情况可以通过查找父组件中的子组件实现，也就是 this.$parent.$children，在 \$children 中可以通过组件 name 查询到需要的组件实例，然后进行通信。

### 跨多层次组件通信

对于这种情况可以使用 Vue 2.2 新增的 API provide / inject，虽然文档中不推荐直接使用在业务中，但是如果用得好的话还是很有用的。

```javascript
// 父组件 A
export default {
  provide: {
    data: 1,
  },
}
// 子组件 B
export default {
  inject: ['data'],
  mounted() {
    // 无论跨几层都能获得父组件的 data 属性
    console.log(this.data) // => 1
  },
}
```

## mixin 和 mixins 区别

mixin 为全局混入会影响到所以组件实例，谨慎使用。经常用来封装一些全局方法，比如 ajax 调用。
mixins 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码。

```javascript
// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    },
  },
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin],
})

var component = new Component() // => "hello from mixin!"
```

## computed 和 watch 区别

computed 是计算属性的值，其中的变量可以不在 data 中，且 computed 的值有缓存，只有当计算值变化才会返回内容。
watch 是监听到值变化就会执行回调。

另外 computed 和 watch 还都支持对象的写法

```javascript
vm.$watch('obj', {
  // 深度遍历
  deep: true,
  // 立即触发
  immediate: true,
  // 执行的函数
  handler: function (val, oldVal) {},
})
var vm = new Vue({
  data: { a: 1 },
  computed: {
    aPlus: {
      // this.aPlus 时触发
      get: function () {
        return this.a + 1
      },
      // this.aPlus = 1 时触发
      set: function (v) {
        this.a = v - 1
      },
    },
  },
})
```

## vue 渲染机制

参考https://segmentfault.com/a/1190000009467029
![vue渲染机制](../.vuepress/public/img/vueRender.png)

独立构建：包含模板编译器

渲染过程: html 字符串 → render 函数 → vnode → 真实 dom 节点

运行时构建： 不包含模板编译器

渲染过程: render 函数 → vnode → 真实 dom 节点

template 会被便以为 render 函数，render 函数返回值是一个 jsx 写法的 dom 树，随后 vm.\_render 函数会将 r 前面字符串编译的 ender 函数转化成 vnode（虚拟节点），随后 vm.\_update 函数将 vnode 更新在真实的 dom 上面

## vue 双向绑定原理自己实现

我们都知道实现数据双向绑定，需要实现如下几点：

1. 需要实现一个数据监听器 Observer, 能够对所有数据进行监听，如果有数据变动的话，拿到最新的值并通知订阅者Watcher。
2. 需要实现一个指令解析器Compile，它能够对每个元素的指令进行扫描和解析，根据指令模板替换数据，以及绑定相对应的函数。
3. 需要实现一个Watcher, 它是链接Observer和Compile的桥梁，它能够订阅并收到每个属性变动的通知，然后会执行指令绑定的相对应的回调函数，从而更新视图。

```javascript
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>标题</title>
  </head>
  <body>
    <div id="app">
      <input type="text" v-model="count" />
      <input type="button" value="增加" @click="add" />
      <input type="button" value="减少" @click="reduce" />
      <div v-bind="count"></div>
      <input type="text" v-model="count1.a" />
      <div v-bind="count1.a"></div>
    </div>
    <script type="text/javascript">
      class Vue {
        constructor(options) {
          this.$el = document.querySelector(options.el)
          this.$methods = options.methods
          this._binding = {}
          this._observer(options.data)
          this._compile(this.$el)
        }
      // 根据路径获取对象value
        _getObjByPath(path, object) {
          var pathList = path.split('.')
          var obj = null
          obj = object
          if (!obj) {
            return undefined
          }
          let key = ''
          for (var i = 0; (key = pathList[i]); i++) {
            obj = obj[key]
          }
          return obj
        }
        _pushWatcher(watcher) {
          if (!this._binding[watcher.key]) {
            this._binding[watcher.key] = []
          }
          this._binding[watcher.key].push(watcher)
        }
        /*
           observer的作用是能够对所有的数据进行监听操作，通过使用Proxy对象
           中的set方法来监听，如有发生变动就会拿到最新值通知订阅者。
          */
        _observer(datas) {
          const me = this
          const handler = {
            set(target, key, value) {
              const rets = Reflect.set(target, key, value)
              me._binding[key].map((item) => {
                item.update()
              })
              return rets
            },
          }
          this.$data = new Proxy(datas, handler)
        }
        /*
           指令解析器，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相对应的更新函数
          */
        _compile(root) {
          const nodes = Array.prototype.slice.call(root.children)
          const data = this.$data
          nodes.map((node) => {
            if (node.children && node.children.length) {
              this._compile(node.children)
            }
            const $input = node.tagName.toLocaleUpperCase() === 'INPUT'
            const $textarea = node.tagName.toLocaleUpperCase() === 'TEXTAREA'
            const $vmodel = node.hasAttribute('v-model')
            // 如果是input框 或 textarea 的话，并且带有 v-model 属性的
            if (($vmodel && $input) || ($vmodel && $textarea)) {
              const key = node.getAttribute('v-model')
              this._pushWatcher(new Watcher(node, 'value', data, key))
              node.value = this._getObjByPath(key, data)
              node.addEventListener('input', () => {
                data[key] = node.value
              })
            }
            if (node.hasAttribute('v-bind')) {
              const key = node.getAttribute('v-bind')
              this._pushWatcher(new Watcher(node, 'innerHTML', data, key))
            }
            if (node.hasAttribute('@click')) {
              const methodName = node.getAttribute('@click')
              const method = this.$methods[methodName].bind(data)
              node.addEventListener('click', method)
            }
          })
        }
      }
      /*
         watcher的作用是 链接Observer 和 Compile的桥梁，能够订阅并收到每个属性变动的通知，
         执行指令绑定的响应的回调函数，从而更新视图。
        */
      class Watcher {
        constructor(node, attr, data, key) {
          this.node = node
          this.attr = attr
          this.data = data
          this.key = key
        }
        update() {
          this.node[this.attr] = this.data[this.key]
        }
      }
    </script>
    <script type="text/javascript">
      new Vue({
        el: '#app',
        data: {
          count: 0,
          count1: { a: 1, b: 2 },
        },
        methods: {
          add() {
            this.count++
          },
          reduce() {
            this.count--
          },
        },
      })
    </script>
  </body>
</html>
```
