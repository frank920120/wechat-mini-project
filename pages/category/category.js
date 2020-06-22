// pages/category/category.js
import { request } from "../../request/index";
Page({
  data: {
    categories: [],
    leftMenuList: [],
    rightContent: [],
    currentindex: 0,
  },

  onLoad: function () {
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCate();
    } else {
      if (Date.now() - Cates.times > 1000 * 10) {
        this.getCate();
      } else {
        this.setData(
          {
            categories: Cates.data,
          },
          () => {
            let leftMenuList = this.data.categories.map((v) => v.cat_name);
            let rightContent = this.data.categories[0].children;
            this.setData({
              leftMenuList,
              rightContent,
            });
          }
        );
      }
    }
  },
  handleClick(data) {
    let { currentindex } = data.currentTarget.dataset;
    let rightContent = this.data.categories[currentindex].children;
    this.setData({
      currentindex,
      rightContent,
    });
  },
  getCate() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories",
    }).then((res) => {
      this.setData(
        {
          categories: res.data.message,
        },
        () => {
          wx.setStorageSync("cates", {
            time: Date.now(),
            data: this.data.categories,
          });
          let leftMenuList = this.data.categories.map((v) => v.cat_name);
          let rightContent = this.data.categories[0].children;
          this.setData({
            leftMenuList,
            rightContent,
          });
        }
      );
    });
  },
});
