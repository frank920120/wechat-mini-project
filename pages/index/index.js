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
  async getSwiperList() {
    const res = await request({ url: "/home/swiperdata" });
    this.setData({
      swipeList: res.data.message,
    });
  },
  async getCategories() {
    const res = await request({
      url: "/home/catitems",
    });
    this.setData({
      categories: res.data.message,
    });
  },
  async getFloors() {
    const res = await request({
      url: "/home/floordata",
    });
    this.setData({
      floors: res.data.message,
    });
  },
});
