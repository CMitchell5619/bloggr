<template>
  <div class="blog col-6-lg col-12 p-2 mt-3">
      <div class="card">
    <router-link :to="{name: 'ActiveBlog', params: {id: blog.id}}">
          <h3 class="card-title">
            {{ blog.title }}
          </h3>
    </router-link>
        <span v-if="blog.imgUrl">
        <img class="card-img-top img-fluid rounded" :src="blog.imgUrl" alt="Card image cap">
        </span>
        <div class="card-body">
          <p class="card-text text-left">
            {{ blog.body }}
          </p>
          <span v-if="blog.creator">
          <p class="card-text text-left text-muted">
            {{ blog.creator.name }}
          </p>
          </span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  props: {
    blog: Object
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
