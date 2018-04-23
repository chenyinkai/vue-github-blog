<template>
  <section class="post-view">
    <div v-if="!content">loading..</div>
    <h1 class="post-title">
      {{ title }}
      <time pubdate="pubdate" :datetime="this.date | formatDate" :title="this.date | formatDate" class="post-date">{{ this.date | timeago }}</time>
    </h1>
    <article v-if="content" v-html="htmlFromMarkdown"></article>
  </section>
</template>

<script>
import api from '../api'
import marked from '../utils/render.js'
import NProgress from 'nprogress'

export default {
  name: 'postView',

  data() {
    return {
      title: '',
      date: null,
      content: ''
    }
  },

  computed: {
    htmlFromMarkdown () {
      return marked(this.content)
    }
  },

  beforeRouteEnter(to, from, next) {
    NProgress.start()
    api
      .getDetail(to.params.hash)
      .then(content => {
        next(vm => {
          NProgress.done()
          vm.content = content.body
          vm.title = content.title
          vm.date = content.updated_at
          window.document.title = `${vm.title} - 善良的乌贼`
        })
      })
      .catch(err => {
        console.log(err)
        next(false)
      })
  }
}
</script>
