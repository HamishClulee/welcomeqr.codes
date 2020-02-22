<template>
	<section class="app-main">

		<!-- GLOBAL SPINNER -->
		<template v-show="showGlobalSpinner">

			<div class="global-spinner-con">
				<loading></loading>
			</div>

		</template>


		<!-- APP ACTUAL -->
		<template v-show="!showGlobalSpinner">

			<sitemodal v-if="showsitemodal" v-bind="{ contains }"></sitemodal>

			<navbar v-if="checkroute"></navbar>

			<router-view></router-view>

			<qrfooter v-if="loadPushed && showfooter"></qrfooter>

		</template>

        <usermessages v-bind="{ msg, black, sass }" v-if="showUserMessage"></usermessages>
        
	</section>
</template>

<script>
import navbar from './components/nav/navbar'
import qrfooter from './components/nav/qrfooter'
import sitemodal from './components/sitemodal/sitemodal'
import usermessages from './components/usermessages'
import loading from './components/loading'
import debounce from './utils/functions'
import { mapMutations } from 'vuex'
import { 
    EventBus,
    LOADING,
    MESSAGES,
    SITEMODAL,
} from './EventBus.ts'

// useful cludge
let __proxy

export default {
    name: 'app',
    components: {
        navbar,
        qrfooter,
        sitemodal,
        loading,
        usermessages,
    },
    data () {

        return {
            showsitemodal: false,
            showGlobalSpinner: false,
            contains: null,
            loadPushed: false,
            showUserMessage: false,
            msg: '',
            sass: '',
            black: '',
        }

    },
    beforeCreate() {
        // if token exists, maybe user already has a session, pass false so auth failure doesnt redirect user to /auth
        if(this.$QAuth.checktoken()) this.$QAuth.authenticate(false).then(res => {
            this.$store.commit('IS_AUTHED', res.data.user)
        })
    },
    created() {
        // set state ui vars
        this.SET_WINDOW_SIZE()
        this.SET_SCROLL_LOCATION()
    },
    mounted () {
        // EventBus handling global loading spinner, user message pop up and site wide modals
        EventBus.$on(LOADING, is => { this.showGlobalSpinner = is })
        EventBus.$on(MESSAGES, deets => {
            this.showUserMessage = deets.is
            this.msg = deets.msg || ''
            this.sass = deets.color || ''
            this.black = deets.black || false
        })
        EventBus.$on(SITEMODAL, (type = null) => {
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

        },
    },
    computed: {
        checkroute() {
            return ['create', 'wapp', 'preview'].indexOf(this.$route.name) === -1
        },
        showfooter() {
            return ['auth'].indexOf(this.$route.name) === -1
        },
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
