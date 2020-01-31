import { State } from './state'

const getters = {
  windowWidth: (state: State) => state.windowWidth,
  windowHeight: (state: State) => state.windowHeight,
  scrollY: (state: State) => state.scrollY,
  isauthed: (state: State) => state.isauthed,
}

export default getters
