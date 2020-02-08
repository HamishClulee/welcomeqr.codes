<template>
    <section class="editor-con">

        <header class="header">

        </header>

    </section>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
    name: 'editor',
    components: {

    },
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="sass" scoped>
.editor-con
    padding: 1em
.color-picker
    position: absolute
    left: 187px
    top: 227px
    z-index: 9999
.active-button
    border-bottom: 4px solid $secondary
.header
    margin-top: 20px    
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
</style>


