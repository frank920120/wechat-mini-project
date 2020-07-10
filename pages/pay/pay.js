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
});
