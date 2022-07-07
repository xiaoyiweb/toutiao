<template>
  <div>
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="rules.mobile"
      />
      <van-field
        v-model="code"
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        :rules="rules.code"
      />

      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :loading="isTrue"
          loading-text="登录中..."
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from "@/api";
export default {
  data() {
    return {
      mobile: "",
      code: "",
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "onBulr" },
          {
            pattern:
              /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            required: true,
            message: "请输入正确的手机号",
            trigger: "onBulr",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "onBulr" },
          {
            pattern: /^\d{6}$/,
            required: true,
            message: "请输入六位验证码",
            trigger: "onBulr",
          },
        ],
      },
      isTrue: false,
    };
  },

  methods: {
    async onSubmit(data) {
      this.isTrue = true;
      try {
        const res = await loginAPI(data);
        this.$store.commit("setToken", res.data.data);
        this.$toast.success("登录成功");
        this.$router.push("/layout/my");
      } catch {
        this.$toast.fail("登录失败");
      } finally {
        this.isTrue = false;
      }
    },
  },
};
</script>

<style>
</style>