<template>
  <div
    :class="{
      'search-wrapper': true,
      active: active,
      transitioning: transitioning,
      inactive: !active && !transitioning
    }"
  >
    <span class="search-bar">
      <input
        id="search-input"
        v-model="query"
        autocomplete="off"
        :class="{
          input: true
        }"
        type="text"
        @input="search"
        placeholder="Search for Someting ?"
      />

      <ul v-if="matches" class="search-results subtle-box-shadow">
        <div v-if="matches.length">
          <li v-for="match in matches" :key="match.slug" @click="toggleSearchBar()">
            <nuxt-link :to="`/${match.slug}`">{{ match.title }}</nuxt-link>
            <small class="match-snippet" v-html="match.snippet"></small>
          </li>
        </div>

        <li v-else class="text-center">No results found</li>
      </ul>
    </span>

    <label for="search-input">
      <font-awesome-icon
        :icon="active ? 'times':'search'"
        class="search-icon"
        @click="toggleSearchBar()"
        @mouseenter="active? '':toggleSearchBar()"
      />
    </label>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      active: false,
      transitioning: false,
      matches: false,
      haystack: [],
      query: '',
      lastQuery: ''
    }
  },
  methods: {
    toggleSearchBar() {
      console.log(this.active)
      this.transitioning = true
      this.active = !this.active
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
