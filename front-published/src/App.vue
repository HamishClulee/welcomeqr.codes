<template>
    <main class="preview-container">
        <section class="preview-html-container" v-html="html">

            <!-- Server side HTML will display here -->
            
        </section>
    </main>
</template>

<script>
import { EventBus, LOADING, EDITOR_ERROR } from './EventBus'
import SERVER from './api'
export default {
    name: 'app',
    data () {
        return {
            authinprog: true,
            html: `<h1 class='h1'>Nothing saved yet</h1>`,
            devdom: 'unethically-congressional-helplessness',
        }
    },
    created() {

        EventBus.$emit(LOADING, true)

        SERVER.post('/public/get_html_by_subdomain', { subdom: this.getsubdomfromurl() }).then(res => {

            if (res.data.content && res.data.content.html) {
                this.html = res.data.content.html
            }

            EventBus.$emit(LOADING, false)

        }).catch(err => {

            EventBus.$emit(EDITOR_ERROR)
            EventBus.$emit(LOADING, false)

        })
    },
    methods: {
        getsubdomfromurl() {
            if (process.env.NODE_ENV === 'development') return this.devdonm
            else return window.location.host.split('.')[0]
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
</style>