<template>
    <main class="create-con">

        <createtopbar>
        </createtopbar>

        <section class="content-container">

            <createsidebar
                v-bind="{ editor, isBold, isItalic, showColorPicker, showFontSize, isList, showImageModal }"
                @bold="changeBold"
                @italic="changeItalic"
                @colorpicker="showColorPicker = !showColorPicker"
                @linkmodal="showLinkModal = true"
                @fontsize="showFontSize = !showFontSize"
                @list="changeList"
                @showimagemodal="showImageModal = !showImageModal"
                @removeallformats="removeAllFormats">
            </createsidebar>

            <!-- ---- EDITOR WINDOW MAIN PANEL ---- -->

            <div id="editor"></div>

            <!-- ---- EDITOR WINDOW MAIN PANEL ENDS -->

            <myupload
                field="img"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="showImageModal"
                :width="300"
                :height="300"
                :url="isDev ? 'http://localhost:1980/api/photo' : 'https://welcomeqr.codes/api/photo'"
                langType="en"
                :params="params"
                :headers="headers"
                img-format="png">
            </myupload>

            <chrome-picker @input="setTextColour" class="color-picker" v-if="showColorPicker" v-model="colors" />

            <linkmodal :show="showLinkModal" @callback="insertLink" @closemodal="showLinkModal = false"></linkmodal>

            <div class="font-size-container" v-if="showFontSize">
                <multiselect class="font-size" @select="setFontSize" v-model="fontSize" :options="fontSizeOptions"></multiselect>
            </div>

        </section>
    </main>
</template>

<script>
import createtopbar from '../../components/create/createtopbar'
import createsidebar from '../../components/create/createsidebar'
import linkmodal from '../../components/linkmodal.vue'
import myupload from 'vue-image-crop-upload'
import { Chrome } from 'vue-color'
import multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'
import isAuthed from '../../api/auth'
export default {
    name: 'create',
    components: {
        createsidebar,
        createtopbar,
        linkmodal,
        myupload,
        multiselect,
        'chrome-picker': Chrome,
    },
    data () {

        return {
            fontSize: '16px',
            showFontSize: false,
            fontSizeOptions: [
                '16px',
                '18px',
                '20px',
                '22px',
                '24px',
                '28px',
                '32px',
                '48px',
            ],
            editor: null,
            base: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://welcomeqr.codes',
            isBold: false,
            isItalic: false,
            isList: false,
            showLinkModal: false,
            showImageModal: false,
            showColorPicker: false,
            colors: {
                hex: '#194d33',
                hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
                hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
                rgba: { r: 25, g: 77, b: 51, a: 1 },
                a: 1,
            },
            params: {
                token: '123456798',
                name: 'avatar',
            },
            headers: {
                smail: '*_~',
            },
            imgDataUrl: '',
        }
    
    },
    beforeRouteUpdate (to, from, next) {

        const nup = () => { this.$router.push({ path: '/auth' }) }
        isAuthed(() => {}, nup, this)
        next()

    },
    mounted () {

        const edel = document.getElementById( 'editor' )
        this.editor = new Squire( edel, {
            blockTag: 'p',
            blockAttributes: {'class': 'paragraph'},
            tagAttributes: {
                ul: {'class': 'UL'},
                ol: {'class': 'OL'},
                li: {'class': 'listItem'},
                a: {'target': '_blank'},
            },
        })
    },
    methods: {
        setFontSize(e) { this.editor['setFontSize'] (e) },
        setTextColour(e) { this.editor['setTextColour'] (e.hex) },
        changeBold() { this.isBold = !this.isBold },
        changeItalic() { this.isItalic = !this.isItalic },
        changeList() { this.isList = !this.isList },
        insertLink(val){

            if (!val.name || !val.url) {
                this.imageModalShow = !this.imageModalShow
            } else {
                this.imageModalShow = !this.imageModalShow
                const html = `<a target="_blank" href="${val.url}">${val.name}</a>`
                this.editor.insertHTML(html)
            }

        },
        cropSuccess(imgDataUrl, field){ this.imgDataUrl = imgDataUrl },
        cropUploadSuccess(jsonData, field){
            
            const tmp = this.imgDataUrl
            this.editor.insertHTML(`<img height="300" src="${tmp}" />`)
            this.showImageModal = false
            this.imgDataUrl = ''
        
        },
        cropUploadFail(status, field){
            // TODO impl
        },
        removeAllFormats() {
            this.isBold = false
            this.isItalic = false
            this.isList = false
        },
    },
    computed: {
        isDev () { return process.env.NODE_ENV === 'development' },
    },
    watch: {
        isBold(val) { val ? this.editor['bold'](null) : this.editor['removeBold'](null) },
        isItalic(val) { val ? this.editor['italic'](null) : this.editor['removeItalic'](null) },
        isList(val) { val ? this.editor['makeUnorderedList'](null) : this.editor['removeList'](null) },
    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="sass" scoped>
.create-con, .tabs-bar, .tab-item, .tab-member, .tab-text, .content-container
    display: flex
.tabs-bar, .tab-item, .tab-member, .tab-text, .content-container
    flex-direction: row
.tab-text, .tab-item
    align-items: center
    justify-content: center
.tabs-bar, .create-con
    margin-left: auto
    margin-right: auto
    width: 100%
.create-con
    flex-direction: column
    width: 100%
.content-container
    width: 100%
    align-items: flex-start
    justify-content: flex-start
.tabs-bar
    cursor: pointer
.router-link-exact-active
    border-bottom: 2px solid $secondary !important
.tab-member
    width: 50px
    height: 50px
.tab-item
    flex-grow: 1
.disable-item
    color: $light-gray
    cursor: not-allowed
.tab-text
    font-family: $body-font
    text-transform: uppercase
.color-picker
    position: absolute
    top: 214px
    left: 10px
.font-size-container
    position: absolute
    top: 274px
    left: 51px
.details
    background: center / contain no-repeat url("/svg/details.svg")
    background-size: unset
.preview
    background: center / contain no-repeat url("/svg/eye.svg")
    background-size: unset
</style>

