import IMController from '../../controller/im.js';
import { connect } from '../../redux/index.js';
let app = getApp();
let store = app.store;
let pageConfig = {
  data: {
    array: ["Wearable Devices", "Dota 2", "AI"],
    index: 0
  },
  bindPickerChange: function(selection) {
    console.log(selection);
    this.setData({index: selection.detail.value});
  },
  onLoad: function() {}
};

Page(pageConfig);
