<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">My Music</h1>
    </div>
</template>

<script>
export default {
    name: ''
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .m-header{
        position relative;
        height 40px;
        text-align center;
        color $color-theme;
        font-size 0
        .icon{
            display inline-block;
            vertical-align top;
            margin-top 3px;
            width 30px;
            height 32px;
            margin-right 9px;
            bg-image('logo');
            background-size 30px 32px;
        }
        .text{
            display inline-block;
            vertical-align top;
            line-height 44px;
            font-size $font-size-large;
        }
        .mine{
            position absolute;
            top 0;
            right 0;
            .icon-mine{
                display block;
                padding 12px;
                font-size 20px;
                color $color-theme
            }
        }
    }
</style>