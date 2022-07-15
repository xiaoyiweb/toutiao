<template>
  <div class="newsList" ref="newsList">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in newsList"
          :key="index"
          :title="item.title"
          @click="toDetail(item.art_id)"
        >
          <template #label>
            <van-grid
              v-if="item.cover.type !== 0"
              :border="false"
              :column-num="3"
            >
              <van-grid-item
                v-for="(subitem, subindex) in item.cover.images"
                :key="subindex"
              >
                <van-image :src="subitem" />
              </van-grid-item>
            </van-grid>

            <div class="detail">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}评论</span>
              <span>{{ item.pubdate | formatTime }}</span>
              <van-icon class="myicon" name="cross" />
            </div>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from "@/api";
export default {
  props: ["channel_id"],

  data() {
    return {
      timestamp: Date.now(),
      newsList: [],
      loading: false,
      finished: false,
      refreshing: false,
      scrollTop: "",
    };
  },

  mounted() {
    this.$refs.newsList.onscroll = () => {
      this.scrollTop = this.$refs.newsList.scrollTop;
    };
  },

  activated() {
    // 激活时再把之前的滚动条的高度赋值给滚动条，让它滚到对应的位置
    this.$refs.newsList.scrollTop = this.scrollTop;
  },

  methods: {
    async onLoad() {
      if (this.refreshing) {
        this.newsList = [];
        this.refreshing = false;
        this.timestamp = Date.now();
      }
      const res = await getArticleAPI({
        channel_id: this.channel_id,
        timestamp: this.timestamp,
      });

      this.newsList = [...this.newsList, ...res.data.data.results];
      this.timestamp = res.data.data.pre_timestamp;
      this.loading = false;
      if (!this.timestamp) {
        this.finished = true;
      }
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      setTimeout(() => {
        this.onLoad();
      }, 300);
    },

    toDetail(val) {
      this.$router.push(`/home/detail?id=${val}`);
    },
  },
};
</script>

<style lang="less">
.newsList {
  // background-color: pink;
  position: fixed;
  left: 0;
  top: 90px;
  bottom: 50px;
  overflow: auto;
  width: 100%;
  .detail {
    font-size: 12px;
    span {
      margin-right: 50px;
    }
    .myicon {
      float: right;
    }
  }
}
</style>