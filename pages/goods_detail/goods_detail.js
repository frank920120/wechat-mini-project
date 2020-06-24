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
    let { goods_name, goods_price, goods_introduce, pics } = res.data.message;
    goods_introduce = goods_introduce.replace(/\.webp/g, ".jpg");
    this.setData({
      goodsDetail: {
        goods_name,
        goods_price,
        goods_introduce,
        pics,
      },
    });
  },
  handleCollect() {
    this.setData({
      isCollect: !this.data.isCollect,
    });
  },
});
