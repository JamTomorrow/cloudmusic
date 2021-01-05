<template>
  <div class="tabbar">
<!--    <router-link tag="div" class="item" to="/recommend">-->
<!--      <span>推荐</span>-->
<!--    </router-link>-->
<!--    <router-link tag="div" class="item" to="/singerr">-->
<!--      <span>歌手</span>-->
<!--    </router-link>-->
<!--    <router-link tag="div" class="item" to="/rank">-->
<!--      <span>排行</span>-->
<!--    </router-link>-->
<!--    <router-link tag="div" class="item" to="/search">-->
<!--      <span>搜索</span>-->
<!--    </router-link>-->
    <router-link v-for="item in type" :key="item.name" tag="div" class="item" :to="item.link">
      <span>{{item.name}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data () {
    return {
      type: [
        {
          name: '推荐',
          link: '/recommend'
        },
        {
          name: '歌手',
          link: '/singer'
        },
        {
          name: '排行',
          link: '/rank'
        },
        {
          name: '搜索',
          link: '/search'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/variable";
  @import "../assets/css/mixin";
.tabbar {
  width: 100%;
  height: 84px;
  @include bg_sub_color();
  display: flex;
  justify-content: space-around;
  .item {
    span {
      line-height: 84px;
      @include font_size($font_medium);
      @include font_color();
    }
    &.router-link-active {
      span {
        @include font_active_color();
      }
      border-bottom: 5px solid #000;
      @include border_color();
    }
  }
}
</style>
