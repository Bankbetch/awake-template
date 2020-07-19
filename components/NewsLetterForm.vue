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
      <span>
        <div class="warp-face">
          <font-awesome-icon :icon="['fab', 'facebook-square']" class="fa-face-color" />
        </div>
        <span></span>
      </span>
      <div
        class="fb-like"
        data-href="https://developers.facebook.com/docs/plugins/"
        data-layout="standard"
        data-action="like"
        data-size="small"
        data-share="false"
      ></div>
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
  }
}
</script>

<style lang="scss" scoped>
$blue: #1877f2;
$dark-buld: #516eab;
.btn-facebook {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div > button {
    height: 28px;
    font-size: 13px !important;
    background-color: $blue !important;
    border: 0 !important;
    font-weight: bold !important;
    > a {
      text-decoration: none !important;
    }
  }
  span {
    font-size: 13px;
    margin-left: 5px;
    display: flex;
  }
}
.warp-face {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1.5px solid #000;
  svg {
    margin-right: 5px;
  }
  .fa-face-color {
    color: $dark-buld;
  }
}
</style>