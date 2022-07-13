import request from "@/utils/request";

export const getComments = (params) => {
    return request({
        url: '/v1_0/comments',
        params
    })
}

export const sendComments = (data) => {
    return request({
        url: '/v1_0/comments',
        method: 'POST',
        data
    })
}


