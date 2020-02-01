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
import debounce from './utils/functions'
import { mapMutations } from 'vuex'

// useful cludge
let __proxy

export default {
	name: 'app',
	components: {
		navbar,
		qrfooter
	},
	mounted () {

		// useful cludge
		__proxy = this
		window.addEventListener('resize', debounce(this.sizeChange, 500))
		window.addEventListener('scroll', debounce(this.scrollChange, 100))

	},
	methods: {
		...mapMutations(['SET_WINDOW_SIZE', 'SET_SCROLL_LOCATION']),
		sizeChange: () => {

			__proxy.SET_WINDOW_SIZE()
		
		},
		scrollChange: () => {

			__proxy.SET_SCROLL_LOCATION()

		}
	},
}
</script>

<style lang="sass"></style>
