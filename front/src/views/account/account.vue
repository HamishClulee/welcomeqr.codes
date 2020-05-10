<template>
  <main class="account-container">

        <h3 class="h3">Account Settings</h3>

        <pagesection qtitle="Controls">
            <div class="controls-container">
                <button class="button" @click="logout">LOGOUT</button>
                <button class="button">Delete Your Account</button>
            </div>
        </pagesection>

        <pagesection id="verify" qtitle="Verify Email">
            <verify :user="user"></verify>
        </pagesection>
    
        <pagesection id="unsub" qtitle="Unsubscribe from Emails">
          <unsub :user="user"></unsub>
        </pagesection>

        <pagesection qtitle="Change Password">
            <changepass></changepass>
        </pagesection>

        <pagesection qtitle="Unlink Google account">
            <unlinkgoogle></unlinkgoogle>
        </pagesection>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus, MESSAGES, LOADING } from '../../EventBus'
import pagesection from '../../components/pagesection'
import verify from './verify'
import unsub from './unsub'
import changepass from './changepass'
import unlinkgoogle from './unlinkgoogle'
export default {
    name: 'account',
    components: {
        pagesection,
        unsub,
        verify,
        changepass,
        unlinkgoogle,
    },
    data() {
        return {
            user: {},
        }
    },
    created() {
        EventBus.$emit(LOADING, true)
        this.$QAuth.usersettings().then(res => {
            this.$store.commit('IS_AUTHED', res.data.user)
            this.user = res.data.user
            EventBus.$emit(LOADING, false)
        })
    },
    methods: {
        logout() {
            this.$QAuth.logout().then(res => {
                this.$store.commit('IS_AUTHED', res.data.user)
                EventBus.$emit(MESSAGES, {
                    is: true,
                    msg: `You are now logged out!`,
                    color: 'secondary',
                    black: false,
                })
            })
        },
    },
    computed: {
        ...mapGetters(['isauthed'],),
    },
    watch: {
        isauthed: function(v) {
            if (!v) this.$router.push({ name: 'home'})
        },
    },
}
</script>

<style lang="sass" scoped>
.account-container
    width: 90%
    margin: 100px auto
    min-width: 400px
    min-height: 90vh
    display: flex
    flex-direction: column
</style>