<template>
  <div class="active-blog-page container">
    <div class="row">
      <div class="col-12">
        <h3 class="text-center">
          {{ state.blog.title }}
        </h3>
        <button type="button" class="btn btn-danger" @click="deleteBlog">
          Delete Blog
        </button>
        <!-- <span v-if="state.blog.creator.name">
        <h5>
          {{state.blog.creator.name}}
        </h5>
        </span> -->
        <span v-if="state.blog.imgUrl">
          <img class="img-fluid" :src="state.blog.imgUrl" alt="">
        </span>
        <p class="p-4">
          {{ state.blog.body }}
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <form class="form-inline" @submit.prevent="createComment">
          <input
            type="text"
            name="title"
            id="title"
            class="form-control"
            placeholder="Comment"
            aria-describedby="helpId"
            v-model="state.newComment.body"
          />
          <button class="btn btn-secondary" type="submit">Create Comment </button>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-12 p-3">
        <CommentComponent v-for="commentData in state.comments" :key="commentData.id" :comment="commentData" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { commentsService } from '../services/CommentsService'

export default {
  name: 'ActiveBlogPage',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      newComment: {},
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      user: computed(() => AppState.user)
    })

    onMounted(() => {
      blogsService.getBlog(route.params.id)
      commentsService.getComments(route.params.id)
    })

    onBeforeRouteLeave((to, from, next) => {
      AppState.activeBlog = {}
      next()
    })

    return {
      route,
      state,
      async createComment() {
        state.newComment.blog = AppState.activeBlog.id
        await commentsService.createComment(state.newComment)
        state.newComment = {}
      },
      async deleteBlog() {
        await blogsService.deleteBlog(state.blog.id)
        router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
