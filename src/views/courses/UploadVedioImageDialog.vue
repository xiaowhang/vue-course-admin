<template>
  <el-dialog v-model="dialogVisible" title="上传视频" width="40%">
    <el-upload
      action="#"
      accept="video/*"
      :show-file-list="false"
      :before-upload="handleBeforeVideoUpload"
    >
      <el-button type="primary" plain>选择视频</el-button>
      <template #tip>
        <div>{{ uploadVideoTip }}</div>
      </template>
    </el-upload>
    <el-upload
      action="#"
      accept="image/*"
      :http-request="handleUploadImage"
      :show-file-list="false"
    >
      <el-button type="primary" plain>选择图片</el-button>
      <template #tip>
        <div>{{ uploadImageTip }}</div>
      </template>
    </el-upload>

    <el-button type="primary" @click="handleUploadVideo">上传</el-button>
    <div>视频上传进度：{{ uploadPercent }} %</div>
    <div>视频转码进度：{{ transcodePercent }} %</div>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  aliyunTransCode,
  aliyunTransCodePercent,
  getImageUploadAuth,
  getVideoUploadAuth,
} from '@/api'
import type { UploadRequestOptions, UploadRequestHandler } from 'element-plus'

const dialogVisible = ref(false)

const lessonId = ref(0)

const handleShow = (node: any) => {
  dialogVisible.value = true
  lessonId.value = node.data.id
}

const uploadVideoTip = ref('只支持 mp4 格式')
const uploadImageTip = ref('只支持 jpg / png / gif 格式')

const uploadPercent = ref(0)
const transcodePercent = ref(0)

const initUploader = () => {
  //@ts-ignore
  return new AliyunUpload.Vod({
    // userID，用于标识上传者的身份，必填，有值即可，可以是阿里云账号ID或者您自定义的用户ID，您可以访问阿里云账号中心（https://account.console.aliyun.com/）查看账号ID
    userId: '122',
    // 上传到视频点播的地域，默认值为'cn-shanghai'，
    //eu-central-1，ap-southeast-1
    region: '',
    // 分片大小默认1 MB，不能小于100 KB（100*1024）
    partSize: 1048576,
    // 并行上传分片个数，默认5
    parallel: 5,
    // 网络原因失败时，重新上传次数，默认为3
    retryCount: 3,
    // 网络原因失败时，重新上传间隔时间，默认为2秒
    retryDuration: 2,
    // 开始上传
    onUploadstarted: function (uploadInfo: any) {},
    // 文件上传成功
    onUploadSucceed: function (uploadInfo: any) {},
    // 文件上传失败
    onUploadFailed: function (uploadInfo: any, code: any, message: any) {},
    // 文件上传进度，单位：字节
    onUploadProgress: function (uploadInfo: any, totalSize: any, loadedPercent: any) {},
    // 上传凭证或STS token超时
    onUploadTokenExpired: function (uploadInfo: any) {},
    // 全部文件上传结束
    onUploadEnd: function (uploadInfo: any) {},
  })
}

const imageUrl = ref('')

const handleUploadImage: UploadRequestHandler = (option: UploadRequestOptions): any => {
  uploadImageTip.value = option.file.name

  // 获取上传实例
  const uploader = initUploader()

  // 添加文件
  uploader.addFile(option.file)

  // 获取上传凭证
  uploader.options.onUploadstarted = async (uploadInfo: any) => {
    const { data } = await getImageUploadAuth()
    if (data.code === '000000') {
      const { uploadAuth, uploadAddress, imageId, imageURL } = data.data
      try {
        uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, imageId)
      } catch (e) {
        console.log('略过上传图片')
      }
      imageUrl.value = imageURL
    } else {
      ElMessage.error('获取图片上传凭证失败')
    }
  }

  // 开始上传
  uploader.startUpload()
}

const videoFile = ref()

const handleBeforeVideoUpload = (file: File) => {
  videoFile.value = file
  uploadVideoTip.value = file.name
  return false
}

const videoFileId = ref('')

const handleUploadVideo = () => {
  // 获取上传实例
  const uploader = initUploader()

  // 添加文件
  uploader.addFile(videoFile.value)

  // 获取上传凭证
  uploader.options.onUploadstarted = async (uploadInfo: any) => {
    const { data } = await getVideoUploadAuth(videoFile.value.name, imageUrl.value)
    if (data.code === '000000') {
      const { uploadAuth, uploadAddress, videoId } = data.data
      try {
        uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
      } catch (e) {
        console.log('略过上传视频')
      }

      // 模拟上传进度
      let n = 0
      const timer = setInterval(() => {
        uploadPercent.value = ++n
        if (n === 100) {
          clearInterval(timer)
          uploader.options.onUploadEnd()
        }
      }, 30)

      videoFileId.value = videoId
    } else {
      ElMessage.error('获取视频上传凭证失败')
    }
  }

  // 获取上传进度
  uploader.options.onUploadProgress = (uploadInfo: any, totalSize: any, loadedPercent: any) => {
    uploadPercent.value = Math.floor(loadedPercent * 100)
  }

  // 请求转码
  uploader.options.onUploadEnd = async (uploadInfo: any) => {
    const { data } = await aliyunTransCode({
      lessonId: lessonId.value,
      coverImageURL: imageUrl.value,
      fileId: videoFileId.value,
      fileName: videoFile.value.name,
    })
    if (data.code === '000000') {
      const hTime = setInterval(() => {
        aliyunTransCodePercent(lessonId.value).then((res) => {
          transcodePercent.value = res.data.data
          if (res.data.data === 100) {
            clearInterval(hTime)
            ElMessage.success('视频转码成功')
          }
        })
      }, 1000)
    }
  }

  // 开始上传
  uploader.startUpload()
}

defineExpose({ handleShow })
</script>

<style scoped lang="scss">
div {
  margin: 5px 0;
}
</style>
