<template>
  <div class="auth-container">
      <signup></signup>
  </div>
</template>

<script>
import signup from '../components/sitemodal/content/signup'
import { EventBus, MESSAGES } from '../EventBus'
export default {
    name: 'auth',
    components: {
        signup,
    },
    created() {
        const para = new URLSearchParams(window.location.search)
        if (para.get('redirect') === 'true') {
            EventBus.$emit(MESSAGES, {
                is: true,
                msg: 'You need to be logged in to view that page!',
                color: 'tertiary',
                black: false,
            })
        }
    },
}
</script>

<style scoped lang="sass">
.auth-container
    height: 100vh
    margin: 3em
    padding: 5em
</style>