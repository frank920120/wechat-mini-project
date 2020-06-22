//Page Object
import { request } from "../../request/index";
Page({
  data: {
    swipeList: [],
    categories: [],
    floors: [],
  },
  //options(Object)
  onLoad(option) {
    //request swiper
    this.getSwiperList();
    // request category
    this.getCategories();
    // request floor
    this.getFloors();
  },
  getSwiperList() {
    request({
      url: "/home/swiperdata",
    }).then((res) => {
      this.setData({
        swipeList: res.data.message,
      });
    });
  },
  getCategories() {
    request({
      url: "/home/catitems",
    }).then((res) => {
      this.setData({
        categories: res.data.message,
      });
    });
  },
  getFloors() {
    request({
      url: "/home/floordata",
    }).then((res) => {
      this.setData({
        floors: res.data.message,
      });
    });
  },
});
