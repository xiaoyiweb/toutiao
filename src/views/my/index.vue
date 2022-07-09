<template>
  <div class="my">
    <div class="userInfo">
      <van-image
        width="90"
        height="90"
        :src="userInfo.photo"
        round
        fit="cover"
      />

      <div class="text">
        <div class="name">{{ userInfo.name }}</div>
        <span class="birth">{{ userInfo.birthday }}</span>
      </div>
    </div>

    <van-grid
      class="mygrid"
      :column-num="3"
      icon-size="25px"
      :border="false"
      center
    >
      <van-grid-item icon="newspaper-o" text="我的作品" />
      <van-grid-item icon="star-o" text="我的收藏" />
      <van-grid-item icon="tosend" text="阅读历史" />
    </van-grid>

    <van-cell-group>
      <van-cell is-link title="编辑资料" icon="edit" to="/my/edit" />
      <van-cell is-link title="小智同学" icon="chat-o" />
      <van-cell is-link title="系统设置" icon="setting-o" />
      <van-cell @click="logout" is-link title="退出登录" icon="warning-o" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // userInfo: {},
    };
  },

  computed: {
    userInfo: function () {
      return this.$store.state.userInfo;
    },
  },

  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
      this.$toast.success("退出登录成功");
    },
  },

  async created() {
    // const res = await getUserInfoAPI();
    // this.userInfo = res.data.data;
    // this.$store.commit('setUserInfo',res.data.data)
    this.$store.dispatch("setUserInfo");
  },
};
</script>

<style lang="less">
.my {
  .userInfo {
    height: 120px;
    background-color: #3296fa;
    display: flex;
    font-size: 16px;
    align-items: center;
    padding: 0 20px;
    .text {
      margin-left: 15px;
      .name {
        font-weight: 800;
        color: #fff;
        margin-bottom: 8px;
      }
      .birth {
        color: #3296fa;
        background-color: #fff;
        font-size: 14px;
      }
    }
  }
  .mygrid {
    .van-icon-newspaper-o {
      color: #3296fa;
    }
    .van-icon-star-o {
      color: red;
    }
    .van-icon-tosend {
      color: orange;
    }
  }
}
</style>