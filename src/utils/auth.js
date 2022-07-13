// 封装token

const token = 'tt-token'

export function setToken(val) {
    window.localStorage.setItem(token, JSON.stringify(val))
}

export function getToken() {
    return JSON.parse(window.localStorage.getItem(token))
}

export function delToken() {
    window.localStorage.removeItem(token)
}

// 封装操作频道的方法
// 统一定义key
const channelKey = 'tt-channel'

// 保存channel
export function setChannel(val) {
    window.localStorage.setItem(channelKey, JSON.stringify(val))
}

// 获取channel
export function getChannel() {
    return JSON.parse(window.localStorage.getItem(channelKey))
}

// 删除channel
export function delChannel() {
    window.localStorage.removeItem(channelKey)
}