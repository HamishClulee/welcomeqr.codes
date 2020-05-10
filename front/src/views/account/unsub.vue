<template>
    <section class="unsub-container">
        <h6 class="h6">Click here to unsubscribe from all emails from Welcome QR Codes. You can turn them back on at any time.</h6>
        <p>You are currently {{ substatus }} all emails.</p>
        <qtoggle
            labelRight="subscribed"
            labelLeft="unsubscribe"
            name="emails"
            :emitparent="true"
        ></qtoggle>
    </section>
</template>

<script>
import qtoggle from '../../components/buttons/qtoggle'
export default {
    name: 'unsub',
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    components: {
        qtoggle,
    },
    data() {
        return {
            issubbed: true,
        }
    },
    mounted() {
        this.issubbed = this.user.allowsemails
        this.$on('toggle-changed', () => {
            this.issubbed = !this.issubbed
        })
    },
    computed: {
        substatus() {
            return this.issubbed ? 'subscribed to' : 'unsubscribed from' 
        },
    },
}
</script>

<style lang="sass" scoped>

</style>