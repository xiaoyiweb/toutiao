<template>
  <div class="home">
    <van-nav-bar>
      <template #left>
        <van-image
          width="100"
          :src="require('../../assets/logo.png')"
          fit="contain"
        />
      </template>
      <template #right>
        <van-button @click="$router.push('/home/search')">
          <van-icon class="myicon" name="search" />
          搜索
        </van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active">
      <van-tab
        v-for="(item, index) in UserChannelList"
        :key="index"
        :title="item.name"
      >
        <news-list :channel_id="item.id" />
      </van-tab>
      <van-icon
        @click="channelShow = true"
        class="channelIcon"
        name="wap-nav"
      />
    </van-tabs>

    <van-action-sheet v-model="channelShow" title="频道管理">
      <channel :channelsList="UserChannelList" v-model="active" />
    </van-action-sheet>
  </div>
</template>

<script>
import { getUserChannelAPI } from "@/api";
import NewsList from "./components/NewsList";
import channel from "./components/channel.vue";
import { getChannel } from "@/utils/auth";
export default {
  /*  */
  components: {
    NewsList,
    channel,
  },

  data() {
    return {
      UserChannelList: "",
      channelShow: false,
      active: "",
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
    const token = this.$store.state.token.token;
    const local = getChannel();
    if (token || !local) {
      this.getUserChannel();
    } else {
      this.UserChannelList = local;
    }
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
  .channelIcon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    width: 10%;
    text-align: center;
    background-color: #fff;
  }
  .van-tabs__wrap.van-tabs__wrap--scrollable {
    width: 90%;
  }
}
</style>