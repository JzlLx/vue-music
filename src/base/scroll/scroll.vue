<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    //会非实时（屏幕滑动超过一定时间后）派发scroll 事件
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    //数据变化时更新数据
    data: {
      type: Array,
      default: null
    }
  },
  methods: {
    //初始化scroll
    _initScroll () {
      //确保wrapper渲染再初始化
      if( !this.$refs.wrapper ){
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    //启用 better-scroll, 默认 开启。
    enable () {
      this.scroll && this.scroll.enable()
    },
    //禁用better-scroll，DOM事件的回调函数不再响应
    disable () {
      this.scroll && this.scroll.disable()
    },
    //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    // 滚动
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 滚动到对应的节点
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    //data变化时自动更新
    data () {
      setTimeout(() => {
        this.refresh() 
      }, 20)
    }
  },
  mounted () {
    //确保dom渲染后再初始化scroll
    setTimeout(() => {
      this._initScroll() 
    }, 20)
  }
}
</script>
