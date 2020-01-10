/* eslint-disable max-len */
<template>
    <main class="page-con">

      <section class="construction-con">

        <object id="my-svg" type="image/svg+xml" :data="require('./qrcode.svg')"></object>
        
        <div class="heading-con">
          <h1 :class="showhead ? 'fadein' : 'hidden'">Don't waste your time with welcome booklets!</h1>
          <object :class="showhead2 ? 'fadein' : 'hidden'" id="my-svg2" type="image/svg+xml" :data="require('./text.svg')"></object>
        </div>

      </section>

      <footer class="construction-foot">
        <h5>This application is still in Beta, <a href="/contact">contact us</a> to request early access.</h5>
      </footer>

    </main>
</template>

<script>
import Vivus from 'vivus'
export default {
  name: 'underconstruction',
  data () {

    return {
      showhead: false,
      showhead2: false
    }

  },
  mounted() {

    new Vivus('my-svg',   {
      type: 'delayed',
      duration: 800,
      animTimingFunction: Vivus.EASE_IN
    }, () => { /* fires at completed */ })

    setTimeout(() => this.showhead = true, 1500)

    setTimeout(() => {

      this.showhead2 = true

      new Vivus('my-svg2',   {
        type: 'sync',
        duration: 100,
      }, () => { /* fires at completed */ })
      
    }, 3000)
  
  }
}
</script>
<style lang="sass" scoped>
#my-svg
  height: 300px
  @media (min-width: 0px) and (max-width: 1000px)
    height: 40vw
#my-svg2
  width: 80%
  max-width: 800px
.page-con
  width: 100%
  height: 100vh
  overflow: hidden !important
.construction-con
    padding: 2em
    height: 90vh
    width: 100%
    align-items: center
    display: flex
    @media (min-width: 0px) and (max-width: 1000px)
        flex-direction: column
        align-items: flex-start
        justify-content: center
        padding: 2em -2em
.construction-foot
  width: 100vw
  overflow-x: hidden !important
  position: absolute
  bottom: 0
  height: 60px
  border-top: 1px solid #adadad
  background-color: $primary
  display: flex
  align-items: center
  justify-content: center
  box-shadow: 0 -5px 5px -5px rgba(0,0,0,0.19)
  h5
    text-transform: unset
    color: lighten($font, 15)
    a 
      color: $link
    @media (min-width: 740px) and (max-width: 1000px)
      font-size: 1.1em
    @media (min-width: 0px) and (max-width: 740px)
      font-size: 0.8em
.heading-con
  display: flex
  flex-direction: column
  text-align: left
  align-items: flex-start
  padding-left: 1em
  @media (min-width: 0px) and (max-width: 1000px)
    padding-left: 0
  h1
    margin: 10px 20px 0 0
    @media (min-width: 740px) and (max-width: 1240px)
      margin-right: 20px
      font-size: 2em
    @media (min-width: 0px) and (max-width: 740px)
      margin-right: 20px
      font-size: 1.4em
.hidden
  opacity: 0
.fadein
  transition: opacity 1s ease
  opacity: 1
</style>
