<template>
    <main class="create-app-container">
        <router-view></router-view>
    </main>
</template>

<script>
import { EventBus } from '../EventBus'
import isAuthed from '../api/auth'
export default {
    name: 'wapp',
    created () {
        EventBus.$emit('globalspinner', true)
        isAuthed(() => {
            this.$router.push({ path: '/app/manage' })
            EventBus.$emit('globalspinner', false)
        }, () => {
            this.router.push({ path: '/auth' })
            EventBus.$emit('globalspinner', false)
        }, this)
    },
}
</script>

<style lang="sass" scoped>

</style>