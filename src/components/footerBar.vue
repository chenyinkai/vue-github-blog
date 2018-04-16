<template>
  <footer class="footer">
    Copyright © {{ thisYear }} | Powered by <a href="https://github.com/chenyinkai/blog" target="_blank">blog</a>
  </footer>
</template>

<script>
  export default {
    data () {
      return {
        thisYear: new Date().getFullYear()
      }
    }
  }
</script>
