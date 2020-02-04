<template>
    <main class="create-con">
        <nav class="tabs-bar">

            <span class="tab-item" @click="activeTab = 'details'">
                <div class="icon-backer editor tab-member"></div>
                <div class="tab-text tab-member">Details</div>
            </span>

            <span class="tab-item" @click="activeTab = 'editor'">
                <div class="icon-backer editor tab-member"></div>
                <div class="tab-text tab-member">Editor</div>
            </span>

            <span class="tab-item" @click="activeTab = 'preview'">
                <div class="icon-backer preview tab-member"></div>
                <div class="tab-text tab-member">Preview</div>
            </span>
        </nav>

        <section class="content-container">

            <createsidebar v-show="activeTab === 'details'"></createsidebar>

            <section>

                <qrdetails v-show="activeTab === 'details'"></qrdetails>

                <editor v-show="activeTab === 'editor'"></editor>

                <preview v-show="activeTab === 'preview'"></preview>

            </section>

        </section>
    </main>
</template>

<script>
import qrdetails from '../components/create/qrdetails'
import editor from '../components/create/editor'
import preview from '../components/create/preview'
import createsidebar from '../components/create/createsidebar'
import { mapGetters } from 'vuex'
export default {
    name: 'create',
    components: {
        qrdetails,
        editor,
        preview,
        createsidebar,
    },
    data () {

        return {
            detailsComplete: false,
            editorSaved: false,
            activeTab: 'details'
        }
    
    },
    mounted () {

        this.$on('detailsgood', () => {

            this.detailsComplete = true

        })

    },
    methods: {
        
    }
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
    margin-top: 60px
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
.details
    background: center / contain no-repeat url("../svg/details.svg")
    background-size: unset
.editor
    background: center / contain no-repeat url("../svg/edit.svg")
    background-size: unset
.preview
    background: center / contain no-repeat url("../svg/eye.svg")
    background-size: unset
</style>

