import { useNavigate } from "react-router"
import LoginLayout from "../components/LoginLayout";
import RegisterForm from "../components/RegisterForm";
import { createOne } from "../data/user_registration";
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256'

const Register = () => {
  const navigate = useNavigate()

  const doRegister = async (data) => {
    const createdUser = await createOne({ ...data, avatarUrl: DEFAULT_AVATAR, location: '' })
    if (createdUser) {
      alert('user create successfuly')
      navigate('/login');
      return
    }
    alert('error create user')
  }

  return (
    <LoginLayout>
      <RegisterForm onSubmit={doRegister} />
    </LoginLayout>

  )
}

export default Register