<template>
	<section class="app-main">

		<!-- GLOBAL SPINNER -->
		<template v-if="showGlobalSpinner">
			<div class="global-spinner-con">
				<loading></loading>
			</div>
		</template>


		<!-- APP ACTUAL -->
		<template v-else>

			<sitemodal v-if="showsitemodal" :contains="contains"></sitemodal>

			<navbar></navbar>

			<router-view></router-view>

			<qrfooter v-if="loadPushed"></qrfooter>

		</template>

	</section>
</template>

<script>
import navbar from './components/nav/navbar'
import qrfooter from './components/nav/qrfooter'
import sitemodal from './components/sitemodal/sitemodal'
import loading from './components/loading'
import debounce from './utils/functions'
import { mapMutations } from 'vuex'
import { EventBus } from './EventBus.ts'

// useful cludge
let __proxy

export default {
	name: 'app',
	components: {
		navbar,
		qrfooter,
        sitemodal,
        loading
	},
	data () {

		return {
			showsitemodal: false,
			showGlobalSpinner: false,
			contains: null,
			loadPushed: false,
		}

	},
	mounted () {

		EventBus.$on('globalspinner', (isit) => {

			this.showGlobalSpinner = isit

		})

		EventBus.$on('opensitemodal', (type = null) => {

			if (type) {

				this.contains = type
				this.showsitemodal = true

			} else {

				this.showsitemodal = false

			}

		})

		// useful cludge
		__proxy = this
		window.addEventListener('resize', debounce(this.sizeChange, 500))
		window.addEventListener('scroll', debounce(this.scrollChange, 100))

        // another useful cludge to prevent the footer from flashing
		setTimeout(() => this.loadPushed = true, 1500)  

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

<style lang="sass">
.app-main
    min-height: 100vh !important
.global-spinner-con
    height: 100vh
    min-height: 800px
    display: flex
    align-items: center
    justify-content: center
    width: 100%
</style>
