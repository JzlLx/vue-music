<template>
    <div class="singer">

    </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      singers: [],
    }
  },
  methods: {
    _getSingerList () {
      getSingerList().then(res => {
        if(res.code === ERR_OK){
          this.singers = res.data.list
          console.log(res.data.list)
        }
      })
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