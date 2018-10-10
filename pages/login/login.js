import IMController from '../../controller/im.js'
import { connect } from '../../redux/index.js'
let app = getApp()
let store = app.store
let pageConfig = {
  data: {
    account: '',// 用户输入账号
    password: '',//用户输入密码
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 测试使用
  onLoad: function() {
    //this.resetStore()
    console.log(app.globalData)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow() {
    this.resetStore()
  },
  /**
   * 重置store数据
   */
  resetStore: function () {
    store.dispatch({
      type: 'Reset_All_State'
    })
  },
  /**
   * 用户输入事件：dataset区分输入框类别
   */
  inputHandler: function (e) {
    let temp = {}
    temp[e.currentTarget.dataset.type] = e.detail.value
    this.setData(temp)
  },
  /**
   * 单击注册:跳转注册页
   */
  registerTap: function () {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  /**
   * 执行登录逻辑
   */
  doLogin: function () {
    new IMController({
      token: this.data.password,
      account: this.data.account
    })
  }
}
let mapStateToData = (state) => {
  return {
    isLogin: state.isLogin || store.getState().isLogin
  }
}
const mapDispatchToPage = (dispatch) => ({
  loginClick: function() {
    this.doLogin()
    return
  }
})

let connectedPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)

Page(connectedPageConfig)
