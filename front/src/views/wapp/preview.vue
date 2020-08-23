<template>
    <main class="preview-container" v-show="!authinprog">
        <section class="preview-html-container" v-html="html">
            <!-- Server side HTML will display here -->
        </section>
        <button class="floating-fixed" @click="backtoedit"></button>
    </main>
</template>

<script>
import { EventBus, LOADING, EDITOR_ERROR } from '../../EventBus'
export default {
    name: 'preview',
    data () {
        return {
            authinprog: true,
            html: `<h1 class='h1'>Nothing saved yet</h1>`,
        }
    },
    created() {
        EventBus.$emit(LOADING, true)
        this.$QEdit.getHTML().then(htmlRes => {
            if (htmlRes.data.editor && htmlRes.data.editor.html) {
                this.html = htmlRes.data.editor.html
            }
            EventBus.$emit(LOADING, false)
        }).catch(err => {
            EventBus.$emit(EDITOR_ERROR)
            EventBus.$emit(LOADING, false)
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
    max-width: 100%
    overflow-y: hidden
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