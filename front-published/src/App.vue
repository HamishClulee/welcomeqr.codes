<template>
    <main class="preview-container">
        <section class="preview-html-container" v-if="html !== null" v-html="html">

            <!-- Server side HTML will display here -->
            
        </section>
        <section v-else class="four-oh-four">
            <notfound></notfound>
        </section>
        <qrfooter></qrfooter>
    </main>
</template>

<script>
import { EventBus, LOADING, EDITOR_ERROR } from './EventBus'
import SERVER from './api'
import notfound from './components/notfound'
import qrfooter from './components/qrfooter'
export default {
    name: 'app',
    components: {
        notfound,
        qrfooter,
    },
    data () {
        return {
            html: null,
        }
    },
    created() {

        EventBus.$emit(LOADING, true)

        SERVER.post('/api/get_html_by_subdomain', { subdom: this.getsubdomfromurl() }).then(res => {

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
            if (process.env.NODE_ENV === 'development') return 'unethically-congressional-helplessness'
            else return window.location.host.split('.')[0]
        },
    },
}
</script>

<style lang="sass" scoped>
.preview-container
    width: 98%
    margin-left: auto
    margin-right: auto
    margin-top: 50px
    min-height: 80vh
.preview-html-container
    display: flex
    flex-direction: column
    width: 100%
    max-width: 100%
</style>