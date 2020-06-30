/* 
1 发送请求获取数据 
2 点击轮播图 预览大图
  1 给轮播图绑定点击事件
  2 调用小程序的api  previewImage 
3 点击 加入购物车
  1 先绑定点击事件
  2 获取缓存中的购物车数据 数组格式 
  3 先判断 当前的商品是否已经存在于 购物车
  4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
  5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回缓存中
  6 弹出提示
4 商品收藏
  1 页面onShow的时候  加载缓存中的商品收藏的数据
  2 判断当前商品是不是被收藏 
    1 是 改变页面的图标
    2 不是 。。
  3 点击商品收藏按钮 
    1 判断该商品是否存在于缓存数组中
    2 已经存在 把该商品删除
    3 没有存在 把商品添加到收藏数组中 存入到缓存中即可
 */

import { request } from "../../request/index";
Page({
  data: {
    goodsDetail: {},
    goodsDetailAll: {},
    isCollect: false,
  },
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
        goodsDetailAll: { ...this.data.goodsDetailAll, num: 1, checked: false },
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
