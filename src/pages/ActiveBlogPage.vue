<template>
  <div class="active-blog-page container">
    <h1 class="text-center">
      {{ state.blog.title }}
    </h1>
    <img class="img-fluid" :src="state.blog.imgUrl" alt="">
    <p class="p-4">
      {{ state.blog.body }}
    </p>
    {{ state.blog }}
  </div>
  <div class="container">
    <div class="row">
      <Comment v-for="commentData in state.comments" :key="commentData.blog" :comment="commentData" />
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
      comment: computed(() => AppState.comments)
    })

    onMounted(() => {
      console.log()
      blogsService.getBlog(route.params.id)
      commentsService.getComments(route.params.blog)
    })
    return {
      state
    }
  },
  components: {
    Comment
  }
}
</script>

<style lang="scss" scoped>

</style>
