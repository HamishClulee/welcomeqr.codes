<template>
    <section class="verify-container">

        <p>Your email address is {{ verifystatus }}</p>

        <button class="button" v-if="!isverifed" @click="verify">verify</button>

        <h6 v-else class="h4">{{ servermsg }}</h6>

    </section>
</template>

<script>
import { EventBus, MESSAGES, LOADING } from '../../EventBus'
export default {
    name: 'account',
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            servermsg: '',
            isverifed: false,
        }
    },
    created() {
        EventBus.$emit(LOADING, true)
        this.$QAuth.authenticate().then(res => {
            this.$store.commit('IS_AUTHED', res.data.user)
            EventBus.$emit(LOADING, false)
        })
    },
    mounted() {
        this.isverifed = this.user.isemailverified
    },
    methods: {
        verify() {
            const params = new URLSearchParams(window.location.search)
            this.$QAuth.verifyemail(params.get('token')).then(res => {
                this.servermsg = 'Email verified.'
                this.$store.commit('IS_AUTHED', res.data.user)
            })
        },
    },
    computed: {
        verifystatus() {
            return this.isverifed ? 'verified, thank you!' : 'unverified, please click the button below to verify!'
        },
    },
}
</script>

<style lang="sass" scoped>
.verify-container
</style>