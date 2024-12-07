import { useState } from 'react';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Mail, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useNavigate } from "react-router"


const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const LoginForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { isSubmitting, isValid } = form.formState;
  const navigate = useNavigate()

  return (
    <>
      <div className="text-center space-y-2 mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white">WAOW Log In</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
          <div className="space-y-2 relative">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field}
                      type="email"
                      placeholder="Email"
                      className="h-14 pl-4 pr-12 rounded-full bg-muted text-white placeholder:text-muted-foreground"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <Mail className="absolute right-4 top-2 h-6 w-6 text-muted-foreground" />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2 relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="h-14 pl-4 pr-12 rounded-full bg-muted text-white placeholder:text-muted-foreground"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-2 h-6 w-6 hover:bg-transparent"
                    disabled={isSubmitting}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword
                      ? <Eye className="h-6 w-6 text-muted-foreground" />
                      : <EyeOff className="h-6 w-6 text-muted-foreground" />
                    }
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                className="border-muted-foreground rounded"
                disabled={isSubmitting}
                onChange={() => setRemember(!remember)}
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground ml-2">
                Remember Me
              </Label>
            </div>

            <Button
              type="button"
              variant="link"
              className="px-0 text-muted-foreground"
              disabled={isSubmitting}
            >
              Forgot Password?
            </Button>
          </div>

          <div className="text-center pt-10">
            <Button
              type="submit"
              className="w-80 h-14 rounded-full"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting
                ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
                : <>
                  Login<ArrowRight />
                </>
              }
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              don't have account?{' '}
              <Button
                type="button"
                variant="link"
                className="px-1 text-primary hover:text-primary/80"
                disabled={isSubmitting}
                onClick={() => { navigate('/register') }}
              >
                Register
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </>
  )
}

export default LoginForm