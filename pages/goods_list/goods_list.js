// pages/goods_list/goods_list.js
import { request } from "../../request/index";
Page({
  data: {
    tabs: [
      { id: 0, value: "综合", isActive: true },
      { id: 1, value: "销量", isActive: false },
      { id: 2, value: "价格", isActive: false },
    ],
    goodsList: [],
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodList();
  },
  async getGoodList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams,
    });
    this.setData({
      goodsList: res.data.message,
    });
    console.log(res);
  },
  handleTabsTap(e) {
    const id = e.detail;
    let newTabs = this.data.tabs.map((tab) => {
      if (tab.id === id) {
        return { ...tab, isActive: true };
      }
      return { ...tab, isActive: false };
    });
    this.setData({
      tabs: newTabs,
    });
  },
});
