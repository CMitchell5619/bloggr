<template>
  <div class="about">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>Welcome {{ account.name }}</h1>
          <img class="rounded" :src="account.picture" alt="" />
          <p>{{ account.email }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <Blog v-for="blogData in state.userBlogs" :key="blogData.id" :blog="blogData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { Blog } from '../components/Blog'

export default {
  name: 'Account',
  setup() {
    const state = reactive({
      userBlogs: computed(() => AppState.userBlogs)
    })
    onMounted(() => {
      blogsService.getUserBlogs()
    })
    onBeforeRouteLeave((to, from, next) => {
      AppState.userBlogs = {}
      next()
    })
    return {
      account: computed(() => AppState.account),
      state
    }
  },
  components: {
    Blog
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
