<template>
  <div class="detail">
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.push('/layout/home')"
    />
    <div class="content">
      <h2>{{ artObj.title }}</h2>

      <div class="author">
        <van-image
          width="50"
          height="50"
          :src="artObj.aut_photo"
          round
          fit="cover"
        />

        <div class="msg">
          <div class="name">{{ artObj.aut_name }}</div>
          <div class="time">{{ artObj.pubdate | formatTime }}</div>
        </div>
        <van-button @click="follow" v-if="!artObj.is_followed" type="info" round
          ><van-icon name="plus" />关注</van-button
        >
        <van-button @click="unfollow" v-else type="info" round
          ><van-icon name="success" />已关注</van-button
        >
      </div>

      <div class="article" v-html="artObj.content"></div>
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        end
      </van-divider>

      <div class="btn">
        <van-button
          v-if="artObj.attitude === 1"
          class="one"
          round
          plain
          type="primary"
        >
          <van-icon name="good-job-o" />点赞
        </van-button>
        <van-button v-else class="one" round plain>
          <van-icon name="good-job-o" />点赞
        </van-button>

        <van-button v-if="artObj.attitude === 0" round plain type="danger">
          <van-icon name="delete-o" />不喜欢
        </van-button>
        <van-button round plain v-else>
          <van-icon name="delete-o" />不喜欢
        </van-button>
      </div>
    </div>

    <comment />
  </div>
</template>

<script>
import comment from "./components/comment.vue";
import { articleDetailAPI, followAuthAPI, unfollowAuthAPI } from "@/api";
export default {
  components: {
    comment,
  },
  data() {
    return {
      artObj: {},
    };
  },
  methods: {
    async follow() {
      await followAuthAPI({
        target: this.artObj.aut_id,
      });
      // 提示成功
      this.$toast.success("收获迷弟一枚");
      // 手动将状态改为关注
      this.artObj.is_followed = true;
    },
    async unfollow() {
      await unfollowAuthAPI(this.artObj.aut_id);
      // 提示成功
      this.$toast.fail("失去迷弟一枚");
      // 手动将状态改为未关注
      this.artObj.is_followed = false;
    },
  },

  async created() {
    const res = await articleDetailAPI(this.$route.query.id);
    this.artObj = res.data.data;
  },
};
</script>

<style lang="less">
.detail {
  font-size: 16px;
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  .van-nav-bar .van-icon {
    color: #fff;
  }
  .content {
    margin: 10px;
    .author {
      display: flex;
      margin-top: 10px;
      align-items: center;
      .msg {
        flex: 1;
        margin-left: 10px;
        .time {
          color: #999;
          font-size: 14px;
        }
      }
    }
    .article {
      margin-top: 30px;
      white-space: pre-wrap;
      word-break: break-word;
      pre {
        // 将标识结构换行
        white-space: pre-wrap;
        // 让文本换行
        word-break: break-all;
      }
    }
    .btn {
      text-align: center;
      .one {
        margin-right: 30px;
      }
    }
  }
}
</style>