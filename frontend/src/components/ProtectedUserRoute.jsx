import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedUserRoute = ({ children }) => {
  const { user } = useSelector((s) => s.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])

  return <>{children}</>
}

export default ProtectedUserRoute
