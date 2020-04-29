<template>
    <nav class="create-topbar-container">
        <div class="top-bar-left">
            <div class="logo-con" @click="routehome">
                <img src="/svg/smallogo.svg" />
            </div>
        </div>

        <div class="top-bar-middle"><h6 class="h6">https://{{ getuser.subdom }}.welcomeqr.codes</h6></div>

        <div class="top-bar-right">

            <router-link tag="div" :to="{ name: 'manage'}" class="top-bar-item-container">
                <div class="icon-container options"></div>
                <div class="tiny-text">OPTIONS</div>
            </router-link>

            <div :to="{ name: 'manage'}" class="top-bar-item-container" @click="$emit('save')">
                <div class="icon-container save"></div>
                <div class="tiny-text">SAVE</div>
            </div>

            <div class="top-bar-item-container" @click="$emit('preview')">
                <div class="icon-container preview"></div>
                <div class="tiny-text">PREVIEW</div>
            </div>

            <div class="top-bar-item-container" @click="$emit('publish')">
                <div class="icon-container publish"></div>
                <div class="tiny-text">PUBLISH</div>
            </div>

        </div>

    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'createtopbar',
    methods: {
        routehome () {
            this.$router.push({ name: 'home'})
        },
    },
    computed: {
        ...mapGetters(['getuser']),
    },
}
</script>

<style lang="sass" scoped>
.options
    border: none
.button
    margin: 0 10px
.h6
    color: $medium-gray
    margin-left: 20px
    font-size: 1em
    margin-bottom: 5px
.top-bar-middle
    width: 100%
.top-bar-right
    display: flex
    flex-direction: row
    align-items: center
    width: 100%
    justify-content: flex-end
.create-topbar-container
    height: 60px
    border-bottom: 1px solid $light-gray
    display: flex
    flex-direction: row
    align-items: center
    background-color: white
    z-index: 9
    position: fixed
    width: 100%
    box-shadow: 0 1px 2px rgba(0,0,0,0.24)
.top-bar-left
    display: flex
    flex-direction: row
    background-color: transparent
.logo-con
    height: 60px
    display: flex
    align-items: center
    cursor: pointer
    margin-left: 15px
    @media (min-width: 0px) and (max-width: 520px)
        height: 60px
    &:hover
        opacity: 0.8
    img
        height: 50px
        width: 120px
        @media (min-width: 0px) and (max-width: 520px)
            height: 30px
.top-bar-item-container
    height: 50px
    width: 70px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    cursor: pointer
    &:hover
        opacity: 0.8
.icon-container
    height: 25px
    width: 25px
.tiny-text
    font-size: 0.7em
.publish
    background: center / contain no-repeat url("/svg/cloud-up.svg")
    background-size: unset
.save
    background: center / contain no-repeat url("/svg/file-check.svg")
    background-size: unset
.preview
    background: center / contain no-repeat url("/svg/eye.svg")
    background-size: unset
.options
    background: center / contain no-repeat url("/svg/settings.svg")
    background-size: unset
</style>