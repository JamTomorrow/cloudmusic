<template>
    <div class="player">
      <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
      <MiniPlayer :totalTime="totalTime" :currentTime="currentTime"></MiniPlayer>
      <ListPlayer ref="listPlayer"></ListPlayer>
      <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="ended"></audio>
    </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import mode from '../store/modeType'

export default {
  name: 'Player',
  data () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  components: {
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    // 更新时间
    timeupdate (e) {
      // console.log(e.target.currentTime)
      this.currentTime = e.target.currentTime
    },
    // 下一首的播放模式
    ended () {
      // // 顺序播放
      // if (this.modeType === mode.loop) {
      //   // 判断是否是最后一首歌曲
      //   if (this.currentIndex === this.songs.length - 1) {
      //     // 如果是则歌曲播放结束后跳回第一首开始播放
      //     this.setCurrentIndex(0)
      //     this.$refs.audio.play()
      //   } else {
      //     this.setCurrentIndex(this.currentIndex + 1)
      //   }
      // // 单曲循环
      // } else if (this.modeType === mode.one) {
      //   this.$refs.audio.play()
      // // 随机播放
      // } else if (this.modeType === mode.random) {
      //   const index = this.getRandomIntInclusive(0, this.songs.length - 1)
      //   this.setCurrentIndex(index)
      // }
      if (this.modeType === mode.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === mode.one) {
        this.$refs.audio.play()
      } else if (this.modeType === mode.random) {
        const index = this.getRandomIntInclusive(0, this.songs.length - 1)
        // console.log(index)
        this.setCurrentIndex(index)
      }
    },
    // 随机数
    getRandomIntInclusive (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      const newIndex = Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
      if (newIndex === this.currentIndex) {
        return this.getRandomIntInclusive(min, max)
      }
      return newIndex
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex () {
      this.$refs.audio.ondurationchange = () => {
        // 切换歌曲重新获取歌曲时长
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldVaule) {
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, oldValue) {
      window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
    },
    historyList (newValue, oldValue) {
      window.localStorage.setItem('historyList', JSON.stringify(newValue))
    }
  },
  created () {
    // 收藏歌曲
    const favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    if (favoriteList === null) return
    this.setFavoriteList(favoriteList)
    // 播放历史
    const historyList = JSON.parse(window.localStorage.getItem('historyList'))
    if (historyList === null) return
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      // console.log('执行了1')
      this.totalTime = this.$refs.audio.duration
    }
  }
}
</script>

<style scoped lang="scss">
</style>
