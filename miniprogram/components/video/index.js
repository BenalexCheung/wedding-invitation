const app = getApp()
const Event = require('../../lib/event.js')

function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
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
    danmuList:
    [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    }, {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }],
  },

  attached: function () {
    this.setData({
      show: false
    })
    this.videoContext = wx.createVideoContext('myVideo',this)
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

      this.videoContext.play()
    },

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