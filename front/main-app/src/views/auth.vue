<template>
    <main class="auth-container">
        <section class="active-component-container">
            <router-view></router-view>
        </section>
    </main>
</template>

<script>
export default {
    name: 'auth',
}
</script>

<style scoped lang="sass">
.auth-container
    height: 100vh
    min-height: 800px
    display: flex
    flex-direction: column
    width: 100%
    justify-content: center
    align-items: center
.comp-switch
    display: flex
    flex-direction: row
    width: 100%
    .auth-switch
        width: 100%
.active-component-container
    width: 80%
    min-width: 400px
    margin-left: auto
    margin-right: auto
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
</style>