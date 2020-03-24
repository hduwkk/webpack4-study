import dateStr from './date'
import createLog from './log'

export const eat = function eas (n = '') { console.log(n + 'eat..') }

const log = createLog('util.js')
log(dateStr)

export default {
  say() {}
}
