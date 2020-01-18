<template>
  <main class="create-con">

    <!-- <div class="form-container">

        <div class="input-container">
            <label>Your Email</label>
            <input type="text" />
        </div>

        <div class="input-container">
            <label>Business Name</label>
            <input type="text" />
        </div>

        <div class="input-container">
            <label>Subdomain</label>
            <input type="text" />
        </div>

    </div> -->

    <div class="editor-con">

        <textarea :value="input" @input="update" class="editor-actual"></textarea>

        <div v-html="markdown" class="preview-con"></div>

    </div>

  </main>
</template>

<script>
import marked from 'marked'
import { debounce } from 'lodash'
import sanitise from 'sanitize-html'
export default {
    name: 'create',
    data () {

        return {
            input: `
# Heading Style 1







## Second Heading





### Third...



Emphasis, aka italics, with *asterisks* or _underscores_.


Strong emphasis, aka bold, with **asterisks** or __underscores__.


Combined emphasis with **asterisks and _underscores_**.


Strikethrough uses two tildes. ~~Scratch this.~~


1. First ordered list item
2. Another item
3. Actual numbers don't matter, just that it's a number
4. And another item.



* Unordered list can use asterisks
- Or minuses
+ Or pluses


[I'm an inline-style link](https://www.google.com)


[I'm an inline-style link with title](https://www.google.com "Google's Homepage")


Here's our logo (hover to see the title text):
Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")


Colons can be used to align columns.


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
`,
        }
    
    },
    computed: {
        markdown: function () {

            return marked(sanitise(this.input))
            
        }
    },
    methods: {
        update: debounce(function (e) {

            this.input = e.target.value
        
        }, 300)
    }
}
</script>

<style lang="sass" scoped>
.create-con 
    min-height: 100vh
.preview-con
    display: flex
    align-items: flex-start
    flex-direction: column
    text-align: left
    width: 49%
    padding: 20px
    line-height: 1.2
.editor-con
    margin: 0
    height: 100%
    vertical-align: top
    box-sizing: border-box
    padding: 10px
    color: #333
    text-align: left
    display: flex
    flex-direction: row
.editor-actual
    border: none
    border-right: 1px solid #ccc
    resize: none
    outline: none
    height: 120vh
    overflow-y: hidden
    background-color: #f6f6f6
    font-size: 14px
    font-family: 'Monaco', courier, monospace
    padding: 20px
    display: inline-block
    width: 49%
    min-height: 80vh
</style>