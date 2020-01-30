<template>
  <section class="app-main">
    <navbar></navbar>
    <router-view></router-view>
    <qrfooter></qrfooter>
  </section>
</template>

<script>
import navbar from './components/nav/navbar'
import qrfooter from './components/nav/qrfooter'
export default {
  name: 'app',
  components: {
    navbar,
    qrfooter
  }
}
</script>

<style lang="sass">
.app-main
</style>
