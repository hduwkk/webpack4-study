const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require('tapable')

class MyDaily {
  constructor() {
    this.syncInit()
  }
  syncInit () {
    const instance = this.syncInstance =  new SyncHook(['getUp'])
    instance.tap('putOnCloth', name => {
      console.log(`${name}_穿衣服`)
    })
    instance.tap('goout', name => {
      console.log(`${name}_出门`)
    })
  }
  syncWaterfallInit () {
    const instance = this.syncWaterInstance =  new SyncHook(['getUp'])
    instance.tap('makePPT', name => {
      console.log(`${name}_做PPT`)
      return `${name}做好了PPT,`
    })
    instance.tap('meeting', prev => {
      console.log(prev + '现在在开会中... ...')
    })
  }
  syncBailInit () {
    const instance = this.syncBailInstance =  new SyncHook(['getUp'])
    instance.tap('havaADate', name => {
      console.log(`${name}_在约会.`)
      return false
    })
    instance.tap('goHome', name => {
      console.log(`${name}_回家了.`)
    })
  }
  run(n) {
    const {syncInstance, syncWaterInstance, syncBailInstance} = this
    if (syncInstance) {
      console.log('syncInstance')
      syncInstance.call(n)
    }
    if (syncWaterInstance) {
      console.log('syncWaterInstance')
      syncWaterInstance.call(n)
    }
    if (syncBailInstance) {
      console.log('syncBailInstance')
      syncBailInstance.call(n)
    }
  }
}

let d = new MyDaily()
d.run('hduwkk')