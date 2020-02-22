<template>
  <section class="preview-container">
    <router-link class="button" tag="button" :to="{ name: 'create'}">create</router-link>
    <router-link class="button" tag="button" :to="{ name: 'manage'}">manage</router-link>
    <h2 class="h2">To be implemented:</h2>
    <ul>
        <li>Unique subdomain</li>
        <li>Verify Email</li>
        <li>Footer text</li>
        <li>font selector</li>
        <li>Upload: banner image, company logo</li>
        <li>Themeing options</li>
        <li>Site selector, if user has selected a tier with multiple sites</li>
    </ul>
  </section>
</template>

<script>
import { EventBus, LOADING } from '../../EventBus'
export default {
    name: 'preview',
    created() {
        EventBus.$emit(LOADING, true)
        this.$QAuth.authenticate().then(res => { this.$store.commit('IS_AUTHED', res.data.user) })
    },
}
</script>

<style lang="sass" scoped>
.preview-container
    margin-top: 80px
    min-height: 500px
    height: 80vh
    width: 80vw
    margin-left: auto
    margin-right: auto
    padding: 4em
</style>