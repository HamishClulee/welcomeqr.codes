<template>
    <main class="create-con">
        <router-link :to="{ name: 'home'}">back</router-link>

        <h5 class="h5-editor">Toolbox</h5>

        <header class="header">

            <section class="section">
                <div class="button-group" title="toggle bold">
                    <span @click="changeBold" class="bold" :class="{ 'active-button': isBold }"></span>
                </div>

                <div class="button-group" title="toggle italic">
                    <span @click="changeItalic" class="italic" :class="{ 'active-button': isItalic }"></span>
                </div>

                <div class="button-group">

                    <span @click.stop="showColorPicker = !showColorPicker" :class="showColorPicker ? 'times' : 'color'" title="Set the color of the selected text"></span>

                    <chrome-picker @input="setTextColour" class="color-picker" v-if="showColorPicker" v-model="colors" />

                    <span @click="showLinkModal = true" class="link" title="Insert and internal or external link"></span>

                    <linkmodal :show="showLinkModal" @callback="insertLink" @closemodal="showLinkModal = false"></linkmodal>

                </div>

                <div class="button-group">
                    <span id="makeHeader" title="Set selection to be a heading"></span>
                </div>

                <div class="button-group">
                    <multiselect @select="setFontSize" v-model="fontSize" :options="fontSizeOptions"></multiselect>
                </div>

                <div class="button-group">

                    <span @click="changeList" class="list" :class="{ 'active-button': isList }" title="Make a bulleted list"></span>

                    <span id="increaseListLevel" title="Indent the bulleted list"></span>

                </div>
 
                <div class="button-group" title="Insert and image into the document">
                    <span id="insertImage" @click="showImageUpload = true"></span>
                </div>

                <div class="button-group">
                    <span id="undo" title="Undo last action"></span>
                    <span id="redo" title="Redo the last action you undid"></span>
                </div>

                <div class="button-group" title="Remove all formatting from selection">
                    <span id="removeAllFormatting"></span>
                </div>

            </section>

        </header>

        <div id="editor"></div>

        <myupload
            field="img"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="showImageUpload"
            :width="300"
            :height="300"
            :url="isDev ? 'http://localhost:1980/api/photo' : 'https://welcomeqr.codes/api/photo'"
            langType="en"
            :params="params"
            :headers="headers"
            img-format="png">
        </myupload>
        <img :src="imgDataUrl">

    </main>
</template>

<script>
import linkmodal from '../components/linkmodal.vue'
import myupload from 'vue-image-crop-upload'
import { Chrome } from 'vue-color'
import Multiselect from 'vue-multiselect'
export default {
    name: 'create',
    components: {
        linkmodal,
        myupload,
        'chrome-picker': Chrome,
        Multiselect
    },
    data () {

        return {
            fontSize: '16px',
            fontSizeOptions: [
                '16px',
                '18px',
                '20px',
                '22px',
                '24px',
                '28px',
                '32px',
                '48px'
            ],
            editor: null,
            base: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://welcomeqr.codes',
            isBold: false,
            isItalic: false,
            isList: false,
            showLinkModal: false,
            showImageUpload: false,
            showColorPicker: false,
            colors: {
                hex: '#194d33',
                hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
                hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
                rgba: { r: 25, g: 77, b: 51, a: 1 },
                a: 1
            },
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
			},
			imgDataUrl: ''
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
                a: {'target': '_blank'}
            }
        })

        Squire.prototype.makeHeader = function () {

            return this.modifyBlocks( function( frag ) {

                let output = this._doc.createDocumentFragment()
                let block = frag

                while ( block = Squire.getNextBlock( block ) ) {

                    output.appendChild(
                        this.createElement( 'h2', [ Squire.empty( block ) ] )
                    )
                
                }

                return output
            
            })
        
        }

        document.addEventListener( 'click', ( e ) => {

            let id = e.target.id,
                value
            if ( id && this.editor && this.editor[ id ] ) {

                if ( e.target.className === 'prompt' ) {

                    value = prompt( 'Value:' )
                
                }
                this.editor[ id ]( value )
            
            }
  
        }, false )
    
    },
    methods: {
        setFontSize(e) {

            this.editor["setFontSize"] (e)

        },
        setTextColour(e) {

            this.editor["setTextColour"] (e.hex)

        },
        changeBold() {

            this.isBold = !this.isBold

        },
        changeItalic() {

            this.isItalic = !this.isItalic

        },
        changeList() {

            this.isList = !this.isList

        },
        insertLink(val){

            if (!val.name || !val.url) {

                this.imageModalShow = !this.imageModalShow

            } else {

                this.imageModalShow = !this.imageModalShow
                const html = `<a target="_blank" href="${val.url} + ">${val.name}</a>`
                this.editor.insertHTML(html)

            }

        },
        toggleShow() {

            this.showImageUpload = !this.showImageUpload
        
        },
        cropSuccess(imgDataUrl, field){

            this.imgDataUrl = imgDataUrl
        
        },
        cropUploadSuccess(jsonData, field){

            // TODO impl
        
        },
        cropUploadFail(status, field){

            // TODO impl
            
        }

    },
    computed: {
        isDev () {

            return process.env.NODE_ENV === 'development'

        }
    },
    watch: {
        isBold(val) {

            val ? this.editor['bold'](null) : this.editor['removeBold'](null)
        
        },
        isItalic(val) {

            val ? this.editor['italic'](null) : this.editor['removeItalic'](null)
        
        },
        isList(val) {

            val ? this.editor['makeUnorderedList'](null) : this.editor['removeList'](null)
        
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="sass" scoped>
.color-picker
    position: absolute
    left: 187px
    top: 227px
    z-index: 9999
.active-button
    border-bottom: 4px solid $secondary
.header
    margin-top: 20px    
.create-con
    padding: 2em
.h5-editor
    margin-bottom: 30px
    font-size: 2em
    font-family: $heading-font
    margin-left: 4px
    color: $secondary
    border-bottom: 1px solid #adadad
    padding-bottom: 5px
span, .span
    cursor: pointer
    margin: 4px
    border: 1px solid #adadad
    padding: 10px 20px
    font-family: $body-font
.section
    display: flex
    flex-direction: row
    align-items: center
    justify-content: flex-start
    padding-bottom: 10px
    margin-bottom: 20px
.bold
    background: center / contain no-repeat url("../svg/bold.svg")
    background-size: unset
.italic
    background: center / contain no-repeat url("../svg/italic.svg")
    background-size: unset
#undo
    background: center / contain no-repeat url("../svg/undo.svg")
    background-size: unset
#redo
    background: center / contain no-repeat url("../svg/redo.svg")
    background-size: unset
.times
    background: center / contain no-repeat url("../svg/times.svg")
    background-size: unset
#setFontSize

#setFontFace

.link
    background: center / contain no-repeat url("../svg/link.svg")
    background-size: unset
.list
    background: center / contain no-repeat url("../svg/list.svg")
    background-size: unset
#increaseListLevel
    background: center / contain no-repeat url("../svg/list-indent.svg")
    background-size: unset
#insertImage
    background: center / contain no-repeat url("../svg/image.svg")
    background-size: unset
#removeAllFormatting, .removeAllFormatting
    background: center / contain no-repeat url("../svg/cancel.svg")
    background-size: unset
.color
    background: center / contain no-repeat url("../svg/palette.svg")
    background-size: unset
#makeHeader
    background: center / contain no-repeat url("../svg/text-size.svg")
    background-size: unset
</style>


