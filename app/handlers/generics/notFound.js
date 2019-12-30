import { sendError } from '../../lib/utils'
import { t } from '../../lib/translations'

export default async (data, done) => {
  await sendError(400, t('error.not_found'), done)
}