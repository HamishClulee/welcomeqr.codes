import { State } from './state'

const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE'
const SET_SCROLL_LOCATION = 'SET_SCROLL_LOCATION'
const IS_AUTHED = 'IS_AUTHED'

const mutations = {

	IS_AUTHED: (state: State, is: boolean) => {

		state.isauthed = is

	},
	SET_WINDOW_SIZE: (state: State) => {

		state.windowWidth = window.innerWidth
		state.windowHeight = window.innerHeight

	},
	SET_SCROLL_LOCATION: (state: State) => {

		state.scrollY = window.scrollY

	}

}

export default mutations
