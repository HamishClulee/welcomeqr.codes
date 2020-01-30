<template>
    <main class="create-con">
        <nav class="tabs-bar">
            <router-link tag="span" class="tab-item" :to="{ path: '/create/details' }">
                <div class="icon-backer details tab-member"></div>
                <div class="tab-text tab-member">Details</div>
            </router-link>
            <router-link tag="span" class="tab-item" :to="{ path: '/create/editor' }" v-if="detailsComplete">
                <div class="icon-backer editor tab-member"></div>
                <div class="tab-text tab-member">Editor</div>
            </router-link>
            <router-link tag="span" class="tab-item" :to="{ path: '/create/preview' }" v-if="detailsComplete && editorSaved">
                <div class="icon-backer preview tab-member"></div>
                <div class="tab-text tab-member">Preview</div>
            </router-link>
        </nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        
    </main>
</template>

<script>
export default {
    name: 'create',
    data () {

        return {
            detailsComplete: false,
            editorSaved: false,
        }
    
    },
    mounted () {

        this.$on('detailsgood', () => {

            this.detailsComplete = true

        })

    },
    methods: {
        
    },
    computed: {

    }
}
</script>
<style lang="sass" scoped>
.create-con, .tabs-bar, .tab-item, .tab-member, .tab-text
    display: flex
.tabs-bar, .tab-item, .tab-member, .tab-text
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
.tabs-bar
    cursor: pointer
.router-link-exact-active
    border-bottom: 2px solid $secondary !important
.tab-member
    width: 50px
    height: 50px
.tab-item
    flex-grow: 1
    border: 1px solid $light-gray
.tab-text
    font-family: $body-font
    text-transform: uppercase
.details
    background: center / contain no-repeat url("../../svg/details.svg")
    background-size: unset
.editor
    background: center / contain no-repeat url("../../svg/edit.svg")
    background-size: unset
.preview
    background: center / contain no-repeat url("../../svg/eye.svg")
    background-size: unset
</style>

