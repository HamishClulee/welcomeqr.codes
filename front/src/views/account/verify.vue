<template>
  <main class="account-container">
    <h3 class="h3">Verify your email address</h3>
    <button class="button" @click="verify">verify</button>
  </main>
</template>

<script>
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
        verify() {

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