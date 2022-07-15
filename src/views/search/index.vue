<template>
  <div class="search">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />

    <div class="ser">
      <van-icon class="myicon" name="search" />
      <input
        class="ipt"
        type="text"
        v-model="msg"
        placeholder="请输入搜索关键词"
        @input="search"
      />
      <van-icon
        class="cross"
        name="cross"
        v-show="msg !== ''"
        @click="msg = ''"
      />
      <button class="btn" @click="result">搜索</button>
    </div>

    <van-cell-group v-if="!msg">
      <van-cell class="mytitle" title="历史记录">
        <template #default>
          <van-icon @click="clear" name="cross" />
        </template>
      </van-cell>
      <van-cell
        v-for="(item, index) in historyList"
        :key="index"
        :title="item"
        @click="toResult(item)"
      />
    </van-cell-group>

    <van-cell-group v-else>
      <van-cell class="mytitle" title="联想区域" />
      <van-cell v-for="(item, index) in thinkList" :key="index" icon="search">
        <template #title>
          <span v-html="item" @click="toThinkResult(item)"></span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestAPI } from "@/api";
export default {
  data() {
    return {
      msg: "",
      thinkList: "",
      timer: null,
      historyList: JSON.parse(localStorage.getItem("history")) || [],
    };
  },

  methods: {
    toResult(item) {
      this.$router.push(`/search/result?key=${item}`);
    },

    saveToLocal(item) {
      this.historyList.unshift(item);
      this.historyList = [...new Set(this.historyList)];
      if (this.historyList.length > 5) {
        this.historyList.splice(5);
      }
      localStorage.setItem("history", JSON.stringify(this.historyList));
    },

    result() {
      if (this.msg) {
        this.saveToLocal(this.msg);
        this.$router.push(`/search/result?key=${this.msg}`);
      }
    },

    toThinkResult(item) {
      const reg = new RegExp(
        `<span style="color:red">${this.msg}</span>`,
        "ig"
      );
      item = item.replace(reg, this.msg);
      this.$router.push(`/search/result?key=${item}`);
      this.saveToLocal(item);
    },

    search() {
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        if (this.msg) {
          const res = await getSuggestAPI({
            q: this.msg,
          });

          // 定义正则表达式
          const reg = new RegExp(this.msg, "ig");
          this.thinkList = res.data.data.options.map((item) => {
            return item.replace(
              reg,
              `<span style="color:red">${this.msg}</span>`
            );
          });
        }
      }, 300);
    },

    clear() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "此操作将清除历史记录，是否继续？",
        })
        .then(() => {
          this.historyList = [];
          localStorage.removeItem("history");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less">
.search {
  font-size: 0.3733rem;
  .van-nav-bar__title.van-ellipsis {
    color: #fff;
  }
  i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
    color: #fff;
  }
  .ser {
    display: flex;
    margin: 0.2667rem;
    position: relative;
    .ipt {
      border: none;
      border-radius: 0.5333rem;
      background-color: #f7f8fa;
      height: 0.9333rem;
      line-height: 0.9333rem;
      padding: 0 0.8rem;
      flex: 1;
    }
    .myicon {
      position: absolute;
      top: 0.2667rem;
      left: 0.2667rem;
    }
    .btn {
      border: none;
      line-height: 0.9067rem;
      background: #fff;
    }
    .cross {
      position: absolute;
      top: 0.2667rem;
      right: 1.0667rem;
    }
  }
  .mytitle {
    font-weight: 700;
  }
}
</style>