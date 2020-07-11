import { request } from "../../request/index";
Page({
  data: {
    isAddress: false,
    addressDetail: null,
    carts: [],
    totalPrice: 0,
    totalNum: 0,
  },
  onShow() {
    const addressDetail = wx.getStorageSync("address");
    const carts = wx.getStorageSync("cart") || [];
    let checkedCarts = carts.filter((cart) => cart.checked);
    if (addressDetail) {
      this.setData({
        isAddress: true,
        addressDetail: addressDetail,
      });
    } else {
      this.setData({
        isAddress: false,
      });
    }
    this.updateCart(checkedCarts);
  },
  getTotalNum() {
    const totalNum = this.data.carts
      .filter((cart) => cart.checked)
      .reduce((prev, next) => prev + next.num, 0);
    this.setData({
      totalNum,
    });
  },
  getTotalPrice() {
    const totalPrice = this.data.carts
      .filter((cart) => cart.checked)
      .reduce((prev, next) => prev + next.goods_price * next.num, 0);
    this.setData({
      totalPrice,
    });
  },
  updateCart(cart) {
    this.setData(
      {
        carts: cart,
      },
      () => {
        wx.setStorageSync("cart", this.data.carts);
        this.getTotalPrice();
        this.getTotalNum();
      }
    );
  },
  async handleOrderPay() {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: "/pages/auth/auth",
      });
      return;
    }
    const header = { Authorization: token };
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.addressDetail;
    const goods = this.data.carts.map((cart) => {
      return {
        goods_id: cart.goods_id,
        goods_number: cart.goods_number,
        goods_price: cart.goods_price,
      };
    });
    const res = await request({
      url: "/my/orders/create",
      method: "post",
      data: { order_price, consignee_addr, goods },
      header,
    });
    console.log(res);
  },
});
