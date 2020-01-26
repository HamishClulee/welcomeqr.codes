<template>
    <main class="create-con">
        <router-link :to="{ name: 'home'}">back</router-link>

        <h5 class="h5-editor">Toolbox</h5>

        <header class="header">

            <section class="section">
                <div class="button-group">
                    <span @click="changeBold" class="bold" :class="{ 'active-button': isBold }"></span>
                </div>

                <div class="button-group">
                    <span @click="changeItalic" class="italic" :class="{ 'active-button': isItalic }"></span>
                </div>

                <div class="button-group">
                    <span id="removeAllFormatting">Remove formatting</span>
                </div>

                <div class="button-group">
                    <span id="setFontSize" class="prompt"></span>
                    <span id="setFontFace" class="prompt"></span> 
                </div>

                <div class="button-group">
                    <span id="setTextColour" class="prompt">Text colour</span>
                    <span id="makeLink" class="prompt"></span>
                </div>

                <div class="button-group">
                    <span id="makeHeader">Make Header</span>
                </div>

                <div class="button-group">
                    <span id="makeUnorderedList"></span>
                    <span id="increaseListLevel"></span>
                    <span id="removeList">Unlist</span>
                    <span id="decreaseListLevel">Decrease list level</span>
                </div>
 
                <div class="button-group">
                    <span id="insertImage" class="prompt"></span>
                    <!-- <span id="setHTML" class="prompt">Set HTML</span> -->
                </div>

                <div class="button-group">
                    <span id="undo"></span>
                    <span id="redo"></span>
                </div>
            </section>
        </header>

        <div id="editor"></div>

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
            isItalic: false
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
        changeBold() {

            this.isBold = !this.isBold

        },
        changeItalic() {

            this.isItalic = !this.isItalic

        }
    },
    computed: {

    },
    watch: {
        isBold(val) {

            val ? this.editor['bold'](null) : this.editor['removeBold'](null)
        
        },
        isItalic(val) {

            val ? this.editor['italic'](null) : this.editor['removeItalic'](null)
        
        }
    }
}
</script>

<style lang="sass" scoped>
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
#setFontSize
    background: center / contain no-repeat url("../svg/text-size.svg")
    background-size: unset
#setFontFace
    background: center / contain no-repeat url("../svg/text-size.svg")
    background-size: unset
#makeLink
    background: center / contain no-repeat url("../svg/link.svg")
    background-size: unset
#makeUnorderedList
    background: center / contain no-repeat url("../svg/list.svg")
    background-size: unset
#increaseListLevel
    background: center / contain no-repeat url("../svg/list-indent.svg")
    background-size: unset
#insertImage
    background: center / contain no-repeat url("../svg/image.svg")
    background-size: unset
</style>


