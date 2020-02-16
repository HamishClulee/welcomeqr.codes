<template>
    <div class="auth-item-container">

        <h2 class="h2">Login</h2>

        <qinput
            inptype="email"
            placey="Email"
            errortxt=""
            eventname="emailinput"
            @emailinput="(e) => email = e"
            :isrequired="true"
            :hasautocomplete="true">
        </qinput>
        
        <qinput
            inptype="password"
            placey="Password"
            errortxt=""
            eventname="passwordinput"
            @passwordinput="(e) => password = e"
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
import qAuth from '../../main'
export default {
    name: 'login',
    components: {
        qinput,
    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        submit () {
            qAuth.login(this.email, this.password).then(res => {
                this.$store.commit('IS_AUTHED', res.data.user)
                EventBus.$emit(MESSAGES, {
                    is: true,
                    msg: `You are now logged in! Welcome ${res.data.user.email}!`,
                    color: 'secondary',
                    black: false,
                })
            })
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