<template>
    <div></div>
</template>

<script>
import { EventBus, LOADING } from '../EventBus'
import { settoken } from '../api/token'
export default {
    name: 'authcb',
    created() {

        EventBus.$emit(LOADING, true)
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')

        if (token) {
            
            settoken(token.split('~').join('.'))

            this.$QAuth.getuser().then(res => {

                this.$store.commit('IS_AUTHED', res.data.user)
                EventBus.$emit(LOADING, false)
                this.$router.push({ name: 'manage' })

            })
        }
    },
}
</script>

<style>

</style>