import { request } from "../../request/index";
import { login } from "../../utils/asyncWx";
Page({
  data: {},
  async handleGetUserInfo(e) {
    const { encryptedData, rawData, signature, iv } = e.detail;
    const result = await login();
    const { code } = result;
    console.log(code);
    const res = await request({
      url: "/users/wxlogin",
      data: { encryptedData, rawData, iv, signature, code },
      header: { "content-type": "application/json" },
      method: "POST",
    });
    console.log(res);
  },
});
