<template>
    <main class="home-con">

        <displaysection sassclass="white">

            <div class="landing-con">
                <object id="qr-svg" type="image/svg+xml" :data="require('../svg/qrcode.svg')"></object>
        
                <div class="heading-con">
                    <h1 class="main-h1" :class="showheading ? 'fadein' : 'hidden'">Don't waste your time with welcome booklets!</h1>
                    <object :class="showtext ? 'fadein' : 'hidden'" id="text-svg" type="image/svg+xml" :data="require('../svg/text.svg')"></object>
                </div>
            </div>

            <footer class="construction-foot" @click="scrollDown">
                <object type="image/svg+xml" :data="require('../svg/arrow-circle-down.svg')"></object>
                <h6 class="h6">FIND OUT WHY!</h6>
            </footer>

        </displaysection>

        <displaysection id="srcoll-pop" sassclass="primary">

            <h1 class="h1">Welcome QR is the perfect solution for Airbnb and Holiday accomodation providers.</h1>
            <h2 class="h2">
                Instead of printing a physical welcome document for your guests, which is expensive 
                time consuming, subject to damagage and loss, and requires reprints for all rooms 
                everytime you want to make a change - Choose WelcomeQR.
            </h2>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>

        </displaysection>

        <displaysection sassclass="secondary">
            <p>
                We provide you with eveything you need, hosting, an awesome online editor, and 
                downloadable files to give to your printers, or print your self. Your guests simply 
                scan the QR we provide and are directed to your personalised and custonisable web site 
                which can be updated in seconds, as many times as you like.
            </p>
            <h1 class="h1">
                We know your life is busy, and we know that saving time and increasing value is the 
                way to success in your industry!
            </h1>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>

        <displaysection sassclass="tertiary">
            <p>
                It's a great look for your guests, the most simple and convienient solution even for 
                non technical users, all they need is a smart phone. It makes more sence for you as a 
                provider as well, only pay once, update as many times as you like, reduce the clutter 
                in your rooms, and look much more professional than the Airbnb next door still 
                using ancient technology!
            </p>
            <p>
                Want to inform guests of up-coming events or upload different welcome text containing 
                seasonal information?
            </p>
            <h1 class="h1">
                Have the freedom to create and delete things at will, never use the printers again!
            </h1>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>

        <displaysection sassclass="highlight">
            <p>
                Our online editor can be used from your mobile or desktop, and provides you with a 
                large amount of freedom to make your content appear as you want it.
                <ul>
                    <li><span class="tilde">~</span> Upload images and video</li>
                    <li><span class="tilde">~</span> Make multiple pages</li>
                    <li><span class="tilde">~</span> Use your brand colors and logo</li>
                    <li><span class="tilde">~</span> Insert Maps</li>
                    <li><span class="tilde">~</span> Link to locations or websites</li>
                </ul>
            </p>
            <ctabutton text="try it for free" :do="ctaroute"></ctabutton>
        </displaysection>

        <displaysection :isFooter="true" sassclass="white">

            <p>
                Write some footer content
            </p>

        </displaysection>
        
    </main>
</template>

<script>
import displaysection from '../components/displaysection'
import ctabutton from '../components/buttons/ctabutton'
import Vivus from 'vivus'
export default {
    name: 'home',
    components: {
        displaysection,
        ctabutton
    },
    data () {

        return {
            showtext: false,
            showheading: false,
            qrviv: null,
            textviv: null,
            qrtime: null,
            texttime: null
        }

    },
    mounted () {

        this.qrviv = new Vivus('qr-svg',   {
            type: 'delayed',
            duration: 800,
            animTimingFunction: Vivus.EASE_IN
        }, () => { /* fires at completed */ })

        setTimeout(() => this.showheading = true, 1500)

            this.texttime = setTimeout(() => {

            this.showtext = true

            this.textviv = new Vivus('text-svg',   {
                type: 'sync',
                duration: 100,
            }, () => { /* fires at completed */ })

        }, 3000)
    
    },
    methods: {
        ctaroute () {

            this.$router.push({ path: '/create' })

        },
        scrollDown() {

            const el = document.getElementById('srcoll-pop')
            el.scrollIntoView({ alignToTop: true, behavior: 'smooth' })
        
        }
    },
    beforeDestroy() {

        clearTimeout(this.qrtime)

    }
}
</script>

<style lang="sass" scoped>
.landing-con
    width: 100%
    display: flex
    align-items: center
    display: flex
    text-align: left
    @media (min-width: 0px) and (max-width: 1000px)
        flex-direction: column
        align-items: flex-start
        justify-content: center
#qr-svg
    height: 300px
    @media (min-width: 0px) and (max-width: 1000px)
        height: 40vw
#text-svg
    width: 80%
    max-width: 800px
.construction-foot
    width: 100%
    position: absolute
    bottom: 0
    height: 100px
    cursor: pointer
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
.heading-con
    display: flex
    flex-direction: column
    text-align: left
    align-items: flex-start
    padding-left: 1em
    @media (min-width: 0px) and (max-width: 1000px)
        padding-left: 0
.home-con
    text-align: center
.main-h1
    font-size: 2.8em
    font-family: $heading-font
.h1
    font-size: 1.8em
.h2
    font-size: 1.6em
    font-weight: lighter
p
    font-size: 1.8em
    font-family: $body-font
ul
    list-style: none
    text-align: left
    margin-left: 4em
li
    font-size: 1.4em
    font-family: $heading-font
    margin-left: -60px
    text-align: left
.tilde
    color: $primary
.hidden
    opacity: 0
.fadein
    transition: opacity 1s ease
    opacity: 1
</style>
