<template>
  <div class="auth-container">
      <signup></signup>
  </div>
</template>

<script>
import signup from '../components/sitemodal/content/signup'
export default {
    name: 'auth',
    components: {
        signup
    }
}
</script>

<style scoped lang="sass">
.auth-container
    height: 100vh
    margin: 3em
    padding: 5em
</style>