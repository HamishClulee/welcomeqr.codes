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
        // EventBus.$emit('globalspinner', true)
        // isAuthed(() => {
        //     EventBus.$emit('globalspinner', false)
        // }, () => {
        //     EventBus.$emit('globalspinner', false)
        // }, this)
    },
}
</script>

<style lang="sass" scoped>

</style>