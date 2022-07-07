<template>
  <div>
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/ask" icon="chat-o"
        >问答</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/video" icon="video-o"
        >视频</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/my" icon="friends-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>