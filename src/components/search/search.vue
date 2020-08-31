<template>
    <div>
        <ul v-for="item in changeClass" :key="item.id">
            <li @click="clickIndex = item.id"
                :class="{active: item.id == clickIndex}">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            clickIndex: 1,
            changeClass:[
                {
                    name: '名字1',
                    id: '1'
                },
                {
                    name: '名字2',
                    id: '2'
                },
                {
                    name: '名字3',
                    id: '3'
                },
                {
                    name: '名字4',
                    id: '4'
                }
            ]
        }
    }
}
</script>

<style lang="stylus" scoped>
ul{
    margin-top 50px
    display inline
}
.active{
    color red
}
</style>