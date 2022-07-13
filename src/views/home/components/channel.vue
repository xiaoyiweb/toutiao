<template>
  <div class="channel">
    <div class="mychannel">
      <div class="head">
        <span>我的频道</span>
        <van-button
          @click="showCross = !showCross"
          type="danger"
          plain
          size="mini"
        >
          {{ showCross ? "取消" : "编辑" }}
        </van-button>
      </div>

      <van-grid>
        <van-grid-item v-for="(item, index) in channelsList" :key="index">
          <template #text>
            <span @click="input(index)" :class="{ active: value === index }">{{
              item.name
            }}</span>
            <van-icon
              class="mycross"
              name="cross"
              v-show="showCross && index"
              @click.stop="delChannels(index, item.id)"
            />
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="mychannel">
      <div class="head">
        <span class="name">可选频道</span>
      </div>
    </div>

    <van-grid>
      <van-grid-item
        @click="addChannels(item)"
        :text="item.name"
        v-for="(item, index) in selectChannels"
        :key="index"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelsAPI, delChannelsAPI, addChannelsAPI } from "@/api";
import { setChannel } from "@/utils/auth";
export default {
  props: ["channelsList", "value"],
  data() {
    return {
      showCross: false,
      allChannelsList: [],
    };
  },

  methods: {
    input(index) {
      this.$emit("input", index);
    },

    delChannels(index, id) {
      this.channelsList.splice(index, 1);
      if (this.value > index) {
        this.$emit("input", this.value - 1);
      }

      const token = this.$store.state.token.token;
      if (token) {
        delChannelsAPI(id);
      } else {
        setChannel(this.channelsList);
      }
      this.$toast.success("删除频道成功");
    },

    addChannels(item) {
      this.channelsList.push(item);
      const token = this.$store.state.token.token;
      if (token) {
        addChannelsAPI({
          channels: [
            {
              id: item.id,
              seq: this.channelsList.length + 1,
            },
          ],
        });
      } else {
        setChannel(this.channelsList);
      }
      this.$toast.success("新增频道成功");
    },
  },

  computed: {
    selectChannels() {
      const chaneelsId = this.channelsList.map((item) => {
        return item.id;
      });

      return this.allChannelsList.filter((item) => {
        return !chaneelsId.includes(item.id);
      });
    },
  },

  async created() {
    const res = await getAllChannelsAPI();
    this.allChannelsList = res.data.data.channels;
    // console.log(res);
  },
};
</script>

<style lang="less">
.channel {
  font-size: 14px;
  .mychannel {
    .head {
      display: flex;
      justify-content: space-between;
      margin: 0 10px;
      align-items: center;
      margin-bottom: 10px;
    }
    .mycross {
      position: absolute;
      top: 0;
      right: 5px;
    }
  }
  .active {
    color: red;
  }
}
</style>