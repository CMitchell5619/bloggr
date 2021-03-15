<template>
  <nav class="navbar navbar-expand navbar-dark bg-secondary">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img
          alt="logo"
          src="../assets/img/bloggrs.png"
          height="45"
          class:="img-fluid"
        />
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto align-items-center">
        <!-- <li class="nav-item">
          <router-link :to="{ name: 'Home' }" class="nav-link">
            Home
          </router-link>
        </li> -->
        <li class="nav-item">
          <router-link :to="{ name: 'About' }" class="nav-link">
            About
          </router-link>
        </li>
        <li class="nav-item" v-if="user.isAuthenticated">
          <p class="nav-link hoverable" data-toggle="modal" data-target="#create-modal">
            Create
          </p>
        </li>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-outline-light text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item list-group-item-action hoverable">
                Account
              </div>
            </router-link>
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>

  <!-- Create Post Modal -->
  <div class="modal fade"
       id="create-modal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="create-modalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="create-modalLabel">
            Create Post
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form class="form-inline" @submit.prevent="createBlog">
          <div class="modal-body">
            <div class="form-group">
              <div class="container-fluid">
                <div class="row p-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    class="form-control"
                    placeholder="Title"
                    aria-describedby="helpId"
                    v-model="state.newBlog.title"
                  />
                </div>
                <div class="row p-1">
                  <div class="form-group">
                    <!-- <input
                      rows="5"
                      type="text"
                      name="body"
                      id="body"
                      class="form-control"
                      placeholder="Your post..."
                      aria-describedby="helpId"
                      v-model="blogs.body"
                    /> -->
                    <textarea name="body"
                              id="body"
                              cols="60"
                              rows="10"
                              placeholder="  Body"
                              v-model="state.newBlog.body"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-secondary">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- modal -->
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()
    const state = reactive({
      dropOpen: false,
      blogs: computed(() => AppState.blogs),
      newBlog: {}
    })

    return {
      state,
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      },
      async createBlog() {
        const blogId = await blogsService.createBlog(state.newBlog)
        router.push({ name: 'ActiveBlog', params: { id: blogId } })
        state.newBlog = {}
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--light);
}
</style>
