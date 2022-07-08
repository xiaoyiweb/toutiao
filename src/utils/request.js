import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant';
import router from '@/router';
const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/'
})


const refRequest = axios.create({
    baseURL: 'http://toutiao.itheima.net/'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = store.state.token.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截
request.interceptors.response.use(response => {
    return response
}, async error => {
    // 判断错误的状态码是否是401
    // console.log(error.response)
    const status = error.response.status
    if (status === 401) {
        const refresh_token = store.state.token.refresh_token
        console.log(refresh_token)
        try {
            const res = await refRequest({
                url: '/v1_0/authorizations',
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${refresh_token}`
                }
            })
            store.commit('setToken', {
                token: res.data.data.token,
                refresh_token,
            })
            // console.log(error)
            return request(error.config)
        } catch {
            Toast.fail('登录已过期')
            router.push('/login')
            return Promise.reject(new Error('refresh_token 已过期'))
        }
    } else {
        return Promise.reject(error)
    }
})
export default request