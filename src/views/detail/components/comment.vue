<template>
  <div class="comment">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <template #title>
          <div class="item">
            <van-image
              width="40"
              height="40"
              :src="item.aut_photo"
              round
              fit="cover"
            />

            <div class="msg">
              <div class="name">{{ item.aut_name }}</div>
              <div class="content">{{ item.content }}</div>
              <div class="other">
                <span class="time">{{ item.pubdate | formatTime }}</span>
                <van-button @click="openReply(item)" size="mini"
                  >回复（{{ item.reply_count }}）</van-button
                >
              </div>
            </div>
            <van-icon name="like-o" />
          </div>
        </template>
      </van-cell>
    </van-list>

    <van-field
      class="myfield"
      v-model="content"
      clearable
      placeholder="请输入评论"
    >
      <template #button>
        <van-button @click="sendComment" size="small" type="info"
          >发布</van-button
        >
      </template>
    </van-field>
    <!-- 回复组件 -->
    <van-action-sheet v-model="replyShow" title="发表回复">
      <reply v-if="replyShow" :item="item" />
    </van-action-sheet>
  </div>
</template>

<script>
import { getCommentsAPI, sendCommentsAPI } from "@/api";
import reply from "./reply.vue";
export default {
  components: {
    reply,
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      content: "",
      art_id: this.$route.query.id,
      limit: 10,
      offset: undefined,
      end_id: 0,
      replyShow: false,
      item: {},
    };
  },

  methods: {
    openReply(item) {
      this.replyShow = true;
      this.item = item;
    },
    async sendComment() {
      if (this.content === "") return;
      const res = await sendCommentsAPI({
        target: this.art_id,
        content: this.content,
      });
      this.list.unshift(res.data.data.new_obj);
      this.$toast.success("发布评论成功");
      this.content = "";
    },
    async onLoad() {
      const res = await getCommentsAPI({
        type: "a",
        source: this.art_id,
        offset: this.offset,
        limit: this.limit,
      });
      this.list = [...this.list, ...res.data.data.results];
      this.offset = res.data.data.last_id;
      this.end_id = res.data.data.end_id;
      this.loading = false;
      if (this.offset === this.end_id) {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="less">
.comment {
  margin-bottom: 56px;
  .item {
    display: flex;
    .msg {
      flex: 1;
      margin-left: 20px;
      .name {
        color: #4a6c9d;
      }
      .other {
        display: flex;
        .time {
          margin-right: 5px;
        }
      }
    }
  }
  .myfield {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>