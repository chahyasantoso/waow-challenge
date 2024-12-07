import { useNavigate, Navigate } from 'react-router'
import { useAuth } from "@/hooks/useAuth"
import { Button } from '@/components/ui/button'
import { Navbar } from '../components/Navbar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'

const Home = () => {
  const { isLoading, user } = useAuth()

  if (!isLoading && !user) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Navbar />
      <main className="container w-full flex flex-col items-center justify-center mx-auto min-h-screen">

        <h1 className="text-4xl font-bold"></h1>

        <Card className="w-[350px] mt-5">
          <CardHeader>
            <CardTitle>{isLoading || !user ? "Loading" : `Hello ${user.username}`}</CardTitle>
          </CardHeader>
        </Card>
      </main>
    </>

  )
}

export default Home