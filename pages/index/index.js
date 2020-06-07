//Page Object
Page({
  data: {
    swipeList: [],
  },
  //options(Object)
  onLoad(option) {
    var reqTask = wx.request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
      success: (result) => {
        console.log(result);
        this.setData({
          swipeList: result.data.message,
        });
      },
    });
  },
});
