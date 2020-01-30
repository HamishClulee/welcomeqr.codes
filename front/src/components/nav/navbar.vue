<template>
    <div class="navbar-con">
        <div class="navbar-left">
            <div class="logo-con" @click="routehome">
                <img src="../../svg/smallogo.svg" />
            </div>
        </div>
        <div class="hamburger" @click="togglecanvas">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
        <div v-if="canvasopen" class="canvas-nav">
            <div class="canvas-text-con">
                <div class="big-x" @click="togglecanvas">
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
                <div
                    class="canvas-item"
                    @click="togglecanvas"
                    :class="checkvis('home') ? 'active-route canvas' : ''">
                        <router-link :to="{ path: '/'}">home</router-link>
                </div>
                <div
                    class="canvas-item"
                    @click="togglecanvas"
                    :class="checkvis('pricing') ? 'active-route canvas' : ''">
                        <router-link :to="{ path: '/pricing'}">pricing</router-link>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'navbar',
    data() {

        return {
            canvasopen: false,
        }
    
    },
    methods: {
        togglecanvas() {

            this.canvasopen = !this.canvasopen
        
        },
        routehome() {

            this.$router.push({ path: '/'})
        
        },
        checkvis(item) {

            return item === this.$route.name
        
        }
    }
}
</script>
<style lang="sass" scoped>
a
    text-decoration: none
    border-bottom: 2px solid transparent
    &:hover
        border-bottom: 2px solid $secondary
.canvas-nav
    z-index: 6
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    transition: all 1s ease
    background-color: white
    color: $font
    height: 100vh
    width: 100%
    overflow: hidden !important
    display: flex
    justify-content: flex-start
    flex-direction: column
    align-items: flex-end
    @media (min-width: 0px) and (max-width: 520px)
        font-size: 0.8em
    .canvas-text-con
        width: 400px
        text-align: right
        margin: 30px 20px 0 0
        a
            font-size: 3em
.active-route
    display: flex
    flex-direction: column
    &:after
        content: ''
        width: 10px
        height: 2px
        background-color: white
        position: relative
        top: 2px
        right: 2px
.canvas
    &:after
        left: 320px
        top: -6px
        width: 80px
        @media (min-width: 0px) and (max-width: 520px)
            width: 50px
            left: 348px
.cta
    background-color: $highlight
    color: $font
.cta-canvas
    background-color: $highlight
    color: $font
    width: 250px
    margin-top: 15px
.navbar-con, .navbar-left, .navbar-right
    display: flex
    flex-direction: row
    background-color: transparent
    a
        color: $font
        text-transform: uppercase
.navbar-con
    position: fixed
    width: 100%
    top: 0
    z-index: 2
.navbar-right
    align-items: center
    justify-content: flex-end
    width: 100%
    margin-right: 20px
    @media (min-width: 0px) and (max-width: 980px)
        display: none
.hamburger
    display: flex
    flex-direction: column
    width: 100%
    align-items: flex-end
    justify-content: center
    margin-right: 20px
    .line
        height: 2px
        width: 25px
        background-color: $font
        margin-top: 4px
.big-x
    cursor: pointer
    padding: 10px
    margin-left: 360px
    margin-bottom: 20px
    &:hover
        opacity: 0.8
    .line
        background-color: $font
        transform: rotate(-45deg)
        &:first-child
            transform: rotate(45deg)
            position: relative
            top: 2px
        height: 2px
        width: 35px
.logo-con
    height: 80px
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
.text-item
    padding: 0 20px
</style>