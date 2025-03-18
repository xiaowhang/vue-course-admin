import request from '@/utils/request'

type ApiResponse<T> = {
  code: string
  data: T
  mesg: string
  time: string
}

export type VideoAuthType = {
  requestId: string
  videoId: string
  uploadAddress: string
  uploadAuth: string
}

export const getVideoUploadAuth = (fileName: string, imageUrl: string) => {
  return request<ApiResponse<VideoAuthType>>({
    method: 'GET',
    url: '/api/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params: {
      fileName,
      imageUrl,
    },
  })
}

export type ImageAuthType = {
  requestId: string
  imageId: string
  imageURL: string
  uploadAddress: string
  uploadAuth: string
  fileURL: string
}

export const getImageUploadAuth = () => {
  return request<ApiResponse<ImageAuthType>>({
    method: 'GET',
    url: '/api/boss/course/upload/aliyunImagUploadAddressAdnAuth.json',
  })
}

export const refreshVideoUploadAuth = (VideoId: string) => {
  return request<ApiResponse<VideoAuthType>>({
    method: 'GET',
    url: '/api/boss/course/upload/refreshAliyunVideoUploadAddressAdnAuth.json',
    params: {
      VideoId,
    },
  })
}

export type VideoOptType = {
  lessonId: number
  coverImageURL: string
  fileId: string
  fileName: string
}

export const aliyunTransCode = (data: VideoOptType) => {
  return request<ApiResponse<boolean>>({
    method: 'POST',
    url: '/api/boss/course/upload/aliyunTransCode.json',
    data,
  })
}

export const aliyunTransCodePercent = (lessonId: number) => {
  return request<ApiResponse<number>>({
    method: 'GET',
    url: '/api/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId,
    },
  })
}

export const getMediaByLessonId = (lessonId: number) => {
  return request<ApiResponse<string>>({
    method: 'GET',
    url: '/api/boss/course/upload/getMediaByLessonId.json',
    params: {
      lessonId,
    },
  })
}
