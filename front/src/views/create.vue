<template>
  <main class="create-con">
      hello
    <!-- <div class="form-container">

        <div class="input-container">
            <label>Your Email</label>
            <input type="text" />
        </div>

        <div class="input-container">
            <label>Business Name</label>
            <input type="text" />
        </div>

        <div class="input-container">
            <label>Subdomain</label>
            <input type="text" />
        </div>

    </div> -->

    <div class="squire-container">
        <iframe id="squire" frameborder="0" src="https://welcomeqr.codes/squire/index.html" @load="frameloaded()" />
    </div>


  </main>
</template>

<script>
export default {
    name: 'create',
    data () {

        return {
            squireframe: null
        }
    
},
    mounted () {

    },
    methods: {
        frameloaded () {

            this.squireframe = document.getElementById('squire')
        
        }
    }
}
</script>
<style lang="sass" scoped>
.squire-container
    width: 100%
    height: 100vh
    iframe
        width: 100%
        height: 100vh

</style>

