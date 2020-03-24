import util, {eat} from './util'
import dateStr from './date'
import {getRandom} from './b'
import createLog, {lineLog} from './log'
util.say();
eat()

const log = createLog('index.js')
log(dateStr);
lineLog(getRandom(), 'index.js')
