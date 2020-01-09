<template>
  <div class="god-div">
      <div v-if="isauthed">
          <router-view></router-view>
      </div>
      <underconstruction v-else></underconstruction>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import underconstruction from './components/underconstruction.vue'

export default {
  name: 'app',
  components: {
    underconstruction,
  },
  created() {

    this.SESSION_CHALLENGE()

  },
  methods: {
    ...mapActions(['SESSION_CHALLENGE']),
  },
  computed: {
    ...mapGetters(['isauthed']),
  },
}
</script>

<style lang="sass">

.god-div
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  width: 100%
  overflow-x: hidden !important
</style>
