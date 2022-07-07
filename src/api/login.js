import request from "@/utils/request";

export const login = (data) => {
    return request({
        url: '/v1_0/authorizations',
        method: 'POST',
        data
    })
}

export const getUserInfo = () => {
    return request({
        url: '/v1_0/user/profile',
    })
}