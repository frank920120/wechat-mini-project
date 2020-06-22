// pages/goods_list/goods_list.js
Page({
  data: {
    tabs: [
      { id: 0, value: "综合", isActive: true },
      { id: 1, value: "销量", isActive: false },
      { id: 2, value: "价格", isActive: false },
    ],
  },

  onLoad: function (options) {
    console.log(options);
  },
  handleTabsTap(e) {
    const id = e.detail;
    let newTabs = this.data.tabs.map((tab) => {
      if (tab.id === id) {
        return { ...tab, isActive: true };
      }
      return { ...tab, isActive: false };
    });
    this.setData({
      tabs: newTabs,
    });
  },
});
