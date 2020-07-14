import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
  },
  handleSearchInput(e) {
    const { value } = e.detail;
    if (!value.trim()) {
      return;
    }
    clearTimeout(this.timeID);
    this.timeID = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  async qsearch(query) {
    const res = await request({ url: "/goods/qsearch", data: { query } });
    console.log(res.data.message);
    this.setData({
      goods: res.data.message,
    });
  },
  handleCancel() {
    this.setData({ goods: [] });
  },
});
