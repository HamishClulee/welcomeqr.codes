<template>
    <main class="home-con">

        <displaysection sassclass="primary">

            <h1>Welcome QR is the perfect solution for Airbnb and Holiday accomodation providers.</h1>
            <h2>
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
            <h1>
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
            <h1>
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
        
    </main>
</template>

<script>
import displaysection from '../components/displaysection'
import ctabutton from '../components/buttons/ctabutton'
export default {
  name: 'home',
  components: {
      displaysection,
      ctabutton
  },
  methods: {
      ctaroute () {

          this.$router.push({ name: 'create' })
      
    }
  }
}
</script>

<style lang="sass" scoped>
.home-con
    text-align: center
h1
    font-size: 1.8em
h2
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
</style>
