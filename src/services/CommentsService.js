import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { sandboxApi } from './AxiosService'

class CommentsService {
  async getComments(id) {
    try {
      const res = await sandboxApi.get(`api/blogs/${id}/comments`)
      console.log(res.data)
      AppState.comments = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async createComment(rawComment) {
    try {
      const res = await sandboxApi.post('api/comments', rawComment)
      AppState.comments.push(res.data)
      return res.data._id
    } catch (error) {
      console.error(error)
    }
  }
}

export const commentsService = new CommentsService()
