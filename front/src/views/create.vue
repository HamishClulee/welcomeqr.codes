<template>
  <main class="create-con">

    <div class="squire-ui-con">

        <h4>ToolBox</h4>

        <div class="squire-row" contenteditable="false">

            <div class="button-group">

                <div class="button-manager">

                    <div data-action="bold" class="sqiure-item" @click="togglebold()">
                        <div class="button-bkgrnd bold"></div>
                    </div>

                    <div class="indic" :class="isBold ? 'active' : 'inactive'"></div>
                </div>

                <div class="button-manager">
                    
                    <div data-action="italic" class="sqiure-item" @click="toggleitalic()">
                        <div class="button-bkgrnd italic"></div>
                    </div>

                    <div class="indic" :class="isItalic ? 'active' : 'inactive'"></div>
                </div>

                <!-- <div data-action="italic" class="sqiure-item">
                    <svgicon name="italic"></svgicon>
                </div>

                <div data-action="underline" class="sqiure-item">
                    <svgicon name="underline"></svgicon>
                </div> -->

            </div>

        </div>
    </div>

    <h4>Editor</h4>

    <div class="squire-container">
        <iframe id="squire" frameborder="0" :src="`${base}/squire/index.html`" @load="frameloaded()" scrolling="no"/>
    </div>

  </main>
</template>

<script>
export default {
    name: 'create',
    data () {

        return {
            editor: null,
            base: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://welcomeqr.codes',
            isBold: false,
            isItalic: false,
        }
    
    },
    mounted () {

    },
    methods: {
        frameloaded () {

            this.editor = document.getElementById('squire').contentWindow.editor
        
        },
        togglebold () {

            this.isBold ? this.editor.bold() : this.editor.removeBold()
            this.isBold = !this.isBold
        
        },
        toggleitalic () {

            this.isItalic ? this.editor.italic() : this.editor.removeItalic()
            this.isItalic = !this.isItalic
        
        }
    }
}
</script>
<style lang="sass" scoped>
.squire-ui-con, .squire-row, .button-group, .sqiure-item, .button-manager
    display: flex
.create-con, .squire-ui-con, .sqiure-item, .button-manager
    flex-direction: column
.squire-row, .button-group
    flex-direction: row
.create-con
    width: 95%
    max-width: 1400px
    min-width: 400px
    justify-contents: center
    alight-items: center
    margin-left: auto
    margin-right: auto
    padding: 1em
    h4
        color: $primary
        width: 100%
        border-bottom: 1px solid #adadad
.button-manager
    &:hover
        .indic
            background: #adadad
.squire-row
    justify-contents: center
    alight-items: center
.button-group
    justify-contents: center
    alight-items: center
.sqiure-item
    border: 1px solid #efefef
    padding: 10px
    align-items: center
    justify-content: center
    border-radius: 2px
    margin: 2px
    cursor: pointer
.button-bkgrnd
    cursor: pointer
    background-position: center
    background-size: contain
    height: 15px
    width: 17px
.bold
    background: center / contain no-repeat url('../components/texteditoricons/bold.svg')
.italic
    background: center / contain no-repeat url('../components/texteditoricons/italic.svg')
.svg-hover
    height: 15px
    cursor: pointer
.indic
    height: 3px
    margin-top: 3px
    width: 70%
    margin-left: auto
    margin-right: auto
.active
    background: $secondary !important
.inactive
    background: transparent
#squire
    width: 100%
    border: 1px #919191 solid
    border-radius: 4px
    height: 50vh
    overflow: hidden
    -webkit-border-radius: 4px
    padding: 7px 8px
    color: #333
    background-color: #fff
    background-repeat: no-repeat
    background-position: right center
    border: 1px solid #ccc
    border-radius: 3px
    outline: none
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.075)
</style>

