<template>
  <div class="reply">
    <van-cell-group>
      <van-cell>
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
                <span class="time">{{ item.pubdate | formatTime }} </span>
              </div>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      全部回复
    </van-divider>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in replyList" :key="index">
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
                <span class="time"> {{ item.pubdate | formatTime }} </span>
              </div>
            </div>
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
        <van-button @click="sendReply" size="small" type="info"
          >发布</van-button
        >
      </template>
    </van-field>
  </div>
</template>

<script>
import { getCommentsAPI, sendCommentsAPI } from "@/api";
export default {
  props: ["item"],
  data() {
    return {
      loading: false,
      finished: false,
      content: "",
      offset: undefined,
      replyList: [],
      end_id: 0,
    };
  },

  methods: {
    async sendReply() {
      if (this.content === "") return;
      const res = await sendCommentsAPI({
        target: this.item.com_id,
        content: this.content,
        art_id: this.$route.query.id,
      });

      this.replyList.unshift(res.data.data.new_obj);
      this.$toast.success("评论回复成功");
      this.content = "";
      this.item.reply_count += 1;
    },

    async onLoad() {
      const res = await getCommentsAPI({
        type: "c",
        source: this.item.com_id,
        offset: this.offset,
        limit: 10,
      });
      this.replyList = [...this.replyList, ...res.data.data.results];
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
.reply {
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