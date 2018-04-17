<template>
  <section class="list-view">
    <div class="loading" v-if="loading">loading..</div>
    <div class="no-content" v-else-if="filteredList.length === 0">nothing..</div>
    <ol v-else class="list">
      <li v-for="{ title, date, id } in filteredList" class="list-item" :key="id">
        <router-link :to="'/post/' + id" class="item-title">
          {{ title }}
        </router-link>
        <br>
        <time pubdate="pubdate" :datetime="date | formatDate" :title="date | formatDate" class="item-date">{{ date | timeago }}</time>
      </li>
    </ol>
  </section>
</template>

<script>
import api from '../api'
import NProgress from 'nprogress'

export default {
  name: 'listView',
  data() {
    return {
      lists: [],
      loading: true
    }
  },

  computed: {
    filteredList() {
      let keyword = ''
      if (this.$route) {
        keyword = (this.$route.query.q || '').toLowerCase()
      }
      return this.lists
        .filter(item => item.title.toLowerCase().indexOf(keyword) !== -1)
        .sort((itemA, itemB) => new Date(itemB.date) - new Date(itemA.date))
    }
  },

  created() {
    this.loading = true
    window.document.title = '善良的乌贼'
  },

  methods: {
    loadList() {
      this.loading = true
      this.lists = []
      api
        .getList()
        .then(lists => {
          console.log(lists)
          this.loading = false
          this.lists = lists
          console.log(this.lists)
        })
        .catch(err => {
          this.loading = false
          console.error(err)
        })
    }
  },

  beforeRouteEnter(to, from, next) {
    NProgress.start()
    api
      .getList()
      .then(lists => {
        console.log(lists)
        next(vm => {
          NProgress.done()
          vm.lists = lists
          vm.loading = false
        })
      })
      .catch(err => {
        console.log(err)
        next(false)
      })
  },

  watch: {
    $route: 'loadList'
  }
}
</script>
