<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <!--  <div class="normal-player" v-show="this.$store.getters.isFullScreen">-->
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl + '?imageView=1&type=webp&thumbnail=369x0'" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'NormalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    // 当前播放时间
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'getSongLyric'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    }
  },
  watch: {
    currentSong (newValue, oldValue) {
      if (newValue.id === undefined) {
        return
      }
      this.getSongLyric(newValue.id)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .normal-player{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    @include bg_sub_color();
    .player-wrapper{
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 999;
    }
    .player-bg{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      img{
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        filter: blur(20px);
      }
    }
  }
</style>
