import { createArticle, editorArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(i18n.global.t('msg.article.createSuccess'))
  return res
}

export const editArticle = async (data) => {
  const res = await editorArticle(data)
  ElMessage.success(i18n.global.t('msg.article.editorSuccess'))
  return res
}
