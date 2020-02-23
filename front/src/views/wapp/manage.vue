<template>
  <section class="manage-container">

    <template v-if="proceed">
        <router-link class="button" tag="button" :to="{ name: 'create'}">create</router-link>
        <router-link class="button" tag="button" :to="{ name: 'preview'}">preview</router-link>
    </template>

    <h2 class="h2">We need some details before you can get started</h2>

    <div class="subdom-input-container">
        <span class="pre">https://</span>
        <qinput
            :fullwidth="false"
            setwidth="250px"
            inptype="text"
            placey="Your unique sub domain..."
            errortxt=""
            eventname="subdominput"
            @subdominput="checksubdom"
            :isrequired="true"
            :hasautocomplete="false"> 
        </qinput>
        <span class="suf">.welcomeqr.codes</span>
    </div>
    {{ subdomok ? 'tick' : 'big ass x' }}
    <button class="button" @click="submitsubdom">I'm Happy With My Sub Domain!</button>

    <div v-for="(ed, ind) in editors" :key="ind">
        <router-link :to="{ path: '/app/create'}">
            {{ ed._id }}
        </router-link>
    </div>

  </section>
</template>

<script>
import { EventBus, LOADING } from '../../EventBus'
import { mapGetters } from 'vuex'
import qinput from '../../components/forms/qinput'
export default {
    name: 'manage',
    components: {
        qinput,
    },
    data() {
        return {
            editors: [],
            subdom: '',
            checking: false,
            subdomok: false,
            proceed: false,
        }
    },
    created() {
        EventBus.$emit(LOADING, true)
        this.$QAuth.authenticate().then(res => { 
            this.$store.commit('IS_AUTHED', res.data.user)
            EventBus.$emit(LOADING, false)
        })
    },
    mounted() {
        this.$QEdit.getall(this.getuser.id).then(res => {
            this.editors = res.data.editors
        })
    },
    methods: {
        checksubdom(e) {
            this.checking = true
            this.subdom = e
            this.$QEdit.checksubdom(this.subdom).then(res =>{
                this.checking = false
                this.subdomok = res.data.okay
            })
        },
        submitsubdom() {
            this.$QEdit.submitsubdom(this.subdom, this.getuser.id).then(res => {
                this.proceed = true
            })
        },
    },
    computed: {
        ...mapGetters(['getuser']),
    },
}
</script>

<style lang="sass" scoped>
.manage-container
    margin-top: 80px
    min-height: 500px
    height: 80vh
    width: 80vw
    margin-left: auto
    margin-right: auto
    padding: 4em
.subdom-input-container
    display: flex
    flex-direction: row
    .pre, .suf
        font-size: 1.3em
        display: flex
        align-items: center
        margin-bottom: 10px
        color: $medium-gray
    .pre
        margin-right: 5px
    .suf
        margin-left: 5px
</style>