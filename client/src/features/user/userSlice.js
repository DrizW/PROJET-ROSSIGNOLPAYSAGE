import { createSlice } from '@reduxjs/toolkit'

const userLocal = localStorage.getItem('user')
let initialState

if (userLocal) {
    try {
        initialState = JSON.parse(userLocal)
    } catch (error) {
        console.error('Erreur de parsing du user depuis localStorage:', error)
        initialState = {}
    }
}
else {
    initialState = {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        // ici un reducer pour mettre à jour l'état de l'user et enregistrer l''user dans localstorage
        setUser: (state, action) => {
            Object.keys(action.payload).forEach(key => {
                state[key] = action.payload[key]
            })
            localStorage.setItem('user', JSON.stringify(state))
        },
        // ici reducer pour reinitialiser l'état de l'user et supprimer aussi l'user du localstorage
        unsetUser: (state) => {
            Object.keys(state).forEach(key => delete state[key])
            localStorage.removeItem('user')
        },
    },
})

export const { setUser, unsetUser } = userSlice.actions
export default userSlice.reducer
