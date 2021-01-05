<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{ title }}</h3>
    </div>
    <div class="personalized-list">
      <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
        <!--  <img :src="value.picUrl" alt=""> -->
        <img v-lazy="value.picUrl + '?imageView=1&type=webp&thumbnail=369x0'" alt="">
        <p>{{ value.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    selectItem (id) {
      // console.log(id)
      this.$emit('select', id, this.type)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.personalized {
  @include bg_sub_color();
  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    h3 {
      @include font_size($font-large);
      font-weight: bold;
      @include font_color();
    }
  }
  .personalized-list {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px 0;
    .item {
      width: 200px;
      padding-bottom: 20px;
      img {
        width: 200px;
        height: 200px;
        min-width: 200px;
        min-height: 200px;
        border-radius: 20px;
        box-shadow: 0 8px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
      }
      p {
        @include clamp(2);
        @include font_color();
        @include font_size($font_medium_s);
        text-align: center;
      }
    }
  }
}
</style>
