import { useState } from 'react';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Mail, Loader2, ArrowRight, Phone } from 'lucide-react';
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
import { useNavigate } from 'react-router';

const formSchema = z.object({
  firstName: z.string().min(3, "First name must be at least 3 characters"),
  lastName: z.string().min(3, "Last name must be at least 3 characters"),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const RegisterForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  })
  const { isSubmitting, isValid } = form.formState;
  const navigate = useNavigate()

  return (
    <>
      <div className="text-center space-y-2 mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white">WAOW Register</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field}
                      type="text"
                      placeholder="First Name"
                      className="h-14 pl-4 pr-12 rounded-full bg-muted text-white placeholder:text-muted-foreground"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field}
                      type="text"
                      placeholder="Last Name"
                      className="h-14 pl-4 pr-12 rounded-full bg-muted text-white placeholder:text-muted-foreground"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field}
                      type="tel"
                      placeholder="Phone"
                      className="h-14 pl-4 pr-12 rounded-full bg-muted text-white placeholder:text-muted-foreground"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <Phone className="absolute right-4 top-2 h-6 w-6 text-muted-foreground" />
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

          <div className="text-center pt-5">
            <Button
              type="submit"
              className="w-80 h-14 rounded-full"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting
                ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
                : <>
                  Register<ArrowRight />
                </>
              }
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Have an account?{' '}
              <Button
                type="button"
                variant="link"
                className="px-1 text-primary hover:text-primary/80"
                disabled={isSubmitting}
                onClick={() => { navigate('/login') }}
              >
                Login
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </>
  )
}

export default RegisterForm