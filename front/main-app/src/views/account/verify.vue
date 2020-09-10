<template>
    <section class="verify-container">

        <p>Your email address is {{ verifystatus }}</p>

        <button class="button" v-if="!user.isemailverified" @click="verify">verify</button>

        <h6 v-else class="h4">{{ servermsg }}</h6>

    </section>
</template>

<script>
import { EventBus, MESSAGES, LOADING } from '../../EventBus'
export default {
    name: 'verify',
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            servermsg: '',
        }
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
            return this.user.isemailverified ? 'verified, thank you!' : 'unverified, please click the button below to verify!'
        },
    },
}
</script>

<style lang="sass" scoped></style>