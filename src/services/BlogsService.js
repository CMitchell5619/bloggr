import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { sandboxApi } from './AxiosService'

class BlogsService {
  async getBlogs() {
    try {
      const res = await sandboxApi.get('api/blogs')
      console.log(res.data)
      AppState.blogs = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getBlog(id) {
    try {
      const res = await sandboxApi.get('api/blogs/' + id)
      AppState.activeBlog = res.data
    } catch (error) {
      console.error(error)
    }
  }

  async createBlog(rawBlog) {
    try {
      const res = await sandboxApi.post('api/blogs', rawBlog)
      AppState.blogs.push(res.data)
      return res.data._id
    } catch (error) {
      console.error(error)
    }
  }
}

export const blogsService = new BlogsService()
