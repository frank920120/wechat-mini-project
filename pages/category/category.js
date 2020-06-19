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
    this.getCate();
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
