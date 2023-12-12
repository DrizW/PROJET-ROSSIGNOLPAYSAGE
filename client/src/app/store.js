import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
import userReducer from '../features/user/userSlice'

export default configureStore({
    reducer: {
        // On ajoute le reducer en récupérant le reducerPath et le reducer depuis apiSlice
        [apiSlice.reducerPath]: apiSlice.reducer,

                // On ajoute le reducer du user
                'user': userReducer,

    },
    
    // On ajoute aussi le middleware
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
})