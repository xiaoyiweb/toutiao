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

export const editInfo = (data) => {
    return request({
        url: '/v1_0/user/profile',
        method: 'PATCH',
        data
    })
}

export const editPhoto = (data) => {
    return request({
        url: '/v1_0/user/photo',
        method: 'PATCH',
        data
    })
}

