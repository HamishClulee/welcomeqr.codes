<template>
  <main class="pricing-con">
        <h1 class="h1">Pricing</h1>
        <h2 class="h2">How to choose the right package for your business.</h2>
        <section class="details-con">
            <div class="pricing-item">
                <h5 class="h5 title">Starter</h5>
                <div class="price">Free</div>
                <p class="description">
                    A free trial last two weeks, in which time you will have your welcome booklet available for viewing,
                    editing and QR code will be emailed to you only once.
                </p>
            </div>
            <div class="pricing-item">
                <h5 class="h5 title">Basic</h5>
                <div class="price">$20 usd</div>
                <p class="description">
                    Unlimited access, traffic and edits. QR code will be emailed to you on demand.
                </p>
            </div>
            <div class="pricing-item">
                <h5 class="h5 title">Deluxe</h5>
                <div class="price">$30 usd</div>
                <p class="description">
                    Unlimited access, traffic and edits. QR code will be emailed to you on demand.
                    You will also get access to multiple pages, and advanced themeing and display helpers
                </p>
            </div>
            <div class="pricing-item">
                <h5 class="h5 title">Enterprise</h5>
                <div class="price">By arrangement</div>
                <p class="description">
                    If your have more than one property or would like to arrange some more bespoke, please <a href="/contact">contact us</a>.
                </p>
            </div>
        </section>
  </main>
</template>

<script>
export default {
    name: 'pricing'
}
</script>

<style scoped lang="sass">
.h1
    font-size: 2.3em
    margin-bottom: 0px
.h2
    font-size: 1.8em
    color: $medium-gray
.pricing-con
    margin-top: 50px
    min-height: 800px
    width: 95%
    min-width: 400px
    margin-left: auto
    margin-right: auto
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    .pricing-item
        margin-top: 10px
        margin-bottom: 40px
    .title
        color: $primary
    .price
        color: $secondary
        font-family: $heading-font
        font-size: 2em
    .description
        font-family: sans-serif
        font-size: 1em
</style>