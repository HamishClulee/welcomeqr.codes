<template>
    <div class="fakebody page-container wide">
        <div class="actual-html" v-html="html">
            <!-- HTML here -->
        </div>
        <div class="instructions layout-col layout-center-all">
            <h1>Instructions</h1>
            <img class="img-cont" src="/img/templateNames.png" />

            <div class="all-controls layout-row layout-center-all">
                <div class="item-container layout-center-all layout-col" v-for="(item, index) in inputnames" :key="index">
                    <label :for="item.name">{{ item.name }}</label>
                    <input v-if="item.type === 'text'" v-model="item.val" type="text" :name="item.name" />
                    <textarea v-else v-model="item.val" type="text" :name="item.name" />
                </div>
            </div>
            <button class="button primary" @click="sendIt">SUBMIT</button>

            <div class="page-container restrict"><code v-if="html !== null"><pre>{{ html }}</pre></code></div>
        </div>
    </div>
</template>
<script>
// interface TemplateConfig {
//     preheader: string,
//     logoHref: string,
//     logoSrc: string,
//     heroHeadingText: string,
//     emailBodyText: string,
//     ctaButtonHref: string,
//     ctaButtonText: string,
//     finalContentText: string,
//     afterBodyText: string,
//     unsubHref: string,
// }
export default {
    name: 'testhtml',
    data() {
        return {
            html: null,
            inputnames: [
                {
                    name: 'preheader',
                    val: '',
                    type: 'textarea',
                },
                {
                    name: 'logoHref',
                    val: '',
                    type: 'text',
                    isUrl: true,
                },
                {
                    name: 'logoSrc',
                    val: '',
                    type: 'text',
                    isUrl: true,
                },
                {
                    name: 'heroHeadingText',
                    val: '',
                    allowsHtml: true,
                    type: 'textarea',
                },
                {
                    name: 'emailBodyText',
                    val: '',
                    allowsHtml: true,
                    type: 'textarea',
                },
                {
                    name: 'ctaButtonHref',
                    val: '',
                    isUrl: true,
                    type: 'text',
                },
                {
                    name: 'ctaButtonText',
                    val: '',
                    allowsHtml: true,
                    type: 'text',
                },
                {
                    name: 'finalContentText',
                    val: '',
                    allowsHtml: true,
                    type: 'textarea',
                },
                {
                    name: 'afterBodyText',
                    val: '',
                    allowsHtml: true,
                    type: 'textarea',
                },
                {
                    name: 'unsubHref',
                    val: '',
                    isUrl: true,
                    type: 'text',
                },
            ],
        }
    },
    mounted() {
        // {
        //     preheader: 'Yo yo yo - gabba gabba gabba bich face',
        //     logoHref: 'https://more-art-than.science',
        //     logoSrc: 'https://more-art-than.science/images/0.jpeg',
        //     heroHeadingText: 'Welcome to this awesome thing g',
        //     emailBodyText: 'Im amazed weve come this far, throught the good times and bad times, its really fucking amazing...',
        //     ctaButtonHref: 'https://more-art-than.science/cv',
        //     ctaButtonText: 'M~A~T~S~',
        //     finalContentText: 'Just one more thing before you go to bed.... carrots are good for your vision.',
        //     afterBodyText: 'hey fine print here stepright up bro',
        //     unsubHref: 'https://welcomeqr.codes/account',
        // }
    },
    methods: {
        sendIt() {
            this.$QEdit.buildEmailTemplate(this.buildPayLoad).then(res => {
                this.html = res.data.content
            })
        },
    },
    computed: {
        buildPayLoad () {
            let final = {}
            this.inputnames.forEach(element => {
                final[element.name] = element.val
            })
            return final
        },
    },
}
</script>
<style lang="css" scoped>
.fakebody {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 80px 0 0 0 !important;
    background: white;
}
</style>
<style lang="sass" scoped>
.restrict
    border: 3px solid #adadad
    border-radius: 5px
    overflow-y: scroll
    padding: 20px
    background: #efefef
    width: 90% !important
    margin: 20px
input, textarea
    width: 100%
    padding: 12px 20px
    margin: 8px 0
    display: inline-block
    border: 1px solid #ccc
    border-radius: 4px
    box-sizing: border-box
label
    color: $secondary
textarea
    width: 100%
.item-container
    width: 700px
    margin: 10px
.all-controls
    flex-wrap: wrap
.img-cont
    margin: 0 auto
    width: 30%
.instructions
    border-top: 3px solid $tertiary
</style>
  