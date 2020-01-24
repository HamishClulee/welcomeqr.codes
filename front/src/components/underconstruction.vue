<template>
    <section class="section">

      <object id="my-svg" type="image/svg+xml" :data="require('./qrcode.svg')"></object>
      
      <div class="heading-con">
        <h1 class="h1" :class="showhead ? 'fadein' : 'hidden'">Don't waste your time with welcome booklets!</h1>
        <object :class="showhead2 ? 'fadein' : 'hidden'" id="my-svg2" type="image/svg+xml" :data="require('./text.svg')"></object>
      </div>

    <footer class="construction-foot" @click="scrollDown">
      <unicon fill="#adadad" name="arrow-circle-down"></unicon>
      <h6 class="h6">CLICK</h6>
    </footer>

  </section>
</template>

<script>
import Vivus from 'vivus'
export default {
  name: 'underconstruction',
  data () {

    return {
      showhead: false,
      showhead2: false,
      viv1: null,
      viv2: null,
      time1: null,
      time2: null
    }

  },
  mounted() {

    this.viv1 = new Vivus('my-svg',   {
      type: 'delayed',
      duration: 800,
      animTimingFunction: Vivus.EASE_IN
    }, () => { /* fires at completed */ })

    setTimeout(() => this.showhead = true, 1500)

    this.time1 = setTimeout(() => {

      this.showhead2 = true

      this.viv2 = new Vivus('my-svg2',   {
        type: 'sync',
        duration: 100,
      }, () => { /* fires at completed */ })
      
    }, 3000)

  },
  methods: {
    scrollDown() {

      window.scrollBy(0, 800)
    
  }
  },
  beforeDestroy() {

    clearTimeout(this.time1)

  }
}
</script>
<style lang="sass" scoped>
#my-svg
  height: 300px
  padding-left: 2em
  @media (min-width: 0px) and (max-width: 1000px)
    height: 40vw
#my-svg2
  width: 80%
  max-width: 800px
.section
  width: 100%
  height: 100vh
  align-items: center
  display: flex
  @media (min-width: 0px) and (max-width: 1000px)
    flex-direction: column
    align-items: flex-start
    justify-content: center
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
.h6
  color: #adadad
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
