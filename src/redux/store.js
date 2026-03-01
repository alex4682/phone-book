import {Slice} from './reducer'
import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({
    reducer: Slice.reducer
})


export default store;