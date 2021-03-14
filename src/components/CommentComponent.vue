<template>
  <div class="comment col-6">
    <div class="card">
      <div class="card-body">
        {{ comment.body }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentComponent',
  props: {
    comment: Object
  },
  setup() {
    return {}
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
