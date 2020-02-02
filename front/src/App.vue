<template>
  <section class="app-main">
	<sitemodal v-if="showsitemodal" :contains="contains"></sitemodal>
    <navbar></navbar>
    <router-view></router-view>
    <qrfooter v-if="loadPushed"></qrfooter>
  </section>
</template>

<script>
import navbar from './components/nav/navbar'
import qrfooter from './components/nav/qrfooter'
import sitemodal from './components/sitemodal/sitemodal'
import debounce from './utils/functions'
import { mapMutations } from 'vuex'

// useful cludge
let __proxy

export default {
	name: 'app',
	components: {
		navbar,
		qrfooter,
		sitemodal
	},
	data () {

		return {
			showsitemodal: false,
			contains: null,
			loadPushed: false,
		}

	},
	mounted () {

		this.$root.$on('opensitemodal', (type) => {

			this.contains = type
			this.showsitemodal = true

		})

		this.$root.$on('closesitemodal', () => {

			this.showsitemodal = false
		
		})

		// useful cludge
		__proxy = this
		window.addEventListener('resize', debounce(this.sizeChange, 500))
		window.addEventListener('scroll', debounce(this.scrollChange, 100))

		setTimeout(() => this.loadPushed = true, 200)

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
