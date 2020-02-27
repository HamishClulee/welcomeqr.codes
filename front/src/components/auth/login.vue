<template>
    <div class="auth-item-container">

        <h2 class="h2">Login</h2>

        <qinput
            inptype="email"
            placey="Email"
            :errortxt="emailerror"
            eventname="emailinput"
            @emailinput="validateemail"
            :isrequired="true"
            :hasautocomplete="true">
        </qinput>
        
        <qinput
            inptype="password"
            placey="Password"
            :errortxt="passerror"
            eventname="passwordinput"
            @passwordinput="validatepassword"
            :isrequired="true"
            :hasautocomplete="true">
        </qinput>

        <div class="button-container">

            <div class="google-btn" style="width: 100%;">
                <div class="google-icon-wrapper">
                    <img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>
                <p class="btn-text"><b>Continue with Google</b></p>
            </div>

            <button class="button submit" @click="submit">SUBMIT</button>

            <p @click="$emit('wantssignup')">Don't have an account? <a>Sign Up here.</a></p>

        </div>

    </div>
</template>

<script>
import qinput from '../forms/qinput'
import { EventBus, MESSAGES, LOADING } from '../../EventBus'
export default {
    name: 'login',
    components: {
        qinput,
    },
    data() {
        return {
            email: '',
            password: '',
            emailerror: '',
            passerror: '',
        }
    },
    created () {
        EventBus.$emit(LOADING, true)
        this.$QAuth.authenticate().then(res => { 
            this.$store.commit('IS_AUTHED', res.data.user)
            this.$router.push({ path: '/app/manage' })
            EventBus.$emit(MESSAGES, {
                is: true,
                msg: `You are now already logged in as ${res.data.user.email}!`,
                color: 'secondary',
                black: false,
            })
            EventBus.$emit(LOADING, false)
        })
    },
    methods: {
        submit () {
            this.$QAuth.login(this.email, this.password).then(res => {
                this.$store.commit('IS_AUTHED', res.data.user)
                EventBus.$emit(MESSAGES, {
                    is: true,
                    msg: `You are now logged in! Welcome ${res.data.user.email}!`,
                    color: 'secondary',
                    black: false,
                })
                this.$router.push({ path: '/app/manage' })
            })
        },
        validateemail(e) {
            const reg = /^\S+@\S+$/
            this.email = e
            if (!reg.test(this.email)) this.emailerror = 'That email address looks funny, did you type if correctly?'
            else this.emailerror = ''
        },
        validatepassword(e) {
            this.password = e
            if (this.password.length < 8) this.passerror = 'Password needs to be at least 8 characters long...'
            else this.passerror = ''
        },
    },
}
</script>

<style lang="sass" scoped>
.h2
    margin-bottom: 40px
.auth-item-container
    width: 100%
    max-width: 500px
.submit
    width: 100%
    margin: 5px 0
.google-btn 
    height: 42px
    background-color: white
    border-radius: 2px
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .2)
    cursor: pointer
    align-self: center
    user-select: none
    transition: all 400ms ease 0s
    justify-content: center
    display: flex
    flex-direction: row
.google-btn .google-icon-wrapper 
    position: relative
    margin-top: 1px
    margin-left: 1px
    height: 40px
    border-radius: 2px
    user-select: none
.google-btn .google-icon-svg 
    position: absolute
    margin-top: 11px
    margin-left: 11px
    width: 18px
    height: 18px
    user-select: none
.google-btn .btn-text 
    margin: 10px 14px 40px 40px
    color: $medium-gray
</style>