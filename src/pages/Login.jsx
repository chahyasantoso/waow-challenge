import { useNavigate, Navigate } from "react-router"
import { useAuth } from "@/hooks/useAuth"
import LoginLayout from "../components/LoginLayout";
import LoginForm from "../components/LoginForm";
import { getOneByEmail } from "../data/user_registration";


const Login = () => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const doLogin = async (data) => {
    try {
      const userLogin = await getOneByEmail(data.email)
      if (!userLogin || userLogin.password !== data.password) {
        return alert('Invalid email or password!');
      }
      setUser({
        email: userLogin.email,
        username: `${userLogin.firstName} ${userLogin.lastName}`,
        avatarUrl: userLogin.avatarUrl
      });
      navigate('/profile');

    } catch (error) {
      console.error(error)
    }
  }

  if (user) {
    return <Navigate to="/profile" replace />
  }

  return (
    <LoginLayout>
      <LoginForm onSubmit={doLogin} />
    </LoginLayout>

  )
}

export default Login