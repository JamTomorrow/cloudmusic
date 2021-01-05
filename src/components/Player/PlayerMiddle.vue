<template>
  <swiper :options="swiperOption" class="banner">
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="cdWrapper">
        <img :src="currentSong.picUrl + '?imageView=1&type=webp&thumbnail=369x0'" alt="">
      </div>
      <p>{{ nowLyric }}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="scrollView">
        <ul>
          <li v-for="(value, key) in currentLyric" :key="key" :class="{'active' : currentLineNum === key}">{{ value }}</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
import { mapGetters } from 'vuex'

export default {
  name: 'PlayerMiddle',
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      currentLineNum: '0',
      isScroll: null,
      timerId: null
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ]),
    nowLyric () {
      let res = ''
      for (const key in this.currentLyric) {
        if (key === this.currentLineNum) {
          res = this.currentLyric[key]
          break
        }
      }
      return res
    }
  },
  methods: {
    // 获取第一句歌词
    getFirstLyric () {
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      const result = this.currentLyric[lineNum + '']
      if (result === undefined || result === '') {
        lineNum--
        return this.getActiveLineNum(lineNum)
      } else {
        return lineNum + ''
      }
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add('active')
      } else {
        this.$refs.cdWrapper.classList.remove('active')
      }
    },
    currentTime (newValue, oldValue) {
      // console.log(newValue)
      // 高亮歌词同步
      // const lineNum = Math.floor(newValue) + ''
      // const result = this.currentLyric[lineNum]
      // 判断当前时间是否有歌词，没有则保持上句歌词高亮
      // if (result !== undefined && result !== '') {
      //   this.currentLineNum = lineNum
      // 歌词滚动同步
      // 获取高亮歌词距离顶部的距离
      // const currentLyricTop = document.querySelector('.lyric .active').offsetTop
      // console.log(currentLyricTop)
      // 获取整个歌词界面的高度
      // const lyricHeight = this.$refs.lyric.$el.offsetHeight
      // console.log(lyricHeight)
      // if (currentLyricTop > lyricHeight / 2) {
      // console.log('开始滚动')
      // this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
      // }
      // }
      // console.log(this.currentLineNum)

      // 高亮歌词同步
      const lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      // 判断是否有歌词
      if (Object.keys(this.currentLyric).length === 0) return
      if (!this.isScroll) {
        // 歌词滚动同步
        const currentLyricTop = document.querySelector('.lyric .active').offsetTop
        const lyricHeight = this.$refs.lyric.$el.offsetHeight
        if (currentLyricTop > lyricHeight / 2) {
          this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
        } else {
          this.$refs.scrollView.scrollTo(0, 0, 100)
        }
      }
    },
    currentLyric (newValue, oldValue) {
      for (const key in newValue) {
        this.currentLineNum = key
        return
      }
    },
    // 监听滚动的状态
    isScroll (newValue, oldValue) {
      this.isScroll = newValue
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  mounted () {
    // 开始滚动时触发
    this.$refs.scrollView.scrollStart(() => {
      clearTimeout(this.timerId)
      this.isScroll = true
      // console.log('scrollStart ==> ', this.isScroll)
    })
    // 内容滚动时触发
    this.$refs.scrollView.scrolling(offsetY => {
      // console.log(offsetY)
    })
    // 停止滚动时触发
    this.$refs.scrollView.scrollEnd(() => {
      // console.log('scrollEnd ==> ', this.isScroll)
      if (!this.isScroll) {
        return
      }
      this.timerId = setTimeout(() => {
        this.isScroll = false
      }, 1500)
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .banner{
    position: fixed;
    top: 150px;
    bottom: 250px;
    left: 0;
    right: 0;
    .cd{
      .cd-wrapper{
        display: block;
        margin: 0 auto;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 30px solid #fff;
        overflow: hidden;
        animation: sport 5s linear infinite;
        animation-play-state: paused;
        &.active {
          animation-play-state: running;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
      p{
        text-align: center;
        @include font_size($font_medium);
        @include font_color();
        margin-top: 50px;
        color: #fff;
      }
    }
    .lyric{
      li{
        text-align: center;
        @include font_size($font_medium);
        @include font_color();
        margin: 10px 0;
        &:last-of-type{
          padding-bottom: 50%;
        }
        &.active{
          color: #fff;
          //@include font_color();
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
<style lang="scss">
  @import "../../assets/css/mixin";
  .my-bullet{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background: #fff;
    margin: 0 20px;
  }
  .my-bullet-active{
    width: 60px;
    @include bg_color();
  }
</style>
