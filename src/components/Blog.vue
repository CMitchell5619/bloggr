<template>
  <div class="blog col-6 p-3">
    <router-link :to="{name: 'ActiveBlog', params: {id: blog.id}}">
      <div class="card" style="width: 45rem;">
        <img class="card-img-top" :src="blog.imgUrl" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">
            {{ blog.title }}
          </h5>
          <p class="card-text">
            {{ blog.body }}
          </p>
          <p class="card-text">
            {{ }}
          </p>
          <a href="#" class="btn btn-secondary">Go somewhere</a>
        </div>
      </div>
    </router-link>
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
