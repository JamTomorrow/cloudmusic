<template>
  <!--<div class="header">
    <div class="header-left" @click.stop="back"></div>
    <p class="header-title">{{ title }}</p>
    <div class="header-right"></div>
  </div>-->
  <Header class="header">
    <div slot="left" class="header-left" @click.stop="back"></div>
    <p slot="center" class="header-title">{{ title }}</p>
    <div slot="right" class="header-right"></div>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'DetailHeader',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  components: {
    Header
  },
  methods: {
    back () {
      window.history.back()
    }
  }
}
</script>

<!--<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .header {
    width: 100%;
    height: 100px;
    /*background: #f00;*/
    @include bg_color();
    display: flex;
    justify-content: space-between;
    .header-left, .header-right {
      width: 84px;
      height: 84px;
      margin-top: 8px;
    }
    .header-left {
      @include bg_img('../../assets/images/back')
    }
    .header-right {
      @include bg_img('../../assets/images/more')
    }
    .header-title {
      text-align: center;
      line-height: 100px;
      color: #fff;
      font-weight: bold;
      @include font_size($font_medium)
    }
  }
</style>-->
<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .header{
    .header-left{
      @include bg_img('../../assets/images/back');
    }
    .header-right{
      @include bg_img('../../assets/images/more')
    }
    .header-title{
      width: 60%;
      text-align: center;
      line-height: 100px;
      color: #fff;
      font-weight: bold;
      @include font_size($font_medium);
      @include no-wrap();
    }
  }
</style>
