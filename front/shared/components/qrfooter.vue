<template>
    <footer class="qr-footer">
        <figure class="logo-container">
            <img
                src="https://welcomeqr.codes/svg/largelogo.svg"
                alt="Welcome QR logo"
                width="100%"
            />
        </figure>
        <div class="tilde-spacer">~</div>
        <div class="text-container">
            <h4 class="h4">Welcome QR Codes</h4>
        </div>
        <div class="tilde-spacer">~</div>
        <div class="text-container sub">
            <h4 class="h4">Be modern</h4>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'qrfooter',
}
</script>

<style lang="sass" scoped>
.qr-footer
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    width: 98%
    min-width: 400px
    margin-left: auto
    margin-right: auto
    height: 10vh
    min-height: 400px
    .logo-container
        width: 20%
        display: flex
        max-height: 200px
        margin-right: 2em
    .text-container
        display: flex
    .tilde-spacer
        display: flex
        align-items: center
        justify-content: center
        font-size: 2.5em
        color: $light-gray
    .sub
        color: $medium-gray
</style>