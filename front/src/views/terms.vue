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
    mounted() {
        EventBus.$emit(LOADING, true)
        this.$QSite.terms().then(res => {
            this.terms = `<p>${JSON.stringify(res, null, 2)}</p>`
            // this.terms = res.data.html
            EventBus.$emit(LOADING, false)
        }).catch(err => {
            this.terms = `<p>${JSON.stringify(err, null, 2)}</p>`
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