import dateStr from './date.js'
import createLog from './log'
import {eat} from './util.js'

eat('b.js______')

createLog('b.js')( dateStr)

export const getRandom = () => {
  return Math.floor(Math.random() * 10)
}
