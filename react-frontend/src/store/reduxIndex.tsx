import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authRedux"


const store = configureStore({
    reducer: {
        authRedux: authReducer
    }
})


export type RootState = ReturnType<typeof store.getState>;

export default store;