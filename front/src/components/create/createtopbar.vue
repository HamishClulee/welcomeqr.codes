<template>
    <nav class="create-topbar-container">
        <div class="navbar-left">
            <div class="logo-con" @click="routehome">
                <img src="/svg/smallogo.svg" />
            </div>
        </div>
        <h6 class="h6">https://{{ getuser.subdom }}.welcomeqr.codes</h6>
        <div class="spacer"></div>

        <div class="top-bar-left">
            <router-link class="button options" :to="{ name: 'manage'}">
                OPTIONS
            </router-link>
            <button class="button save" @click="$emit('save')">
                SAVE
            </button>
            <router-link tag="button" class="button preview" :to="{ name: 'preview' }">
                PREVIEW
            </router-link>
            <button class="button publish">
                PUBLISH
            </button>
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
.spacer
    width: 20%
.top-bar-left
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
.navbar-left
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
</style>