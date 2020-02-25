<template>
    <main class="preview-container">
        <section class="preview-html-container" v-html="html">

        </section>
        <button class="floating-fixed" @click="backtoedit"></button>
    </main>
</template>

<script>
import { EventBus, LOADING } from '../../EventBus'
export default {
    name: 'preview',
    data () {
        return {
            html: `<h1 class='h1'>Nothing saved yet</h1>`,
        }
    },
    created() {
        EventBus.$emit(LOADING, true)
        this.$QAuth.authenticate().then(res => {
            this.$store.commit('IS_AUTHED', res.data.user)
            EventBus.$emit(LOADING, false)
            this.$QEdit.getHTML().then(htmlRes => {
                if (htmlRes.data.editor && htmlRes.data.editor.html) {
                    this.html = htmlRes.data.editor.html
                }
            } )

        })
    },
    methods: {
        backtoedit() {
            this.$router.push({ path: '/app/create'})
        },
    },
}
</script>

<style lang="sass" scoped>
.preview-container
    width: 80vw
    margin-left: auto
    margin-right: auto
    margin-top: 50px
    min-height: 80vh
.preview-html-container
    display: flex
    flex-direction: column
    width: 100%

.floating-fixed
    position: fixed
    bottom: 20px
    right: 20px
    height: 40px
    width: 40px
    border-radius: 50%
    background: center / contain no-repeat url("/svg/back.svg")
    background-size: unset
    border: 2px solid $primary
    box-shadow: 0px 17px 10px 0px rgba(0,0,0,0.4)
    cursor: pointer
</style>