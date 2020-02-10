<template>
    <main class="create-app-container">
        <router-view></router-view>
    </main>
</template>

<script>
import { EventBus, LOADING } from '../EventBus'
import isAuthed from '../api/auth'
export default {
    name: 'wapp',
    created () {
        EventBus.$emit('globalspinner', true)
    },
    mounted() {
        isAuthed(this.yup, this.nup, this)
    },
    methods: {
        yup() {
            this.$router.replace({ name: 'manage' })
            EventBus.$emit(LOADING, false)
        },
        nup() {
            this.$router.replace({ name: 'auth' })
            EventBus.$emit(LOADING, false)
        },
    },
}
</script>

<style lang="sass" scoped>

</style>