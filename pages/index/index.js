//Page Object
import { request } from "../../request/index";
Page({
  data: {
    swipeList: [],
    categories: [],
  },
  //options(Object)
  onLoad(option) {
    //request swiper
    this.getSwiperList();
    // request category
    this.getCategories();
  },
  getSwiperList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
    }).then((res) => {
      this.setData({
        swipeList: res.data.message,
      });
    });
  },
  getCategories() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems",
    }).then((res) => {
      this.setData({
        categories: res.data.message,
      });
    });
  },
});
