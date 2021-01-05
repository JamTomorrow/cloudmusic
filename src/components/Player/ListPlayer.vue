<template>
  <div class="list">
    <transition
      :css="false"
      @enter="enter"
      @leave="leave">
      <div class="list-player" v-show="this.isShowListPlayer">
        <div class="player-wrapper">
          <div class="player-top">
            <div class="top-left">
              <div class="mode loop" @click="mode" ref="mode"></div>
              <p v-if="this.modeType === 0">顺序播放</p>
              <p v-else-if="this.modeType === 1">单曲循环</p>
              <p v-else>随机播放</p>
            </div>
            <div class="top-right">
              <div class="del" @click="delAll"></div>
            </div>
          </div>
          <div class="player-middle">
            <ScrollView>
              <ul ref="play">
                <li class="item" v-for="(value, index) in songs" :key="value.id" @click="selectMusic(index)">
                  <div class="item-left">
                    <div class="item-play" @click.stop="play" v-show="currentIndex === index"></div>
                    <p>{{ value.name }}</p>
                  </div>
                  <div class="item-right">
                    <div class="item-favorite" @click.stop="favorite(value)" :class="{'active' : isFavorite(value)}"></div>
                    <div class="item-del" @click.stop="del(index)"></div>
                  </div>
                </li>
              </ul>
            </ScrollView>
          </div>
        </div>
      </div>
    </transition>
    <!--  遮罩层  -->
    <div class="mask" v-show="this.isShowListPlayer" @click.stop="hidden"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ScrollView from '../ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import modeType from '../../store/modeType'

export default {
  name: 'ListPlayer',
  components: {
    ScrollView
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'isShowListPlayer',
      'songs',
      'currentIndex',
      'favoriteList'
    ])
  },
  methods: {
    ...mapActions([
      'setIsPlyayer',
      'setModeType',
      'setListPlayer',
      'setDelSong',
      'setCurrentIndex',
      'setFavoriteSong'
    ]),
    hidden () {
      this.setListPlayer(false)
    },
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    },
    play () {
      this.setIsPlyayer(!this.isPlaying)
    },
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
    del (index) {
      this.setDelSong(index)
    },
    delAll () {
      this.setDelSong()
      this.setIsPlyayer(false)
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
    },
    favorite (value) {
      this.setFavoriteSong(value)
    },
    isFavorite (song) {
      const result = this.favoriteList.find(currentValue => {
        return currentValue.id === song.id
      })
      return result !== undefined
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
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
    }
    // isShowListPlayer (newValue, oldValue) {
    //   if (newValue) {
    //     this.$refs.scrollView.refresh()
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .list {
    .list-player{
      position: fixed;
      left: 5%;
      bottom: 120px;
      width: 90%;
      z-index: 999;
      border-radius: 50px;
      @include bg_sub_color();
      .player-wrapper{
        .player-top{
          width: 100%;
          height: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .top-left{
            display: flex;
            align-items: center;
            padding-left: 20px;
            .mode{
              width: 56px;
              height: 56px;
              margin-right: 20px;
              &.loop{
                @include bg_img('../../assets/images/small_loop')
              }
              &.one{
                @include bg_img('../../assets/images/small_one')
              }
              &.random{
                @include bg_img('../../assets/images/small_shuffle')
              }
            }
            p{
              @include font_size($font_medium_s);
              @include font_color();
            }
          }
          .top-right{
            .del{
              width: 84px;
              height: 84px;
              @include bg_img('../../assets/images/small_del')
            }
          }
        }
        .player-middle{
          height: 700px;
          overflow: hidden;
          ul{
            &.active{
              .item{
                .item-play{
                  @include bg_img('../../assets/images/small_pause');
                }
              }
            }
          }
          .item{
            border-top: 1px solid #ccc;
            height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            box-sizing: border-box;
            .item-left{
              width: 70%;
              display: flex;
              align-items: center;
              .item-play{
                width: 56px;
                height: 56px;
                margin-right: 20px;
                @include bg_img('../../assets/images/small_play');
              }
              p{
                width: 80%;
                @include font_size($font_medium_s);
                @include font_color();
                @include no-wrap();
              }
            }
            .item-right{
              display: flex;
              align-items: center;
              .item-favorite{
                width: 56px;
                height: 56px;
                @include bg_img('../../assets/images/small_un_favorite');
                &.active{
                  @include bg_img('../../assets/images/small_favorite');
                }
              }
              .item-del{
                width: 52px;
                height: 52px;
                margin-left: 20px;
                @include bg_img('../../assets/images/small_close')
              }
            }
          }
        }
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0px;
      left: 0px;
      background: #000000;
      opacity: 0.6;
    }
  }
</style>
