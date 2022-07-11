import request from "@/utils/request";

export const getUserChannel = () => {
    return request({
        url: '/v1_0/user/channels'
    })
}

export const getArticle = (params) => {
    return request({
        url: '/v1_0/articles',
        params
    })
}

export const articleDetail = (article_id) => {
    return request({
        url: `/v1_0/articles/${article_id}`,
    })
}

export function followAuth(data) {
    return request({
        url: '/v1_0/user/followings',
        method: 'POST',
        data
    })
}

export function unfollowAuth(target) {
    return request({
        url: `/v1_0/user/followings/${target}`,
        method: 'DELETE',
    })
}