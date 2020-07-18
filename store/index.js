import { isString } from 'lodash'
export const state = () => ({
  pageType: '',
  title: '',
  subtitle: '',
  featureImage: '',
  content: '',
  author: '',
  date: '',
  theme: 'light'
})
export const mutations = {
  set(state, data) {
    state = Object.assign(state, data)
  },
  theme(state, data) {
    console.log('data:', data)
    state.theme = data
  }
}
export const actions = {
  nuxtServerInit(store, context) {
    this.$cms = context.store.$cms
  },
  set({ commit }, { resource, slug }) {
    if (!resource) {
      setOtherPageData(commit, this.$siteConfig)
    } else {
      const theResource = isString(resource) ? this.$cms[resource] : resource
      const data = Object.assign(theResource.getOne(slug), {
        pageType: theResource.slug
      })
      data.slug = slug
      commit('set', data)
    }
  },
  theme({ commit }, data) {
    console.log('data:', data)
    commit('theme', data)
  }
}

function setOtherPageData(commit, siteConfig) {
  commit('set', {
    title: siteConfig.siteName,
    subtitle: siteConfig.tagline,
    featureImage: siteConfig.featureImage
  })
}
