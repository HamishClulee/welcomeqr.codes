import { State } from '@I/IState'
import qAuth from '../main'

const getters = {
    windowWidth: (state: State) => state.ui.windowWidth,
    windowHeight: (state: State) => state.ui.windowHeight,
    scrollY: (state: State) => state.ui.scrollY,
    isauthed: (state: State) => state.user.authed,
}

export default getters
