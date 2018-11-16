import IMController from '../../controller/im.js';
import { connect } from '../../redux/index.js';
let app = getApp();
let store = app.store;
let backendAddr = 'http://127.0.0.1:3000/article/addArticle';
let pageConfig = {
  data: {
    array: ["Wearable Devices", "Dota 2", "AI"],
    index: 0,
    article_url: "",
    article_tags: ""
  },
  bindPickerChange: function(selection) {
    console.log(selection);
    this.setData({index: selection.detail.value});
  },
  onLoad: function() {},
  submitArticle: function() {
    if (this.data.article_url) {
      let articleInfo = {
        "group_id": this.data.index,
        "metadata": {
          "article_url": this.data.article_url,
          "article_tags": this.data.article_tags
        }
      }
      wx.request({
        url: backendAddr,
        header: {
          "Content-Type": "application/json"
        },
        method: "POST",
        data: articleInfo,
        complete: function (res) {
          if (res == null || res.data == null) {
            console.error('Error with backend server');
            return;
          }
        }
      })
    }
    else {
      alert('Article URL should not be empty');
    }
  },
  articleUrlInput: function (e) {
    this.setData({article_url: e.detail.value});
  },
  tagInput: function (e) {
    this.setData({ article_tags: e.detail.value });
  }
};

Page(pageConfig);
