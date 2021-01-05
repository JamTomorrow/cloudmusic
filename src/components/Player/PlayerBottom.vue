<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">{{ currentTime | formartTime() }}</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot" ref="progressdot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">{{ totalTime | formartTime() }}</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite" @click="favorite" :class="{'active' : isFavorite(currentSong)}"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'

export default {
  name: 'PlayerBottom',
  data () {
    return {
      isTouchStart: null,
      startX: 0,
      moveX: 0,
      currentX: 0
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'currentSong',
      'favoriteList',
      'songs'
    ])
  },
  props: {
    totalTime: {
      type: Number,
      defalut: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setIsPlyayer',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime',
      'setFavoriteSong'
    ]),
    play () {
      this.setIsPlyayer(!this.isPlaying)
    },
    // 上一首
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    // 下一首
    next () {
      // this.setCurrentIndex(this.currentIndex + 1)
      if (this.modeType === modeType.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === modeType.one) {
        this.$refs.audio.play()
      } else if (this.modeType === modeType.random) {
        const index = this.getRandomIntInclusive(0, this.songs.length - 1)
        // console.log(index)
        this.setCurrentIndex(index)
      }
    },
    // 随机数
    getRandomIntInclusive (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
    },
    // 播放类型
    mode () {
      switch (this.modeType) {
        case modeType.loop:
          this.setModeType(modeType.one)
          break
        case modeType.one:
          this.setModeType(modeType.random)
          break
        case modeType.random:
          this.setModeType(modeType.loop)
          break
      }
    },
    // 收藏歌曲
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    isFavorite (song) {
      const result = this.favoriteList.find(currentValue => {
        return currentValue.id === song.id
      })
      return result !== undefined
    },
    // 进度条点击
    progressClick (e) {
      // 返回距离父级元素左边的距离
      const normalLeft = this.$refs.progressBar.offsetLeft
      // console.log(normalLeft)
      // 鼠标点击的横坐标
      const eventLeft = e.pageX
      // console.log(eventLeft)
      // 进度条的位置
      const clickLeft = eventLeft - normalLeft
      // 保存进度条的位置
      this.currentX = clickLeft
      // console.log(clickLeft)
      // 进度条总宽度
      const progressWidth = this.$refs.progressBar.offsetWidth
      // console.log(progressWidth)
      // 计算比例，设置当前进度条宽度
      const value = clickLeft / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'
      // 计算当前应该从什么位置开始播放
      const currentTime = this.totalTime * value
      // console.log(currentTime)
      this.setCurrentTime(currentTime)
    }
  },
  mounted () {
    this.$refs.progressdot.addEventListener('touchstart', e => {
      // console.log('touchstart ==> ', e)
      // 记录手指按下的横坐标
      this.startX = e.touches[0].pageX
      // console.log(this.startX)
      // 记录手指按下
      this.isTouchStart = true
      // 暂停音乐
      // this.setIsPlyayer(false)
    })
    this.$refs.progressdot.addEventListener('touchmove', e => {
      // console.log('touchmove ==> ', e)
      // 判断手指是否滑动
      if (this.isTouchStart) {
        // 进度条总宽度
        const progressWidth = this.$refs.progressBar.offsetWidth
        // 判断是否超过进度条总宽度
        this.moveX = e.touches[0].pageX - this.startX + this.currentX > progressWidth ? progressWidth : e.touches[0].pageX - this.startX + this.currentX
        // console.log(this.moveX)
        const value = this.moveX / progressWidth
        this.$refs.progressLine.style.width = value * 100 + '%'
      }
    })
    this.$refs.progressdot.addEventListener('touchend', e => {
      this.isTouchStart = false
      this.currentX = this.moveX
      // console.log('touchend ==> ', e)
      // 进度条总宽度
      const progressWidth = this.$refs.progressBar.offsetWidth
      const value = this.moveX / progressWidth
      // 计算当前应该从什么位置开始播放
      const currentTime = this.totalTime * value
      // console.log(currentTime)
      this.setCurrentTime(currentTime)
      // 开始音乐
      // this.setIsPlyayer(true)
    })
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    // 播放类型
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === modeType.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    // 当前播放时间
    currentTime (newValue, oldValue) {
      // 如果进度条滑块被按下，则不计算进度条的宽度
      if (!this.isTouchStart) {
        this.currentX = this.$refs.progressLine.offsetWidth
        // 根据当前播放的时间计算比例
        const value = newValue / this.totalTime * 100
        this.$refs.progressLine.style.width = value + '%'
        // console.log(this.$refs.progressLine.offsetWidth)
      }
    }
  },
  filters: {
    // 格式化时间
    formartTime (time) {
      const result = parseInt(time)
      const h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
      const m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
      const s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
      let res = ''
      if (h !== '00') res += `${h}:`
      res += `${m}:${s}`
      // console.log(res)
      return res
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .player-bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .bottom-progress{
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        @include font_size($font_samll);
        @include font_color();
      }
      .progress-bar{
        width: 100%;
        margin: 0 10px;
        height: 10px;
        background: #fff;
        .progress-line{
          width: 0%;
          height: 100%;
          @include bg_color();
          position: relative;
          .progress-dot{
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }
    .bottom-controll{
      width: 80%;
      margin: 0 auto;
      padding: 50px 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div{
        width: 84px;
        height: 84px;
      }
      .mode{
        &.loop{
          @include bg_img('../../assets/images/loop');
        }
        &.one{
          @include bg_img('../../assets/images/one');
        }
        &.random{
          @include bg_img('../../assets/images/shuffle');
        }
      }
      .prev{
        @include bg_img('../../assets/images/prev')
      }
      .play{
        @include bg_img('../../assets/images/play');
        &.active{
          @include bg_img('../../assets/images/pause');
        }
      }
      .next{
        @include bg_img('../../assets/images/next');
      }
      .favorite{
        @include bg_img('../../assets/images/un_favorite');
        &.active{
          @include bg_img('../../assets/images/favorite');
        }
      }
    }
  }
</style>
