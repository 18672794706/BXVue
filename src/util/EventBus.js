import Vue from 'vue'
import { log } from '../util/log.js'
const eventBus = new Vue()
export function $publish(eventName, obj) {
    log.primary(`事件正在发布[${eventName}],事件参数:[${obj}]`)
    eventBus.$emit(eventName, obj)
    log.success(`事件正在发布[${eventName}],事件参数:[${obj}],发布成功`)
}
export function $subscribe(eventName, fun_callback) {
    log.primary(`事件正在订阅[${eventName}]`)
    eventBus.$on(eventName, fun_callback)
    log.success(`事件正在订阅[${eventName}],订阅成功`)
}
export function $destory(eventName, fun_callback) {
    log.warning(`事件正在注销[${eventName}]`)
    eventBus.$off(eventName, fun_callback)
    log.success(`事件正在注销[${eventName}],注销成功`)
}