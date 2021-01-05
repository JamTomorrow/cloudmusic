<template>
  <ul class="detail-bottom">
    <li class="bottom-top" @click="selectAllMusic">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li v-for="(value, index) in playlist" :key="value.id" class="item" @click="selectMusic(value.id)">
      <div class="item-left">{{ index + 1 }}</div>
      <div class="item-center">
        <h3>{{ value.name }}</h3>
        <p>{{ value.al.name }} - {{ value.ar[0].name }}</p>
      </div>
    </li>
    <h3 class="bottom-prompt" v-if="playlist.length === 0">暂无音源</h3>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail',
      'setCurrentIndex',
      'setIsPlyayer'
    ]),
    selectMusic (id) {
      // this.$store.dispatch('setFullScreen', true)
      this.setFullScreen(true)
      this.setSongDetail([id])
      this.setIsPlyayer(false)
    },
    selectAllMusic () {
      // 打开播放界面
      this.setFullScreen(true)
      const ids = this.playlist.map(item => {
        return item.id
      })
      // 获取歌单详情
      this.setSongDetail(ids)
      // 默认播放第一首
      this.setCurrentIndex(0)
      // 点击播放全部就开始播放歌曲
      this.setIsPlyayer(true)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .detail-bottom{
    width: 100%;
    li{
      width: 100%;
      height: 120px;
      padding: 20px;
      box-sizing: border-box;
      @include bg_sub_color();
      border-bottom: 1px solid #ccc;
    }
    .bottom-top{
      display: flex;
      align-items: center;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      .bottom-icon{
        width: 60px;
        height: 60px;
        @include bg_img('../../assets/images/small_play');
        margin-right: 20px;
      }
      .bottom-title{
        @include font_color();
        @include font_size($font_large);
      }
    }
    .item{
      display: flex;
      .item-left {
        @include font_color();
        @include font_size($font_medium);
        opacity: 0.8;
        margin-right: 20px;
        line-height: 80px;
      }
      .item-center {
        h3{
          @include font_color();
          @include font_size($font_medium);
          @include no-wrap();
        }
        p{
          @include font_color();
          @include font_size($font_samll);
          @include no-wrap();
          margin-top: 10px;
          opacity: 0.8;
        }
      }
    }
    .bottom-prompt{
      @include font_color();
      @include font_size($font_medium);
      text-align: center;
      padding-top: 20px;
    }
  }
</style>
