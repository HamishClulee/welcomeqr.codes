<template>
    <div class="signup-container">
        <loading v-if="loading"></loading>
        <template v-else>
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
        </template>
        
    </div>
</template>

<script>
import SERVER from '../../../api'
import isAuthed from '../../../api/auth'
import loading from '../../loading'
export default {
    name: 'signup',
    components: {
        loading
    },
    data () {

        return {
            message: '',
            auth: false,
            loading: true
        }

    },
    mounted () {

        isAuthed(this.yup, this.nup).then(() => {

            this.loading = false

        })

    },
    methods: {
        test(path) {

            SERVER.post(`/${path}`, {
                'email': 'ham2@ham.com',
                'password': 'testtest',
                'confirmPassword': 'testtest'
            })
            .then(yup => { 
                
                this.message = yup 
                
            })
            .catch(nup => { 
                
                this.message = nup 
                
            })

        },
        yup () {

            this.auth = true

        },
        nup () {

            this.auth = false

        }
    }
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
    font-size: 4em
</style>