<template>
    <main class="contact-page-container">
        <h1 class="h1">Contact Us</h1>
        <h5 class="h5-server">{{ servermsg }}</h5>
        <section class="contact-form">
            <qinput
                :fullwidth="true"
                placey="Your Email.."
                :errortxt="emailerror"
                eventname="emailchange"
                @emailchange="e => email = e"
                inptype="text"
            ></qinput>
            <qinput
                :fullwidth="true"
                placey="Your Name.."
                :errortxt="nameerror"
                eventname="namechange"
                @namechange="e => name = e"
                inptype="text"
            ></qinput>

            <div class="multi-container">
                <multiselect v-model="selectval" :options="selectopts"></multiselect>
            </div>

            <qtextarea
                :rows="10"
                :fullwidth="true"
                placey="Description..."
                :errortxt="msgerror"
                eventname="msgchange"
                @msgchange="e => msg = e"
                inptype="text"
            ></qtextarea>
            <button class="button" @click="submit()">Submit</button>
        </section>
    </main>
</template>

<script>
import qinput from '../components/forms/qinput'
import qtextarea from '../components/forms/qtextarea'
import multiselect from 'vue-multiselect'
export default {
    name: 'contact',
    components: {
        qinput, qtextarea, multiselect,
    },
    data() {
        return {
            selectval: '',
            selectopts: [
                'Bug Report',
                'Feature Request',
                'Account Issues',
                'Other...',
            ],
            emailerror: '',
            email: '',
            nameerror: '',
            name: '',
            msgerror: '',
            msg: '',
            servermsg: '',
        }
    },
    methods: {
        submit() {
            this.$QAuth.contact(this.email, this.name, this.msg, this.selectval).then(res => {
                this.servermsg = 'Thanks for contacting us'
                this.clearItems()
            })
        },
        clearItems() {
            this.email = ''
            this.name = ''
            this.msg = ''
            this.selectval = ''
        },
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="sass" scoped>
.contact-page-container
    height: 100vh
    min-height: 800px
    display: flex
    flex-direction: column
    width: 100%
    justify-content: center
    align-items: center
    .contact-form
        width: 600px
    .h5-server
        color: $primary
        min-height: 20px
    .multi-container
        margin-bottom: 25px
</style>