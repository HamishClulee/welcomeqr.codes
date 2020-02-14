<template>
    <main class="create-app-container">
        <router-view></router-view>
    </main>
</template>

<script>
import { EventBus, LOADING } from '../EventBus'
import qAuth from '../main'
export default {
    name: 'wapp',
    created () {
        EventBus.$emit(LOADING, true)
    },
    mounted() {
        qAuth.authenticate()
    },
    beforeDestroy() {
        EventBus.$emit(LOADING, false)
    },
}
</script>

<style lang="sass" scoped>

</style>