// 封装token

const token = 'tt-token'

export function setToken(val){
    window.localStorage.setItem(token,JSON.stringify(val))
}

export function getToken(){
    return JSON.parse(window.localStorage.getItem(token))
}

export function delToken(){
    window.localStorage.removeItem(token)
}