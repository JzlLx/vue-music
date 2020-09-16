<template>
  <scroll
    ref="listView"
    :data="data"
    class="listview">
    <ul>
      <li
        ref="listGroup"
        v-for="group in data"
        :key="group.title"
        class="list-group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
            v-for="item in group.items"
            :key="item.id"
            class="list-group-item">
            <img
              v-lazy="item.avater"
              class="avater"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="tag-lsist"
      @touchstart="touchStart"
      @touchmove.stop.prevent="touchmove">
      <ul>
        <li
          v-for="(item,index) in tagList"
          :key="index"
          :data-index="index"
          class="tag-item">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll> 
</template>

<script>
import scroll from 'base/scroll/scroll'  //滑动组件
import { getData } from 'common/js/dom'
export default {
  props: {
    // 列表数据
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    tagList () {
      return this.data.map(item => {
        return item.title.substr(0, 1)
      })
    }
  },
  components: {
    scroll
  },
  methods: {
    // 右侧标签栏开始滑动
    touchStart (e) {
      let tagIndex = getData(e.target, 'index')
      // let tagIndex = e.target.dataset.index
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      // 保存一开始点击的是第几个元素
      this.touch.tagIndex = tagIndex
      this.scrollTo(tagIndex)
    },
    // 右侧标签栏滑动中
    touchmove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // 计算y轴上的偏移量 每个元素高度为18
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / 18)
      let tagIndex = this.touch.tagIndex + delta
      this.scrollTo(tagIndex)
    },
    // 滚动到第几个节点
    scrollTo (index) {
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    }
  },
  created () {
    this.touch = {}
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"

.listview {
  position relative
  width 100%
  height 100%
  overflow-y auto
  background $color-background
  .list-group {
    padding-bottom 30px
    .list-group-title {
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
    }
    .list-group-item {
      display flex
      align-items center
      padding 20px 0 0 30px
      .avater {
        width 50px
        height 50px
        border-radius 50%
      }
      .name {
        margin-left 20px
        color $color-text-l
        font-size $font-size-medium
      }
    }
  }
  .tag-lsist {
    position fixed
    z-index 30
    right 0
    top 50%
    transform translateY(-40%)
    width 20px
    padding 15px 0
    border-radius 10px
    text-align center
    background $color-background-d
    font-family Helvetica
    .tag-item {
      font-size $font-size-small
      line-height 1
      padding 3px
      color $color-text-l
      &.current {
        color $color-theme
      }
    }
  }
}
</style>