//Page Object
import { request } from "../../request/index";
Page({
  data: {
    swipeList: [],
  },
  //options(Object)
  onLoad(option) {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    }).then((res) => {
      this.setData({
        swipeList: res.data.message,
      });
    });
  },
});
