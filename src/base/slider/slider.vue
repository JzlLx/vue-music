<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" 
                :key="index"
                :class="{active:currentPageIndex===index}"></span>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
    data (){
        return {
            dots: [],
            currentPageIndex: 0  //当前是第几张图片
        }
    },
    props: {
        loop:{               //是否循环轮播
            type: Boolean,   
            default: true
        },
        autoPlay:{           //是否自动轮播
            type: Boolean,
            default: true
        },
        interval:{           //自动轮播的时间
            type: Number,
            default: 3000
        }
    },
    methods: {
        _setSliderWidth(isResiz) {
            //拿到图片的个数
            this.children = this.$refs.sliderGroup.children
            //计算父容器的宽度
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            for(let i = 0; i < this.children.length; i++){
                let child = this.children[i]
                addClass(child, 'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            if(this.loop && !isResiz){
                width += 2*sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        //初始化轮播图
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider,{
                scrollX: true,    //横向滚动
                scrollY: false,   //禁止纵向滚动
                momentum: false,  //惯性
                snap: true,
                snapLoop: this.loop,  //是否可以无缝循环轮播
                snapThreshold: 0.3,   //用手指滑动时页面可切换的阈值，大于这个阈值可以滑动的下一页
                snapSpeed: 400,    //轮播图切换的动画时间
            })

            this.slider.on('scrollEnd',() => {
                let pageIndex = this.slider.getCurrentPage().pageX
                if(this.loop){
                    pageIndex -= 1
                }
                this.currentPageIndex = pageIndex

                if(this.autoPlay){
                    clearTimeout(this.timer)
                    this._play()
                }
            })
        },
        //初始化轮播图下的小点
        _initDots() {
            this.dots = new Array(this.children.length - 2)
        },
        //自动播放
        _play() {
            let pageIndex = this.currentPageIndex + 1
            if(this.loop){
                pageIndex += 1
            }
            this.timer = setTimeout(() => {
                this.slider.goToPage(pageIndex ,0 ,400)
            },this.interval)
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth()
            this._initSlider()
            this._initDots()
            if(this.autoPlay){
                this._play()
            }
        },20)

        window.addEventListener('resize', () => {
            //slider未初始化的时候不作操作
            if(!this.slider){
                return
            }
            this._setSliderWidth(true)
            this.slider.refresh()
        })
    },
    destroyed() {
        clearTimeout(this.timer)
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"

    .slider{
        min-height 1px;
        position relative
        .slider-group{
            overflow hidden
            white-space nowrap
        }
        .slider-item{
            float left
            box-sizing border-box
            overflow hidden
            text-align center
            a{
                display block
                width 100%
                overflow hidden
                text-decoration none
            }
            img{
                display block
                width 100%
            }
        }
        .dots{
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0
            .dot{
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active{
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
                }
            }
        }
    }
</style>