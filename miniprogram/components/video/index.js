const app = getApp()
const Event = require('../../lib/event.js')

function getRandomColor() {
  const rgb = ["FF69B4 ", "FF1493 ", "C71585 ", "DA70D6 ", "D8BFD8 ", "DDA0DD ", "FF00FF ", "FFD700 ", "E6E6FA ", "FFFACD "]
  let colorIdx = Math.floor(Math.random() * 10)
  return '#' + rgb[colorIdx]
}

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal弹窗
    show: {
      type: Boolean,
      value: false
    },
    //控制底部是一个按钮还是两个按钮，默认两个
    single: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    isAudioPlay: false,
    danmuList: [],
  },

  attached: function () {
    console.log("attached");
    this.setData({
      show: false
    });
    this.videoContext = wx.createVideoContext('myVideo', this);
    this.audioCtx = wx.createAudioContext('myAudio', this);
  },

  ready: function () {
    console.log("ready");
    Event.on('danmuChange', data => {
      console.log("danmuChange");
      let newDanmuList = Object.assign([], data.danmuList);
      let dmList = [];
      for (let i = 0; i < newDanmuList.length; i++) {
        let danmuTime = Math.floor(Math.random() * 136); // 136：视频时长
        dmList.push({
          text: newDanmuList[i].comment,
          color: getRandomColor(),
          time: danmuTime
        });
      }
      this.setData({
        danmuList: dmList
      });
      // console.log(this.data.danmuList)
    })
  },

  methods: {
    /**
     * 显示弹窗
     */
    buttonTap: function () {
      Event.emit('stateChange', {
        isMusicPlay: false
      })

      this.setData({
        show: true
      })

      // this.videoContext.play()
    },

    /**
     * 关闭弹窗
     */
    clickMask() {
      this.setData({
        show: false
      })
      Event.emit('stateChange', {
        isMusicPlay: true
      })
      this.videoContext.pause()
      this.audioCtx.pause()
      this.audioCtx.seek(0)
    },

    /**
     * 播放音乐
     */
    clickAudio() {
      this.setData({
        isAudioPlay: !this.data.isAudioPlay
      })
      if (this.data.isAudioPlay) {
        this.audioCtx.play()
      } else {
        this.audioCtx.pause()
      }
    },

    // 点击取消按钮的回调函数
    emptyFunction() {},

    // 点击取消按钮的回调函数
    cancel() {
      this.setData({
        show: false
      })
      Event.emit('stateChange', {
        isMusicPlay: true
      })
      this.videoContext.pause()
    },

    // 点击确定按钮的回调函数
    confirm() {
      this.setData({
        show: false
      })
      Event.emit('stateChange', {
        isMusicPlay: true
      })
      this.videoContext.pause()
    },

    videoErrorCallback(e) {
      console.log('视频错误信息:')
      console.log(e.detail.errMsg)
    }
  }
})