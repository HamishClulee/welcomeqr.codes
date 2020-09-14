<template>
    <main class="create-con" @click="checkWhatsOpen">

        <!-- TOPBAR -->
        <createtopbar
            @save="usersaved"
            @preview="usersaved(() => { $router.push({ path: '/app/preview' })})"
            @publish="userpublished">
        </createtopbar>

        <section class="content-container">

            <!-- ---- EDITOR WINDOW MAIN PANEL ---- -->

            <div id="editor"></div>

            <!-- ---- EDITOR WINDOW MAIN PANEL ENDS -->

            <!-- MODALS / POPUPS -->
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

            <chrome-picker
                @input="setTextColour"
                id="color-picker-parent-target"
                class="color-picker"
                v-if="showColorPicker"
                v-model="colors" 
            ></chrome-picker>

            <linkmodal
                :show="showLinkModal"
                @callback="insertLink"
                @closemodal="showLinkModal = false"
            ></linkmodal>

            <div class="font-size-container" v-show="showFontSize">
                <multiselect 
                    class="font-size"
                    @select="setFontSize"
                    v-model="fontSize"
                    :options="fontSizeOptions"
                ></multiselect>
            </div>

        </section>
                    <!-- SIDEBAR -->
            <createmenubar
                v-bind="{ 
                    editor,
                    isBold,
                    isItalic,
                    showColorPicker,
                    showFontSize,
                    isList,
                    showImageModal
                }"
                @bold="changeBold"
                @italic="changeItalic"
                @colorpicker="showColorPicker = !showColorPicker"
                @linkmodal="showLinkModal = true"
                @fontsize="showFontSize = !showFontSize"
                @list="changeList"
                @showimagemodal="showImageModal = !showImageModal"
                @removeallformats="removeAllFormats">
            </createmenubar>
    </main>
</template>

<script>
import createtopbar from '../../components/create/createtopbar'
import createmenubar from '../../components/create/createmenubar'
import linkmodal from '../../components/linkmodal.vue'
import myupload from 'vue-image-crop-upload'
import { Chrome } from 'vue-color'
import multiselect from 'vue-multiselect'
import { mapGetters } from 'vuex'
import {
    EventBus,
    LOADING,
    MESSAGES,
    EDITOR_ERROR,
    SAVE_SUCCESS_PL,
    PUBLISH_SUCCESS_PL,
} from '../../EventBus'
import { checktoken } from '../../api/token'
export default {
    name: 'create',
    components: {
        createmenubar,
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
    created() {
        if (checktoken()) {
            EventBus.$emit(LOADING, true)
            this.$QEdit.getHTML().then(res => {

                if (res.data.content && res.data.content.html) {
                    this.editor.setHTML(res.data.content.html)
                }

                EventBus.$emit(LOADING, false)

            }).catch(err => { 
                // if error code is > 500 its a server error not an auth issue
                // if the error code is 4XX then it will be caught by the axios interceptor
                EventBus.$emit(EDITOR_ERROR)
                EventBus.$emit(LOADING, false)
            })
        } else {
            this.$router.push({ name: 'home' })
        }

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
        checkWhatsOpen(e) {
            const el = document.getElementById('color-picker-parent-target')
            if (this.showColorPicker && !el.contains(e.target)) this.showColorPicker = false
        },
        usersaved(cb = () => {}) {
            // console.log(this.editor.getHTML())
            this.$QEdit.submitnew(this.editor.getHTML(), this.getuser, false).then(res => {
                cb()
                EventBus.$emit(MESSAGES, SAVE_SUCCESS_PL)
            })
        },
        userpublished(cb = () => {}) {
            // console.log(this.editor.getHTML())
            this.$QEdit.submitnew(this.editor.getHTML(), this.getuser, false).then(res => {
                cb()
                EventBus.$emit(MESSAGES, PUBLISH_SUCCESS_PL)
            })
        },
        setFontSize(e) { 
            this.editor['setFontSize'] (e)
            this.showFontSize = false 
        },
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
            // TODO implement
        },
        removeAllFormats() {
            this.isBold = false
            this.isItalic = false
            this.isList = false
        },
    },
    computed: {
        ...mapGetters(['getuser']),
        isDev () { return process.env.NODE_ENV === 'development' },
    },
    watch: {
        isBold(val) { val ? this.editor['bold'](null) : this.editor['removeBold'](null) },
        isItalic(val) { val ? this.editor['italic'](null) : this.editor['removeItalic'](null) },
        isList(val) { val ? this.editor['makeUnorderedList'](null) : this.editor['removeList'](null) },
    },
}
</script>
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

