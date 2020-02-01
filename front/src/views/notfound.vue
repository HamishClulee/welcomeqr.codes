<template>
    <section class="not-found-con">
        <h1 class="h1">404</h1>
        <h2 class="h2">PAGE NOT FOUND</h2>
    </section>
</template>

<script>
export default {
  name: 'notfound',
}
</script>
<style scoped lang="sass">
.not-found-con
    margin-top: 50px
    min-height: 600px
    width: 95%
    min-width: 400px
    margin-left: auto
    margin-right: auto
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    .h2
        color: $medium-gray
</style>

