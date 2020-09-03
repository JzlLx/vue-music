<template>
    <div class="singer">

    </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
export default {
  data () {
    return {
      singers: [],
      // url: `//y.gtimg.cn/music/photo_new/T001R150x150M000${item.url}.jpg?max_age=2592000`
    }
  },
  methods: {
    _getSingerList () {
      getSingerList().then(res => {
        if(res.code === ERR_OK){
          this.singers = res.data.list
          // console.log(this.singers)
          console.log(this.formatSingerList(this.singers))
        }
      })
    },
    // 格式化歌手数据
    formatSingerList (list) {
      let map = {
        hot: {
          title: '热门',
          items: []
        }
      }
      list.forEach((item, index)=> {
        // 取前10条数据作热门分组
        if (index < 10) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_id,
            name: item.Fsinger_name,
            url: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_id,
          name: item.Fsinger_name,
          url: item.Fsinger_mid
        }))
      })
      // 对数据进行排序
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === '热门') {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  },
  created () {
    this._getSingerList()
  }
}
</script>

<style lang="stylus" scoped>
.singer{
  position fixed
  top 88px
  bottom 0
  width 100%
}
</style>