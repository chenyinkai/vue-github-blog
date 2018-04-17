import axios from 'axios'

function getListUrl (page) {
  page = page || 1
  let url = `https://api.github.com/repos/chenyinkai/blog/issues?page=${page}&per_page=100`
  return url
}

function getPostUrl (id) {
  let url = `https://api.github.com/repos/chenyinkai/blog/issues/${id}`
  return url
}

const Cache = {
  get: key => {
    if (!window.sessionStorage) return false
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  set: (key, data) => {
    if (!window.sessionStorage) return false
    window.sessionStorage.setItem(key, JSON.stringify(data))
    return true
  },
  has: key => {
    return Boolean(
      window.sessionStorage && window.sessionStorage.hasOwnProperty(key)
    )
  }
}

export default {
  getList () {
    if (Cache.has('list')) {
      return Promise.resolve(Cache.get('list'))
    } else {
      return axios
        .get(getListUrl())
        .then(res => res.data)
        .then(arr => {
          // eslint-disable-next-line
          const list = arr.map(({ title, created_at, number }) => ({
            title: title,
            date: created_at,
            id: number
          }))
          Cache.set('list', list)
          return list
        })
    }
  },

  getDetail (id) {
    const cacheKey = 'post.' + id

    if (Cache.has(cacheKey)) {
      return Promise.resolve(Cache.get(cacheKey))
    } else {
      return axios
        .get(getPostUrl(id))
        .then(res => res.data)
        .then(content => {
          Cache.set(cacheKey, content)
          return content
        })
    }
  }
}
