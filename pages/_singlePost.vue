<template>
  <div id="post-page" class="page-wrapper post-page">
    <site-hero :title="title" :subtitle="subtitle" :image="featureImage">
      <span v-if="author && $siteConfig.posts.displayAuthor" class="author-wrapper">
        <strong>Author:</strong>
        {{ author }}
      </span>
      <span v-if="date" class="date-wrapper">
        <strong>Published on:</strong>
        {{ date }}
      </span>
    </site-hero>
    <main-section :one-column-constrained="true">
      <template v-slot:default>
        <div class="post-wrapper">
          <markdown :markdown="$store.state.content" />
          <div class="other-posts">
            <h6 class="subtitle is-size-4">Related Posts</h6>
            <!-- Related Posts -->
            <posts-grid :number="3" :category="category" :exclude="slug" />
          </div>
          <disqus-comments :identifier="$route.params.singlePost" />
        </div>
      </template>
      <template v-slot:sidebar>
        <post-sidebar />
      </template>
    </main-section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { setPageData, getFormattedDate } from '../helper'
// import 'highlight.js/styles/github.css'
import Markdown from '~/components/Markdown'
import PostSidebar from '~/components/PostSidebar'
export default {
  head() {
    return {
      title: `Home | ${this.title}`,

      meta: [
        {
          keywords: [this.title, 'safety-blog', 'safety'],
          name: 'description',
          content: this.$store.state.content.substring(100)
        },
        {
          property: 'og:title',
          content: this.$store.state.content.substring(100)
        },
        { property: 'og:site_name', content: `Home | ${this.title}` },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index,follow' },
        { property: 'og:url', content: this.$route.fullPath }
      ]
    }
  },
  components: {
    Markdown,
    PostSidebar
  },
  computed: {
    ...mapState([
      'title',
      'subtitle',
      'featureImage',
      'underSubtitle',
      'author',
      'category',
      'slug'
    ]),
    date() {
      return getFormattedDate(this.$store.state.date)
    },
    url() {
      return `${process.env.URL}/${this.$route.fullPath}`
    }
  },
  fetch({ store, params, ctx }) {
    setPageData(store, { resource: 'post', slug: params.singlePost })
  }
}
</script>
<style scoped lang="scss">
.edit-post {
  margin-bottom: 20px;
}
</style>
