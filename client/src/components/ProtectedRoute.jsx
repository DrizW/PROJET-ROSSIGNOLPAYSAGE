import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const ProtectedRoute = (props) => {
    const user = useSelector(state => state.user)
    if (!user || !user.isAdmin) {
        return <Navigate to="/" replace />
    }

    return props.children
}
