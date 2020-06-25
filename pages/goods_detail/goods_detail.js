import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    goodsDetailAll: {},
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
      goodsDetailAll: res.data.message,
    });
  },
  handleCollect() {
    this.setData({
      isCollect: !this.data.isCollect,
    });
  },
  handlePreview(e) {
    const urls = this.data.goodsDetail.pics.map((pic) => pic.pics_mid);
    wx.previewImage({
      current: urls[e.currentTarget.dataset.index],
      urls,
    });
  },
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(
      (v) => v.goods_id === this.data.goodsDetailAll.goods_id
    );
    if (index == -1) {
      this.setData({
        goodsDetailAll: { ...this.data.goodsDetailAll, num: 1 },
      });
      cart.push(this.data.goodsDetailAll);
    } else {
      cart[index].num++;
    }

    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: "加入成功",
      icon: "success",
      duration: 1500,
      mask: true,
    });
  },
});
