<template>
  <div class="edit">
    <van-nav-bar title="编辑资料" left-arrow @click-left="onClickLeft" />

    <div class="img">
      <van-image
        width="120"
        height="120"
        :src="userInfo.photo"
        fit="cover"
        round
      />
    </div>

    <div>
      <van-cell-group>
        <van-cell title="名称" is-link :value="userInfo.name" />
        <van-cell title="性别" is-link :value="userInfo.gender ? '女' : '男'" />
        <van-cell title="生日" is-link :value="userInfo.birthday" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo:function(){
        return this.$store.state.userInfo
    }
  },

  methods: {
    onClickLeft() {
      this.$router.push("/layout/my");
    },
  },

  created(){
    this.$store.dispatch('setUserInfo')
  }
};
</script>

<style lang="less">
.edit {
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  .img {
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>