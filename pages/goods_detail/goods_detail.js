import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    isCollect: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(id) {
    const res = await request({ url: "/goods/detail", data: { goods_id: id } });

    this.setData({
      goodsDetail: res.data.message,
    });
  },
  handleCollect() {
    this.setData({
      isCollect: !this.data.isCollect,
    });
  },
});
