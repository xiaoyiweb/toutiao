import request from "@/utils/request";

export const getSuggest = (params) => {
    return request({
        url: '/v1_0/suggestion',
        params
    })
}

export const getResult = (params) => {
    return request({
        url: '/v1_0/search',
        params
    })
}

