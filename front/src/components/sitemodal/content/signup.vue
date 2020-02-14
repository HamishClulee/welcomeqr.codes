<template>
    <div class="signup-container">
        <div class="field-container">
            <label class="placey-text">NAME</label>
            <input type="text" class="form-control" placeholder="Name">
        </div>
        <div class="field-container">
            <label class="placey-text">URL</label>
            <input type="url" class="form-control" placeholder="URL">
        </div>

        <div class="message">
            {{ message }}
        </div>

        <div class="auth">
            {{ auth ? 'AUTHED' : 'NOT-AUTHED' }}    
        </div>

        <div class="modal-footer">
            <slot name="footer">
                <button type="submit" class="button" @click="test('login')">LOGIN</button>
                <button type="submit" class="button" @click="test('signup')">SIGNUP</button>
                <button type="submit" class="button" @click="test('logout')">LOGOUT</button>
            </slot>
        </div>
    </div>
</template>

<script>
import SERVER from '../../../api'
import { EventBus, MESSAGES } from '../../../EventBus'
export default {
    name: 'signup',
    data() {

        return {
            message: '',
            auth: false,
            loading: true,
        }

    },
    mounted() {
        
    },
    methods: {
        test(path) {

            SERVER.post(`/${path}`, {
                'email': 'ham9999@ham.com',
                'password': 'testtest',
                'confirmPassword': 'testtest',
            })
                .then(yup => { 
                
                    this.message = yup
                    EventBus.$emit(MESSAGES, {
                        is: true,
                        msg: `Welcome back ${ yup.data.user.email }! you are now logged in`,
                        color: 'secondary',
                        black: false,
                    })
                
                })
                .catch(nup => { 
                
                    this.message = nup 
                
                })

        },
        yup(data) {
            this.auth = true
            this.message = data.data.user.email
        },
        nup() { this.auth = false },
    },
}
</script>

<style lang="sass" scoped>
.message
    font-family: $body-font
    padding: 2em
.auth
    font-family: $body-font
    padding: 2em
    color: $primary
    font-size: 2em
</style>