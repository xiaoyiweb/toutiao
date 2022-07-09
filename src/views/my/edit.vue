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
      <van-uploader class="myuploader" :after-read="afterRead" />
    </div>

    <div>
      <van-cell-group>
        <van-cell
          @click="editName(userInfo.name)"
          title="名称"
          is-link
          :value="userInfo.name"
        />
        <van-cell
          @click="editGender"
          title="性别"
          is-link
          :value="userInfo.gender ? '女' : '男'"
        />
        <van-cell
          @click="openBirth(userInfo.birthday)"
          title="生日"
          is-link
          :value="userInfo.birthday"
        />
      </van-cell-group>
    </div>

    <van-dialog
      @confirm="changeName"
      v-model="nameShow"
      title="修改名称"
      show-cancel-button
    >
      <van-cell-group>
        <van-field v-model="myname" ref="myfield" />
      </van-cell-group>
    </van-dialog>

    <van-popup
      v-model="genderShow"
      position="bottom"
      :style="{ height: '18%' }"
    >
      <van-nav-bar
        @click-left="genderShow = false"
        title="修改性别"
        left-text="取消"
      />
      <van-cell-group>
        <van-cell is-link title="男" @click="changeGender(0)" />
        <van-cell is-link title="女" @click="changeGender(1)" />
      </van-cell-group>
    </van-popup>

    <van-popup
      v-model="birthdayShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-datetime-picker
        v-model="birthday"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="birthdayShow = false"
        @confirm="changeBirthday(birthday)"
      />
    </van-popup>

    <!-- 面板4：裁剪面板 -->
    <div v-if="mypanelShow" class="mypanel">
      <vue-cropper
        ref="cropper"
        :img="cropimg"
        autoCrop
        autoCropWidth="150"
        autoCropHeight="150"
      />
      <van-button @click="cutImg" class="btnOne" type="primary"
        >裁剪</van-button
      >
      <van-button @click="mypanelShow = false" class="btnTwo" type="primary"
        >取消</van-button
      >
    </div>
  </div>
</template>

<script>
import { editInfoApi, editPhotoAPI } from "@/api";
import moment from "moment";
import { VueCropper } from "vue-cropper";
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      nameShow: false,
      myname: "",
      genderShow: false,
      birthdayShow: false,
      birthday: new Date(),
      minDate: new Date("1990-1-1"),
      maxDate: new Date(),
      mypanelShow: false,
      cropimg: "",
    };
  },

  computed: {
    userInfo: function () {
      return this.$store.state.userInfo;
    },
  },

  methods: {
    onClickLeft() {
      this.$router.push("/layout/my");
    },

    editName(val) {
      this.nameShow = true;
      this.$nextTick(() => {
        this.$refs.myfield.focus();
      });
      this.myname = val;
    },

    async changeName() {
      await editInfoApi({
        name: this.myname,
      });
      this.$toast.success("修改用户姓名成功");
      this.$store.commit("setUserInfo", {
        ...this.userInfo,
        name: this.myname,
      });
    },

    editGender() {
      this.genderShow = true;
    } /*  */,

    changeGender(val) {
      editInfoApi({
        gender: val,
      });
      this.$toast.success("修改用户性别成功");
      this.$store.commit("setUserInfo", {
        ...this.userInfo,
        gender: val,
      });
      this.genderShow = false;
    },

    openBirth(val) {
      this.birthdayShow = true;
      this.birthday = new Date(val);
    },

    changeBirthday(val) {
      const mybirth = moment(val).format("YYYY-MM-DD");
      editInfoApi({
        birthday: mybirth,
      });
      this.$toast.success("修改用户生日成功");
      this.$store.commit("setUserInfo", {
        ...this.userInfo,
        birthday: mybirth,
      });
      this.birthdayShow = false;
    },

    afterRead(file) {
      this.mypanelShow = true;
      this.cropimg = file.content;
    },

    cutImg() {
      this.$refs.cropper.getCropBlob(async (data) => {
        const fd = new FormData();
        fd.append("photo", data);
        const res = await editPhotoAPI(fd);
        const imgPath = res.data.data.photo;
        this.mypanelShow = false;
        this.$toast.success("修改用户头像成功");
        // 更新 vuex 中的数据
        this.$store.commit("setUserInfo", {
          ...this.userInfo, // 存之前所有的数据
          photo: imgPath,
        });
      });
    },
  },

  created() {
    this.$store.dispatch("setUserInfo");
  },
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
    position: relative;
    .myuploader {
      opacity: 0;
      position: absolute;
      .van-uploader__upload {
        width: 130px;
        height: 130px;
      }
    }
  }
  .van-cell__value.van-cell__value--alone.van-field__value {
    border: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
  }
  .van-nav-bar__text {
    color: #fff;
  }
  .mypanel {
    width: 100vw;
    height: 100vh;
    // background-color: pink;
    position: fixed;
    top: 0;
    left: 0;
    .btnOne {
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .btnTwo {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>