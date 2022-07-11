<template>
  <div>
    <van-nav-bar class="home">
      <template #left>
        <van-image
          width="100"
          :src="require('../../assets/logo.png')"
          fit="contain"
        />
      </template>
      <template #right>
        <van-button>
          <van-icon class="myicon" name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>

    <van-tabs>
      <van-tab
        v-for="(item, index) in UserChannelList"
        :key="index"
        :title="item.name"
      >
        <news-list :channel_id="item.id" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannelAPI } from "@/api";
import NewsList from "./components/NewsList";
export default {
  /*  */
  components: {
    NewsList,
  },

  data() {
    return {
      UserChannelList: "",
    };
  },

  methods: {
    async getUserChannel() {
      const res = await getUserChannelAPI();
      this.UserChannelList = res.data.data.channels;
      // console.log(res);
    },
  },

  created() {
    this.getUserChannel();
  },
};
</script>

<style lang="less">
.home {
  button.van-button.van-button--default.van-button--normal {
    width: 100px;
    height: 32px;
    background-color: hsla(0, 0%, 100%, 0.2);
    color: #fff;
    border: none;
    border-radius: 20px;
  }
  .myicon {
    color: #fff !important;
    margin-right: 4px !important;
  }
}
</style>