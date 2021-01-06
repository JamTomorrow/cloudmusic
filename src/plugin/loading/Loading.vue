<template>
    <div class="container" v-show="isShow">
      <div class="icon">
        <span class="playing">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
      <p class="title">{{ title }}</p>
    </div>
</template>

<script>
export default {
  name: 'Loading',
  data: function () {
    return {
      title: 'Loading...',
      isShow: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .icon {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      .playing {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        i {
          width: 8px;
          height: 60px;
          @include bg_color();
          transform-origin: center bottom;
          animation: playing 0.6s linear -0.2s infinite alternate-reverse;

          &:nth-of-type(1) {
            animation-delay: 0s;
          }

          &:nth-of-type(2) {
            animation-delay: -0.2s;
          }

          &:nth-of-type(3) {
            animation-delay: -0.4s;
          }

          &:nth-of-type(4) {
            animation-delay: -0.6s;
          }
        }
      }
    }
    .title{
      @include font_size($font_medium_s);
      text-align: center;
      color: #666;
    }

    @keyframes playing {
      from {
        transform: scaleY(1);
      }

      to {
        transform: scaleY(0.2);
      }
    }
  }
</style>
