import { Signup as SignupPage } from 'pages/Signup'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
  const navigate = useNavigate()

  return <SignupPage navigate={navigate} />
}
