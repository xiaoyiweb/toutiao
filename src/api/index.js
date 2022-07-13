import { login, getUserInfo, editInfo, editPhoto } from './login'
import { getUserChannel, getArticle, articleDetail, followAuth, unfollowAuth } from './home'
import { getComments, sendComments } from './comment'
import { getAllChannels, delChannels, addChannels } from './channels'

export const loginAPI = login
export const getUserInfoAPI = getUserInfo
export const editInfoApi = editInfo
export const editPhotoAPI = editPhoto
export const getUserChannelAPI = getUserChannel
export const getArticleAPI = getArticle
export const articleDetailAPI = articleDetail
export const followAuthAPI = followAuth
export const unfollowAuthAPI = unfollowAuth
export const getCommentsAPI = getComments
export const sendCommentsAPI = sendComments
export const getAllChannelsAPI = getAllChannels
export const delChannelsAPI = delChannels
export const addChannelsAPI = addChannels