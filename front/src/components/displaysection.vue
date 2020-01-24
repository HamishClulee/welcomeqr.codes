<template>
  <section class="section display-section-container" :class="sassclass">
      <slot></slot>
  </section>
</template>

<script>
export default {
    name: 'displaysection',
    props: {
        sassclass: {
            required: true,
            type: String
        }
    }
}
</script>

<style lang="sass" scoped>
.display-section-container
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    height: 100vh
    min-height: 800px
    padding: 0 10%
.primary
    background-color: $primary
    color: white
.secondary
    background-color: $secondary
    color: white
.tertiary
    background-color: $tertiary
    color: white
.highlight
    background-color: $highlight
    color: white
</style>