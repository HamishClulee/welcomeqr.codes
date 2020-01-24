<template>
    <main class="create-con">

        <h5 class="h5">Toolbox</h5>

        <header>

            <section>
                <div class="button-group">
                    <span id="bold">Bold</span>
                    <span id="removeBold">Unbold</span>
                </div>

                <div class="button-group">
                    <span id="italic">Italic</span>
                    <span id="removeItalic">Unitalic</span>
                </div>

                <div class="button-group">
                    <span id="removeAllFormatting">Remove formatting</span>
                </div>

                <div class="button-group">
                    <span id="setFontSize" class="prompt">Font size</span>
                    <span id="setFontFace" class="prompt">Font face</span> 
                </div>

                <div class="button-group">
                    <span id="setTextColour" class="prompt">Text colour</span>
                    <span id="makeLink" class="prompt">Link</span>
                </div>

                <div class="button-group">
                    <span id="makeHeader">Make Header</span>
                </div>

                <div class="button-group">
                    <span id="undo">Undo</span>
                    <span id="redo">Redo</span>
                </div>

            </section>
            <section>

            </section>
            <section>
                <div class="button-group">
                    <span id="makeUnorderedList">List</span>
                    <span id="removeList">Unlist</span>
                    <span id="increaseListLevel">Increase list level</span>
                    <span id="decreaseListLevel">Decrease list level</span>
                </div>
 
                <div class="button-group">
                    <span id="insertImage" class="prompt">Image</span>
                    <!-- <span id="setHTML" class="prompt">Set HTML</span> -->
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

    },
    computed: {

    }
}
</script>

<style lang="sass" scoped>
header
    margin-bottom: 20px    
.create-con
    padding: 2em
h5
    margin-bottom: 30px
    margin-left: 4px
    color: $secondary
    border-bottom: 1px solid #adadad
    padding-bottom: 5px
span 
    cursor: pointer
    margin: 4px
    border: 1px solid #adadad
    padding: 10px 20px
    font-family: $body-font
section
    display: flex
    flex-direction: row
    align-items: center
    justify-content: flex-start
    padding-bottom: 10px
    margin-bottom: 5px

#editor
    margin-top: 10px
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box
    box-sizing: border-box
    min-height: 400px
    height: 80vh
    border: 1px solid #888
    padding: 1em
    background: transparent
    color: #2b2b2b
    cursor: text
    font-family: sans-serif
a 
    text-decoration: none

ul, ol 
    margin: 0 1em
    padding: 0 1em

blockquote 
    border-left: 2px solid blue
    margin: 0
    padding: 0 10px
</style>


