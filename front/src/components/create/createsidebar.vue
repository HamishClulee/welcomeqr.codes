<template>
    <aside class="create-sidebar-con">

        <span @click="changebold" class="bold" :class="isBold ? 'active-button' : 'inactive-button'"></span>

        <span @click="changeItalic" class="italic" :class="{ 'active-button': isItalic }"></span>

        <span @click.stop="showColorPicker = !showColorPicker" :class="showColorPicker ? 'times' : 'color'" title="Set the color of the selected text"></span>

        <span @click="showLinkModal = true" class="link" title="Insert and internal or external link"></span>

        <span id="makeHeader" title="Set selection to be a heading"></span>

        <!-- <multiselect @select="setFontSize" v-model="fontSize" :options="fontSizeOptions"></multiselect> -->

        <span @click="changeList" class="list" :class="{ 'active-button': isList }" title="Make a bulleted list"></span>

        <span id="increaseListLevel" title="Indent the bulleted list"></span>

        <span id="insertImage" @click="showImageUpload = true"></span>

        <span id="undo" title="Undo last action"></span>

        <span id="redo" title="Redo the last action you undid"></span>

        <span id="removeAllFormatting"></span>

    </aside>
</template>

<script>
export default {
    name: 'createsidebar',
    data() {
        return {
            isBold: false,
        }
    },
    methods: {
        changebold() {
            this.$emit('changebold')
            this.isBold = !this.isBold
        },
    },
}
</script>

<style lang="sass" scoped>
.create-sidebar-con
    padding: 5px
    font-family: $body-font
    height: 100vh
    border-right: 1px solid $light-gray
    display: flex
    flex-direction: column
    position: fixed
    top: 60px
    box-shadow: 0 1px 2px rgba(0,0,0,0.24)
span, .span
    cursor: pointer
    margin: 4px
    border: 1px solid #adadad
    padding: 20px
    font-family: $body-font
.active-button
    border-bottom: 4px solid $secondary 
.inactive-button
    display: flex
.bold
    background: center / contain no-repeat url("../../svg/bold.svg")
    background-size: unset
.italic
    background: center / contain no-repeat url("../../svg/italic.svg")
    background-size: unset
#undo
    background: center / contain no-repeat url("../../svg/undo.svg")
    background-size: unset
#redo
    background: center / contain no-repeat url("../../svg/redo.svg")
    background-size: unset
.times
    background: center / contain no-repeat url("../../svg/times.svg")
    background-size: unset
.link
    background: center / contain no-repeat url("../../svg/link.svg")
    background-size: unset
.list
    background: center / contain no-repeat url("../../svg/list.svg")
    background-size: unset
#increaseListLevel
    background: center / contain no-repeat url("../../svg/list-indent.svg")
    background-size: unset
#insertImage
    background: center / contain no-repeat url("../../svg/image.svg")
    background-size: unset
#removeAllFormatting, .removeAllFormatting
    background: center / contain no-repeat url("../../svg/cancel.svg")
    background-size: unset
.color
    background: center / contain no-repeat url("../../svg/palette.svg")
    background-size: unset
#makeHeader
    background: center / contain no-repeat url("../../svg/text-size.svg")
    background-size: unset
</style>