<template>
  <main class="account-container">
    <h3 class="h3">Account view place holder</h3>
    <button class="button" @click="logout">LOGOUT</button>
  </main>
</template>

<script>
import qAuth from '../main'
import { mapGetters } from 'vuex'
import { EventBus, MESSAGES } from '../EventBus'
export default {
    name: 'account',
    created() {
        qAuth.authenticate()
    },
    methods: {
        logout() {
            qAuth.logout().then(res => {
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