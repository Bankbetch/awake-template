<template >
  <div class="menu-wrap">
    <div class="search-ham" @click="checkActive('search')">
      <font-awesome-icon :icon="'search'" />
    </div>
    <input id="toggler" type="checkbox" class="toggler" @click="checkActive('menu')" />
    <div class="hamburger">
      <div :class="active? 'active':'non-active'"></div>
    </div>
    <div class="menu">
      <div>
        <div v-if="type ==='menu'">
          <ul>
            <li v-for="item in $siteConfig.mainMenu" :key="item.link" @click="checkActive('menu')">
              <component
                :is="item.link.startsWith('http') ? 'a' : 'nuxt-link'"
                :href="item.link"
                :to="item.link"
                :target="item.target ? item.target : '_self'"
              >{{ item.name }}</component>
            </li>
          </ul>
        </div>
        <div v-else class="overlay-search">
          <span class="search-bar">
            <input
              id="search-input"
              v-model="query"
              autocomplete="off"
              :class="{input: true}"
              type="text"
              @input="search"
              placeholder
              required
            />
            <span class="highlight"></span>
            <label>Search for Someting ?</label>

            <ul v-if="matches" class="search-results subtle-box-shadow position-relative">
              <div v-if="matches.length">
                <li
                  v-for="match in matches"
                  :key="match.slug"
                  @click="toggleSearchBar(),checkActive('search')"
                >
                  <nuxt-link :to="`/${match.slug}`">{{ match.title }}</nuxt-link>
                  <small class="match-snippet" v-html="match.snippet"></small>
                </li>
              </div>

              <li v-else class="text-center">No results found</li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SiteSearch from '~/components/SiteSearch'

export default {
  data() {
    return {
      active: true,
      type: 'menu',
      transitioning: false,
      matches: false,
      haystack: [],
      query: '',
      lastQuery: ''
    }
  },
  components: { SiteSearch },
  methods: {
    checkActive(type) {
      this.active = !this.active
      document.getElementById('toggler').checked = !this.active
      this.type = type
      this.query = ''
    },
    toggleSearchBar() {
      this.transitioning = true
      this.matches = false
      this.query = ''
      this.lastQuery = ''
      setTimeout(() => {
        this.transitioning = false
      }, 500) // Timeout to allow transition to finish
    },
    async search() {
      if (this.lastQuery === this.query) {
        this.toggleSearchBar()
        return
      }
      this.lastQuery = this.query
      if (this.query === '') {
        this.matches = false
        return
      }
      const posts = this.haystack.length
        ? this.haystack
        : await this.$axios.$get('/api/posts.json')
      const matches = posts.filter((match) => {
        return (
          match.content
            .toLowerCase()
            .replace(/#|_|-|~|>|\*|!|\+|`|\||\[|\]|_|:/g, '')
            .indexOf(this.query.toLowerCase()) > -1
        )
      })

      this.matches = matches.map((match) => {
        match.snippet = this.getMatchSnippet(this.query, match.content)
        return match
      })
    },
    getMatchSnippet(query, haystack) {
      const cleanQuery = query.toLowerCase()
      const words = haystack
        .toLowerCase()
        .replace(/#|_|-|~|>|\*|!|\+|`|\||\[|\]|_|:/g, '')
      const pos = words.indexOf(cleanQuery)
      const start = pos > 25 ? pos - 25 : 0
      const end = words.length > pos + 25 ? pos + 25 : words.length
      const prepend = pos > 25 ? '...' : ''
      const append = words.length > pos + 25 ? '...' : ''
      return (
        prepend +
        words
          .slice(start, end)
          .replace(/^. /, '')
          .replace(/ .$/, '')
          .replace(cleanQuery, `<span>${cleanQuery}</span>`)
          .trim() +
        append
      )
    }
  }
}
</script>