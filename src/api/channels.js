import request from "@/utils/request";


export function getAllChannels() {
    return request({
        url: `/v1_0/channels`,
    })
}

export function delChannels(target) {
    return request({
        url: `/v1_0/user/channels/${target}`,
        method: 'DELETE'
    })
}

export function addChannels(data) {
    return request({
        url: '/v1_0/user/channels',
        method: 'PATCH',
        data
    })
}
