<template>
  <section class="manage-container" v-show="!authinprog">

    <h6 v-if="!getuser.subdom" class="h6">We need some details before you can get started</h6>

    <!-- USER HASNT ENTERED A SUBDOM YET -->

    <qicon color="link" icon="eye" size="xlarge"></qicon>

    <template v-if="!getuser.subdom">
        <div class="subdom-input-container" >
            <span class="pre">https://</span>
            <qinput
                v-if="!getuser.subdom"
                :fullwidth="false"
                setwidth="350px"
                inptype="text"
                placey="Your unique sub domain..."
                errortxt=""
                eventname="subdominput"
                @subdominput="checksubdom"
                ref="subdom"
                :isrequired="true"
                :hasautocomplete="false"> 
            </qinput>
            <span class="suf">.welcomeqr.codes</span>
            <span class="icon tick" v-if="subdomok"></span>
            <span class="icon bigx" v-else></span>
            <loadinginline class="icon" v-if="checking"></loadinginline>
        </div>
        <div class="subdom-button-container">
            <button class="button-small subsubmit first" @click="submitsubdom">I'm Happy With My Sub Domain!</button>
            <button class="button-small subsubmit second" @click="getrandomsubdom">Generate Random Sub Domain!</button>
        </div>
        
    </template>

    <template v-else>
        <h4 class="h4">Your subdomain is</h4>
        <h5 class="h5">https://{{ getuser.subdom }}.welcomeqr.codes</h5>
        <h6 class="h6">Any websites you publish will be hosted at that address</h6>
        <router-link class="button" tag="button" :to="{ path: '/app/create'}">Start editing</router-link>
    </template>    

    <!-- USER HAS A SUBDOM - TODO:: implement multiple editors, blocked by:: user roles, JWT, OAuth -->
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
import loadinginline from '../../components/loadinginline'
import qicon from '../../components/icon/qicon'

export default {
    name: 'manage',
    components: {
        qinput,
        loadinginline,
        qicon,
    },
    data() {
        return {
            editors: [],
            subdom: '',
            checking: false,
            subdomok: false,
            proceed: false,
            authinprog: true,
        }
    },
    created() {
        // EventBus.$emit(LOADING, true)
        // this.$QAuth.authenticate(true).then(res => {
        //     this.$store.commit('IS_AUTHED', res.data.user)
        //     if (res.data.user.subdom) {
        //         this.subdom = res.data.user.subdom
        //     }
        EventBus.$emit(LOADING, false)
        this.authinprog = false
        // }).catch(err => {
        //     this.$router.push({ name: 'login', query: { 'redirect': true } })
        //     this.$store.commit('IS_AUTHED', err.response.data.user)
        //     EventBus.$emit(LOADING, false)
        //     this.authinprog = false
        // })
    },
    methods: {
        getrandomsubdom() {
            this.$QEdit.generateRandomSubDom().then(res => {
                this.$refs['subdom'].$data.val = res.data.content
            })
        },
        checksubdom(e) {
            this.checking = true
            if (e) this.subdom = e
            this.$QEdit.checksubdom(this.subdom).then(res =>{
                this.checking = false
                this.subdomok = res.data.okay
            })
        },
        submitsubdom() {
            this.$QEdit.submitsubdom(this.subdom, this.getuser.id).then(res => {
                if (res.data.user.subdom) {
                    this.proceed = true
                    this.$store.commit('IS_AUTHED', res.data.user)
                }
            })
        },
    },
    computed: {
        ...mapGetters(['getuser']),
    },
}
</script>

<style lang="sass" scoped>
.subdom-button-container
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    .first
        margin-left: 2.5px
    .second
        margin-right: 2.5px
.h6
    margin-bottom: 25px
.subsubmit
    width: 100%
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
    align-items: center
    .pre, .suf
        font-size: 1.3em
        display: flex
        align-items: center
        margin-bottom: 8px
        color: $medium-gray
    .pre
        margin-right: 5px
    .suf
        margin-left: 5px
    .icon
        display: flex
        align-items: center
        height: 40px
        width: 40px
        margin-bottom: 6px
    .bigx
        background: center / contain no-repeat url("/svg/times.svg")
        background-size: unset
    .tick
        background: center / contain no-repeat url("/svg/tick.svg")
        background-size: unset
</style>