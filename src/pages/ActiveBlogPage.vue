<template>
  <div class="active-blog-page container">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">
          {{ state.blog.title }}
        </h1>
        <img class="img-fluid" :src="state.blog.imgUrl" alt="">
        <p class="p-4">
          {{ state.blog.body }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <CommentComponent v-for="commentData in state.comments" :key="commentData.id" :comment="commentData" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'ActiveBlogPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments)
    })

    onMounted(() => {
      console.log()
      blogsService.getBlog(route.params.id)
      commentsService.getComments(route.params.id)
    })
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
