import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api'
import { useAuthStore } from '@/stores'
import type { LoginInfoType } from '@/api'

export const useLogin = () => {
  const formRef = ref<FormInstance>()
  const form = reactive({
    phone: '18201288771',
    password: '111111',
  })

  // 表单验证规则
  const rules = reactive<FormRules>({
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'change' },
    ],
  })

  const isLoading = ref(false)
  const authStore = useAuthStore()
  const router = useRouter()
  const route = useRoute()

  const onSubmit = async (fromEl: FormInstance | undefined) => {
    if (!fromEl) return
    isLoading.value = true

    try {
      const valid = await fromEl.validate()
      if (!valid) return

      const { data } = await login(form)

      if (!data.success) {
        ElMessage.error('账号或密码错误')
        return
      }
      ElMessage.success('登录成功')
      authStore.setToken(data.content)
      router.push((route.query.redirect as string) || '/')
    } catch (error) {
      ElMessage.error('登录失败，请重试' + error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    formRef,
    form,
    rules,
    isLoading,
    onSubmit,
  }
}
