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
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
export default {
  name: 'ActiveBlogPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activeBlog)
    })

    onMounted(() => {
      console.log()
      blogsService.getBlog(route.params.id)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
