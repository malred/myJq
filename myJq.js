// 立即执行函数
;(function () {
    // 返回一个对象,支持链式编程
    var jquery = function (selector) {
        // 传入的选择器可能选中多个
        return new jquery.prototype.init(selector) // init{constructor(selector){},...}
    }
    // 每个对象都有原型(函数也是对象)
    // 对象的实例共享同一套原型
    jquery.prototype = {
        // 初始化方法 -> 选择器
        // 返回init()是对象
        init: function (selector) {
            // 根据选择器获取dom(实际上jq自己搞了一个获取的方法)
            var dom = document.querySelectorAll(selector)
            // this是当前对象
            return markArray(this, dom)
        },
        // 设置css样式 ('background','red')
        css: function (attr, val) {
            var arg = arguments.length
            // 传入一个参数是获取,传入两个是设置
            if (arg == 2) {
                // this是init对象
                for (var i = 0; i < this.length; i++) {
                    this[i].style[attr] = val
                }
            } else if (arg == 1) {
                return this[0].style[attr]
            }
        },
        // (单)元素的innerHTML
        html: function (element) {
            if (arguments.length == 0) {
                return this[0].innerHTML
            }
            if (!element) return
            if (typeof element === 'string' || typeof element === 'number') {
                this[0].innerHTML = element
                return
            }
            // 如果传入的有多个html元素
            if (element.length > 1) {
                let doms = document.createElement('span')
                for (var i = 0; i < element.length; i++) {
                    doms.append(element[i])
                }
                this[0].innerHTML = doms.innerHTML
            } else {
                this[0].innerHTML = element.innerHTML || element
            }
        },
        // 添加子元素
        append: function (element) {
            this[0].appendChild(element)
            return this
        },
        // 获取选择器选中的第一个元素
        first: function () {
            return this[0]
        },
        // 获取选择器选中的最后一个元素
        last: function () {
            return this[this.length - 1]
        },
        // 添加或获取dom元素的属性
        attr: function (attr, value) {
            // 没有参数,获取所有属性名
            if (arguments.length == 0) {
                return this[0].getAttributeNames()
            }
            // 一个参数,说明要获取属性
            if (arguments.length == 1) {
                return this[0].getAttribute(attr)
            }
            // 如果是两个参数,说明要设置属性
            this[0].setAttribute(attr, value)
            return this
        },
        // 根据属性名称删除dom元素的属性
        rmAttr: function (attr) {
            // 没有传属性名,则不做操作
            if (arguments.length == 0) {
                return this
            }
            // 存在该属性才删除
            if (this[0].getAttribute(attr)) {
                this[0].removeAttribute(attr)
            }
            return this
        }
    }
    // ! init和css等其他方法平级,但是通过这句可以把其他方法赋值给init
    jquery.prototype.init.prototype = jquery.prototype

    // 获取dom
    function markArray(that, dom) {
        for (var i = 0; i < dom.length; i++) {
            // 把获取的dom元素放入init对象
            that[i] = dom[i]
        }
        // 添加length属性
        that.length = dom.length
    }

    // 挂载jquery函数到全局作用域,外部就可以访问了
    window.jquery = window.$ = jquery
})()
