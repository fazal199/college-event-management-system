
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import signInSchema from "@/lib/zod/signInSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "react-query"
import { postData } from "@/lib/react-query/apiFunctions"
import { successAlert } from "@/lib/sweetalert/alerts"
import { checkForErrors } from "@/lib/utils"
import { useInternet } from "@/contexts/InterStatusWrapper"

export default function SigninPage() {

  const form = useForm({
    resolver: zodResolver(signInSchema)
  })

  const navigate = useNavigate();

  const { isInterConnected } = useInternet();

  const { mutate, isLoading } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      successAlert({
        title: "Login Successfully!",
        text: "You have successfully LoggedIn!",
      })
      navigate("/");

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while Loggin the user! place:SigninPage", error.message);
    }
  })


  function onSignInSubmit(values: any) {

    mutate({
      endpoint: "/api/auth/login",
      payload: values
    })

  }

  const signInFields = [
    {
      fieldName: "uemail",
      labelName: "Email",
      placeholder: "Enter Your Email!",
    },
    {
      fieldName: "upassword",
      labelName: "Password",
      placeholder: "Enter Your Password!",
    }

  ]

  return (
    <section className="h-screen w-screen pt-28">
      <Card className="mx-auto max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center mb-2">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your information to Login.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignInSubmit)}>
              <div className="grid gap-4 space-y-2">
                {
                  signInFields.map((signinField) => (
                    <FormField
                      key={signinField.fieldName}
                      control={form.control}
                      name={signinField.fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">{signinField.labelName}</FormLabel>
                          <FormControl>
                            <Input placeholder={signinField.placeholder} {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))
                }

                <Link to="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
                <Button type="submit" className="w-full text-lg">
                 {
                   !isLoading ? "Login" : "Loading..." 
                 }
                </Button>

              </div>
              <div className="mt-4 text-center text-sm space-y-2">


                <div>
                  <p className="inline-block">Don't have an account?</p>
                  <Link to="/auth/signup" className="underline ml-1 font-semibold">
                    Signup!
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}
