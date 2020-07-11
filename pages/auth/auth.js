import { request } from "../../request/index";
import { login } from "../../utils/asyncWx";
Page({
  data: {},

  async handleGetUserInfo(e) {
    try {
      const { encryptedData, rawData, signature, iv } = e.detail;
      const result = await login();
      const { code } = result;
      console.log(code);
      //需要企业appid
      // const { token } = await request({
      //   url: "/users/wxlogin",
      //   data: { encryptedData, rawData, iv, signature, code },
      //   header: { "content-type": "application/json" },
      //   method: "POST",
      // });
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"; //dummy token for testing
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1,
      });
    } catch (error) {
      console.log(error);
    }
  },
});
