<template>
    <section class="privacy-master-container" v-html="terms">

    </section>
</template>

<script>
import { EventBus, LOADING } from '../EventBus'
export default {
    name: 'privacy',
    data() {
        return {
            terms: '',
        }
    },
    created() {
        EventBus.$emit(LOADING, true)
        this.$QSite.privacy().then(res => {
            this.terms = res.data.html
            EventBus.$emit(LOADING, false)
        })
    },
}
</script>

<style lang="sass">
.privacy-master-container
    margin-top: 80px
    padding: 1em 3em
    font-size: 110%
</style>