import type { UploadProps, UploadProgressEvent } from 'element-plus'
import type { ModelRef } from 'vue'

export const useImageUpload = (courseListImg: ModelRef<string>, courseImgUrl: ModelRef<string>) => {
  const imageUrl = ref('')

  const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)

    courseListImg.value = response.data.name
    courseImgUrl.value = imageUrl.value
  }

  const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
      ElMessage.error('picture format must be JPG or PNG!')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('picture size can not exceed 2MB!')
      return false
    }
    return true
  }

  const isShowProgress = ref(false)
  const percentage = ref(0)
  const handleProgress = (event: UploadProgressEvent) => {
    percentage.value = Math.floor(event.percent)
  }
  const handleChange = () => {
    isShowProgress.value = !isShowProgress.value
  }

  return {
    imageUrl,
    beforeUpload,
    courseListImg,
    courseImgUrl,
    isShowProgress,
    percentage,

    handleSuccess,
    handleProgress,
    handleChange,
  }
}
