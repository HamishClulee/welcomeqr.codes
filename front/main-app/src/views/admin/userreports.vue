<template>
    <section>
        userreports

        <div v-for="(item, index) in dummy" :key="index">

            {{ item.name }}

        </div>

        {{ dummy[1].name }}
    </section>
</template>

<script>
export default {
    name: 'userreports',
    data() {
        return {
            dummy: [
                { name: 'john'}, undefined, { name: 'barry' },
            ],
        }
    },
}
</script>

<style lang="sass" scoped>

</style>