<template>
  <div class="song-list">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <SongListItem :songs="songs"></SongListItem>
    <!--  占位盒子，防止迷你播放器挡住最后一首歌  -->
    <div class="placeholder" v-show="isShowMiniPlayer"></div>
  </div>
</template>

<script>
import SongListItem from '../SongListItem'
import { mapGetters } from 'vuex'
export default {
  name: 'SongList',
  components: {
    SongListItem
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
  .song-list{
    width: 100%;
    @include bg_sub_color();
    .song-top{
      width: 100%;
      height: 84px;
      line-height: 84px;
      @include bg_sub_color();
      border-bottom: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      padding: 0 20px;
      h3{
        @include font_size($font_large);
        font-weight: bold;
        @include font_color();
      }
    }
    .placeholder {
      width: 100%;
      height: 120px;
    }
  }
</style>
