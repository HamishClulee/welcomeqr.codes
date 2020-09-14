<template>
    <section class="admin-main-container">
        <div class="admin-tabs-container">
            <div
                class="admin-tab-item" 
                @click="$router.push({ name: 'admin-main' })"
                :class="$route.name === 'adminmain' ? 'active' : 'inactive'"
            >Server Logs</div>
            <div
                class="admin-tab-item"
                @click="$router.push({ name: 'client-logs' })"
                :class="$route.name === 'client-logs' ? 'active' : 'inactive'"
            >Client Logs</div>
            <div
                class="admin-tab-item"
                @click="$router.push({ name: 'user-report' })"
                :class="$route.name === 'user-report' ? 'active' : 'inactive'"
            >Users</div>
        </div>

        <section class="server-logs-container">

            <section class="controls-container">

                <section class="category-container">
                    <h6>Filter Logs By Category</h6>
                    <span class="categories-actual">
                        <span 
                            class="category-item category-error"
                            :class="activeLevel === 'ERROR' ? 'active-cat' : 'inactive-cat'"
                            @click="setActiveLevel('ERROR')"
                        >ERROR</span>
                        <span 
                            class="category-item category-info" 
                            :class="activeLevel === 'INFO' ? 'active-cat' : 'inactive-cat'"
                            @click="setActiveLevel('INFO')"
                        >INFO</span>
                        <span 
                            class="category-item category-warning" 
                            :class="activeLevel === 'WARNING' ? 'active-cat' : 'inactive-cat'"
                            @click="setActiveLevel('WARNING')"
                        >WARNING</span>
                        <span 
                            class="category-item category-none"
                            :class="activeLevel === null ? 'active-cat' : 'inactive-cat'"
                            @click="setActiveLevel(null)"
                        >NONE</span>
                    </span>
                </section>


                <section class="log-list-container">
                    <h6>Get Specific Date</h6>
                    <multiselect
                        v-model="selectval"
                        :options="loglist"
                    ></multiselect>
                </section>
            </section>


            <table>
                <thead>
                    <tr>
                        <th>Date Time</th>
                        <th>Level</th>
                        <th>Category</th>
                        <th>Body</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody v-if="dayslog.length > 0">
                    <tr 
                        v-for="(item, index) in dayslog" 
                        :key="index" 
                        :class="`item-${item.level.toLowerCase()}`"
                    >
                        <template v-if="!activeLevel || activeLevel === item.level">
                            <td>{{ item.datetime }}</td>
                            <td>{{ item.level }}</td>
                            <td>{{ item.category }}</td>
                            <td>{{ item.body }}</td>
                            <td>{{ item.tags }}</td>
                        </template>
                    </tr>
                </tbody>
                <div v-else>No Logs for that date.</div>
            </table>

        </section>
    </section>
</template>

<script>
import { transform, ensureclean } from './transformlogs'
import multiselect from 'vue-multiselect'
export default {
    name: 'adminmain',
    components: {
        multiselect,
    },
    data () {
        return {
            activeLevel: 'ERROR',
            loglist: [],
            dayslog: [],
            selectval: '',
        }
    },
    mounted () {

        this.getLogs()

        this.$QAdmin.getalllogfilenames().then(res => {
            this.loglist = ensureclean(res.data.content)
        })
    },
    methods: {
        setActiveLevel(level) {
            this.activeLevel = level
        },
        getLogs() {
            this.dayslog = []
            this.$QAdmin.getlogbyday(this.selectval).then(res => {
                this.dayslog = transform(res.data.content)
            })
        },
    },
    watch: {
        selectval: function(ol, ne) {
            this.$nextTick(() => {
                this.getLogs()
            })
        },
    },
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

<style lang="sass" scoped>
.controls-container
    display: flex
    flex-direction: row
    margin: 20px 0
.log-list-container
    display: flex
    flex-direction: column
    margin-left: 20px
    width: 400px
.category-container
    display: flex
    flex-direction: column
.categories-actual
    display: flex
    flex-direction: row
.category-item
    cursor: pointer
    border-radius: 5px
    padding: 10px 20px
    margin-right: 10px
.category-item.active-cat
    background: lighten($link, 40)
.category-item.inactive-cat
    background: white
.category-none
    border: 2px solid $font
.category-info
    border: 2px solid $secondary
.category-warning
    border: 2px solid $highlight
.category-error
    border: 2px solid $tertiary
.item-info
    border-bottom: 2px solid $secondary
.item-warning
    border-bottom: 2px solid $highlight
.item-error
    border-bottom: 2px solid $tertiary
.admin-main-container
    min-height: 80vh
    width: 98%
    margin: 50px auto
    min-width: 400px
    display: flex
    flex-direction: column
.admin-tabs-container
    margin-top: 30px
    width: 100%
    height: 56px
    display: flex
    flex-direction: row
    align-items: center
    border-bottom: 1px solid $medium-gray
.server-logs-container
    display: flex
    flex-direction: column
.log-item
    padding: 20px
    border-bottom: 1px solid $medium-gray
.admin-tab-item
    padding: 15px 30px
    border-left: 1px solid $medium-gray
    border-right: 1px solid $medium-gray
    border-bottom: 1px solid $medium-gray
    border-radius: 5px 5px 0 0
    width: 150px
.active
    border-top: 3px solid $secondary
    cursor: not-allowed
.inactive
    border-top: 3px solid $medium-gray
    cursor: pointer
</style>