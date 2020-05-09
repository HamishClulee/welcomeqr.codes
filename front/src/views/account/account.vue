<template>
  <main class="account-container">
    <h3 class="h3">Account view place holder</h3>
    <button class="button" @click="logout">LOGOUT</button>
    <ul>
        <li>TODO ---- </li>
        <li>Subsubscribe</li>
        <li>Unlink Google Account</li>
        <li>Change Password</li>
    </ul>
    <router-view></router-view>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus, MESSAGES, LOADING } from '../../EventBus'
export default {
    name: 'account',
    created() {
        EventBus.$emit(LOADING, true)
        this.$QAuth.authenticate().then(res => {
            this.$store.commit('IS_AUTHED', res.data.user)
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
    margin: 0 auto
    min-width: 400px
    height: 100vh
    min-height: 800px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
</style>