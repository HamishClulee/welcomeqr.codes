<template>
    <main class="preview-container">

        <section class="preview-html-container" v-if="html !== null" v-html="html">

            <!-- Server side HTML will display here -->
            
        </section>
        <loading v-else-if="loading"></loading>
        <section v-else class="four-oh-four">
            <notfound></notfound>
        </section>
        <qrfooter></qrfooter>
    </main>
</template>

<script>
import { EventBus, LOADING, EDITOR_ERROR } from './EventBus'
import notfound from '@shared/components/notfound'
import qrfooter from '@shared/components/qrfooter'
import loading from '@shared/components/loading'

export default {
    name: 'app',
    components: {
        notfound,
        qrfooter,
        loading,
    },
    data () {
        return {
            html: null,
            loading: true,
        }
    },
    created() {

        this.$QEdit.getHtmlBySub(this.getsubdomfromurl()).then(res => {

            if (res.data.content && res.data.content.html) {
                this.html = res.data.content.html
            }

            this.loading = false

        }).catch(err => {

            this.loading = false

        })
    },
    methods: {
        getsubdomfromurl() {
            if (process.env.NODE_ENV === 'development') return 'easily-sleepy-comedian'
            else return window.location.host.split('.')[0]
        },
    },
}
</script>

<style lang="sass" scoped>
.preview-container
    width: 100%
    margin-top: 30px
.preview-html-container
    margin-left: auto
    margin-right: auto
    display: flex
    flex-direction: column
    width: 98%
    max-width: 1600px
    overflow-x: hidden !important
    min-height: 90vh
</style>