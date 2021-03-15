<template>
  <div class="comment p-2">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-5">
            {{ comment.body }}
          </div>
          <div class="col-5 text-muted">
            {{ comment.creator.name }}
          </div>
          <div class="col-2">
            <button class="btn btn-danger" v-if="comment.creator.email == state.user.email" @click="deleteComment">
              Deletto
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { commentsService } from '../services/CommentsService'
import { useRoute } from 'vue-router'
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'CommentComponent',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    comment: Object
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      user: computed(() => AppState.user),
      activeBlog: computed(() => AppState.activeBlog)
    })
    return {
      state,
      async deleteComment() {
        await commentsService.deleteComment(props.comment.id)
        commentsService.getComments(route.params.id)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
