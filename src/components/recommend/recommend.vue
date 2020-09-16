<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- 轮播图 -->
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl"/>
              </a>
            </div> 
          </slider>  
        </div>
        <!-- 歌单列表 -->
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in discList" :key="item.dissid" class="item">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgurl" />
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 加载组件 -->
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import slider from 'base/slider/slider'  //轮播图组件
import scroll from 'base/scroll/scroll'  //滑动组件
import loading from 'base/loading/loading'  //加载组件
import { getRecommend, getDiscList } from 'api/recommend'  //api
import { ERR_OK } from 'api/config'

export default {
  components: {
    slider,
    scroll,
    loading
  },
  data () {
    return {
      recommends: [],  //轮播图
      discList: [],    //歌单    
      checkLoaded: false  //  
    }
  },
  methods: {
      //获取轮播图数据
      _getRecommend() {
        getRecommend().then(res => {
          if(res.code === ERR_OK){
            this.recommends = res.data.slider
          //   let temp = res.data.mvlist.slice(0, 4)
          //   this.recommends = temp.map(item => {
          //     return {
          //       id: item.mv_id,
          //       linkUrl: item.picurl
          //     }
          //   })
          }
        })
      },
      //获取推荐歌单列表
      _getDiscList() {
        getDiscList().then((res) => {
          if(res.code === ERR_OK){
            this.discList = res.data.list
            // console.log(res.data.list)
          }
        })
      },
      //图片加载成功
      loadImage() {
        if(!this.checkLoaded){
          this.checkLoaded = true
          this.$refs.scroll.refresh()
        }
      }
  },
  created () { 
    this._getRecommend()
    this._getDiscList()
  }
}
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
.recommend{
  position fixed
  width 100%
  top 80px
  bottom 0
  .recommend-content{
    height: 100%
    overflow-y: auto
    .slider-wrapper{
      position relative
      width 100%
      overflow hidden
    }
    .list-title{
      height 55px
      line-height: 55px
      text-align: center
      font-size: $font-size-medium
      color: $color-theme
    }
    .item{
      display: flex
      box-sizing: border-box
      align-items: center
      border-top 1px #333 solid
      padding: 10px 20px
      .icon{
        flex: 0 0 60px
        width: 60px
        height 60px
        padding-right: 20px
      }
      .text{
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        font-size: $font-size-medium
        .name{
          margin-bottom: 10px
          color: $color-text
        }
        .desc{
          color: $color-text-d
        }
      }
    }
    .loading-container{
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
    }
  }
}
</style>