<template>

    <main class="auth-container">

        <section class="active-component-container">

            <signup @wantslogin="active = 'login'" v-show="active === 'signup'"></signup>

            <login @wantssignup="active = 'signup'" v-show="active === 'login'"></login>

            <forgot v-show="active === 'forgot'"></forgot>

        </section>

    </main>

</template>

<script>
import signup from '../components/auth/signup'
import login from '../components/auth/login'
import forgot from '../components/auth/forgot'
import { EventBus, MESSAGES } from '../EventBus'
export default {
    name: 'auth',
    components: {
        signup,
        login,
        forgot,
    },
    data () {
        return {
            active: 'signup',
        }
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
    mounted() {
        this.$on('wantslogin', this.active = 'login')
        this.$on('wantssignup', this.active = 'signup')
    },
}
</script>

<style scoped lang="sass">
.auth-container
    height: 100vh
    min-height: 800px
    display: flex
    flex-direction: column
    width: 100%
    justify-content: center
    align-items: center
.comp-switch
    display: flex
    flex-direction: row
    width: 100%
    .auth-switch
        width: 100%
.active-component-container
    width: 80%
    min-width: 400px
    margin-left: auto
    margin-right: auto
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
</style>