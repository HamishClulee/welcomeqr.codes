import Vue from 'vue'
export const EventBus = new Vue()

EventBus.$on('opensitemodal', () => {

    console.log("Event Bus Fired")

})