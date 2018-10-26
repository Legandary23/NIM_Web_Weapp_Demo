import IMController from '../../controller/im.js';
import { connect } from '../../redux/index.js';
let app = getApp();
let store = app.store;
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
    
  },
  articleUrlInput: function (e) {
    this.setData({article_url: e.detail.value});
  },
  tagInput: function (e) {
    this.setData({ article_tags: e.detail.value });
  }
};

Page(pageConfig);
