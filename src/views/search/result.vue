<template>
  <div class="result">
    <van-nav-bar
      :title="key + '的搜索结果'"
      left-arrow
      @click-left="$router.back()"
    />

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        @click="toArt(item.art_id)"
      />
    </van-list>
  </div>
</template>

<script>
import { getResultAPI } from "@/api";
export default {
  data() {
    return {
      key: this.$route.query.key,
      page: 1,
      per_page: 2,
      loading: false,
      finished: false,
      list: [],
      total_count: 1,
    };
  },

  methods: {
    toArt(art_id) {
      this.$router.push(`/home/detail?id=${art_id}`);
    },

    async onLoad() {
      const res = await getResultAPI({
        page: this.page,
        per_page: this.per_page,
        q: this.key,
      });

      this.list = [...this.list, ...res.data.data.results];
      this.loading = false;
      this.finished = false;
      this.total_count = res.data.data.total_count;
      if (this.list.length >= this.total_count) {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less">
.result {
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
}
</style>