<template>
  <div class="zhi">
    <van-nav-bar title="小易同学" left-arrow @click-left="$router.back()" />

    <!-- 内容区域 -->
    <div class="txt" ref="content">
      <div class="content" v-for="(item, index) in chatList" :key="index">
        <van-image
          class="img"
          width="40"
          height="40"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          round
          fit="cover"
          :class="{ right: item.isMy }"
        />
        <div class="chat" :class="{ right: item.isMy }">{{ item.t }}</div>
      </div>
    </div>

    <!-- 底部输入框 -->
    <van-search
      class="input"
      v-model="msg"
      show-action
      placeholder="说点什么呢"
      @search="onSearch"
      left-icon=""
      :clearable="false"
    >
      <template #action>
        <div @click="onSearch">发送</div>
      </template>
    </van-search>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      msg: "",
      socket: null,
      chatList: [
        {
          isMy: false,
          t: "您好呀",
        },
      ],
    };
  },
  methods: {
    onSearch() {
      if (this.msg) {
        this.socket.emit("message", {
          msg: this.msg,
          timestamp: Date.now(),
        });

        this.chatList.push({
          isMy: true,
          t: this.msg,
        });
        this.msg = "";
        this.$nextTick(() => {
          this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
        });
      }
    },
  },

  created() {
    this.socket = io("http://toutiao.itheima.net", {
      query: {
        token: this.$store.state.token.token,
      },
      transports: ["websocket"],
    });

    this.socket.on("message", (data) => {
      this.chatList.push({
        isMy: false,
        t: data.msg,
      });

      this.$nextTick(() => {
        this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
      });
    });
  },
};
</script>

<style lang="less">
.zhi {
  font-size: 16px;
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  .input {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .txt {
    background-color: #fafafa;
    position: fixed;
    left: 0;
    top: 46px;
    bottom: 53px;
    width: 100%;
    overflow: auto;
    .content {
      overflow: hidden;
      margin: 10px;
      .img {
        float: left;
        margin-right: 10px;
      }
      .chat {
        float: left;
        border: 1px solid #3196fa;
        max-width: 70%;
        padding: 10px;
        background-color: #e0effb;
      }
      .right {
        margin-right: 0px;
        margin-left: 10px;
        float: right;
        border: 1px solid #c5e2d4;
        background-color: #9eea6a;
      }
    }
  }
}
</style>