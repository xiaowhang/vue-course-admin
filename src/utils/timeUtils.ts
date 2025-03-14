import dayjs from 'dayjs'

export const formatDateTime = (row: any, column: any, value: string) => {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
}

export const formatDate = (row: any, column: any, value: string) => {
  return dayjs(value).format('YYYY-MM-DD')
}
