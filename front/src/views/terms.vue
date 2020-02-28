<template>
    <section class="terms-master-container" v-html="terms">

    </section>
</template>

<script>
import { EventBus, LOADING } from '../EventBus'
export default {
    name: 'terms',
    data() {
        return {
            terms: '',
        }
    },
    created() {
        EventBus.$emit(LOADING, true)
        this.$QSite.terms().then(res => {
            this.terms = res.data.html
            EventBus.$emit(LOADING, false)
        })
    },
}
</script>

<style lang="sass">
.terms-master-container
    margin-top: 80px
    padding: 1em 3em
    font-size: 110%
</style>