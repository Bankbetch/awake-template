<template>
  <div>
    <!-- <form target="_blank" method="post" :action="formAction" @submit="$emit('submit', email)">
      <div class="field has-addons is-fullwidth">
        <p class="control has-icons-left">
          <input v-model="email" class="input" type="email" name="EMAIL" placeholder="Email" />
          <span class="icon is-small is-left">
            <font-awesome-icon icon="envelope" />
            <i class="fas fa-envelope"></i>
          </span>
        </p>
        <div class="control">
          <button
            type="submit"
            class="button is-primary"
          >{{ $siteConfig.newsletter.btnText || 'Subscribe' }}</button>
        </div>
      </div>
    </form>-->
    <div id="fb-root" class="btn-facebook">
      <!-- <span>
        <div class="warp-face">
          <font-awesome-icon :icon="['fab', 'facebook-square']" class="fa-face-color" />
        </div>
        <span></span>
      </span>-->
      <div
        class="fb-like"
        data-href="https://www.facebook.com/facebookapp/"
        data-width
        data-layout="button_count"
        data-action="like"
        data-size="large"
        data-share="false"
      ></div>
      <span>| OR |</span>
      <div id="fb-share-button" @click="openSharedFacebook">
        <svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid meet">
          <path
            class="svg-icon-path"
            d="M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z"
          />
        </svg>
        <span>Share</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  computed: {
    formAction() {
      if (this.$siteConfig.newsletter.mailchimp.on) {
        return this.$siteConfig.newsletter.mailchimp.formAction
      }
      return this.$siteConfig.newsletter.other.formAction
    }
  },
  methods: {
    openSharedFacebook() {
      const url = window.location.href
      window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' + url,
        'facebook-share-dialog',
        'width=800,height=600'
      )
      return false
    }
  }
}
// `https://www.facebook.com/sharer/sharer.php?u=${$route.fullPath}`
</script>

<style lang="scss" scoped>
</style>