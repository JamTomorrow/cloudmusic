<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="mini-player" v-show="this.isShowMiniPlayer">
      <div class="player-wrapper">
        <div class="player-left" @click="showNormalPlayer">
          <img :src="currentSong.picUrl" alt="" ref="cd">
          <div class="player-title">
            <h3>{{ currentSong.name }}</h3>
            <p>{{ currentSong.singer }}</p>
          </div>
        </div>
        <div class="player-right">
          <div class="play" @click="play" ref="play">
            <div class="canvas">
              <canvas ref="circle" width="84" height="84"></canvas>
            </div>
          </div>
          <div class="list" @click.stop="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name: 'MiniPlayer',
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',
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
      'setFullScreen',
      'setMiniPlayer',
      'setListPlayer',
      'setIsPlyayer'
    ]),
    showList () {
      this.setListPlayer(true)
    },
    showNormalPlayer () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.bounceDownOut', { duration: 500 }, function () {
        done()
      })
    },
    play () {
      this.setIsPlyayer(!this.isPlaying)
    },
    drawCircle (currentTime, totalTime) {
      // console.log(currentTime, totalTime)
      const canvas = this.$refs.circle
      const ctx = canvas.getContext('2d')
      ctx.lineWidth = 4

      ctx.clearRect(0, 0, 84, 84)
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.arc(
        41.5,
        42.5,
        40,
        Math.PI * -0.5,
        Math.PI * ((currentTime / totalTime) * 2 - 0.5),
        false
      ) // 绘制
      ctx.stroke()
      ctx.closePath()
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
        this.$refs.cd.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
        this.$refs.cd.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      this.drawCircle(newValue, this.totalTime)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 120px;
  .player-wrapper {
    width: 100%;
    height: 100%;
    @include bg_color();
    display: flex;
    align-items: center;
    justify-content: space-between;
    .player-left {
      display: flex;
      padding-left: 30px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
        animation: sport 5s linear infinite;
        animation-play-state: paused;
        &.active{
          animation-play-state: running;
        }
      }
      .player-title {
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
        justify-content: center;
        h3 {
          width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #fff;
          @include font_size($font_medium);
          //@include font_color();
        }
        p {
          color: #f0f0f0;
          @include font_size($font_medium_s);
          //@include font_color();
        }
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      .play{
        width: 84px;
        height: 84px;
        position: relative;
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
        .canvas {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 84px;
          height: 84px;
          margin: 0 auto;
        }
      }
      .list {
        width: 120px;
        height: 120px;
        @include bg_img('../../assets/images/list');
      }
    }
  }
}
  @keyframes sport {
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
</style>
