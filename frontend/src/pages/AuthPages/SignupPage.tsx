
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signUpSchemaforOrganiser, signUpSchemaforUser } from "@/lib/zod/signUpSchema"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { useDispatch, useSelector } from "react-redux"
import { setAuth } from "@/lib/redux/slices/authSlice"

export default function SignupPage() {


  const [isUser, setIsUser] = useState<boolean>(true);
  const { isInterConnected } = useInternet();
  const isLogin = useSelector((state: any) => state.auth?.isLogin);
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(isUser ? signUpSchemaforUser : signUpSchemaforOrganiser)
  })

  const signUpFields = [
    {
      fieldName: "username",
      labelName: "Username",
      placeholder: "Enter Your Username!",
    },
    {
      fieldName: "uemail",
      labelName: "Email",
      placeholder: "Enter Email!",
    },
    {
      fieldName: "upassword",
      labelName: "Password",
      placeholder: "Enter Password!",
    },
    {
      fieldName: "confirmPassword",
      labelName: "Confirm Password",
      placeholder: "Enter the password again!"
    },
    {
      fieldName: "organiserName",
      labelName: "Organiser's Name",
      placeholder: "Enter OrganiserName!",
    },
    {
      fieldName: "organiserPhone",
      labelName: "Organiser Phone No.",
      placeholder: "Enter Organiser Phone No.!",
    },
    {
      fieldName: "organiserUpiId",
      labelName: "Organiser UpiId",
      placeholder: "Enter Organiser UpiId!",
    },

  ]

  const { mutate, isLoading } = useMutation({
    mutationFn: postData,
    onSuccess: (response:any) => {
      successAlert({
        title: "SignUp Successfully!",
        text: "You have successfully signed up!",
      })

      localStorage.setItem("accessToken",response.data?.accessToken)

      if (isUser)
        navigate("/");
        


      else {
        navigate("/manage-events/yourevents");
      }

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while Registering the user! place:SignupPage", error.message);
    }
  })

  function onSignUpSubmit(values: any) {
    delete values.confirmPassword;
    values.isUser = isUser;
    mutate({
      endpoint: "/api/auth/register",
      payload: values
    })

  }

  useEffect(() => {

        if(isLogin)
            navigate("/");
    }, [isLogin])

  return (
    <section className="h-screen w-screen">
      <Card className="px-8 py-4 max-w-md mx-auto shadow-xl mt-10 h-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center mb-2">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSignUpSubmit)}>
              <div className="grid gap-4 space-y-2">
                {
                  signUpFields.slice(0, isUser ? 4 : signUpFields.length).map((signupField) => (
                    <FormField
                      key={signupField.fieldName}
                      control={form.control}
                      name={signupField.fieldName}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">{signupField.labelName}</FormLabel>
                          <FormControl>
                            <Input placeholder={signupField.placeholder} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))
                }

                <Button type="submit" className="w-full text-lg">
                  {!isLoading ? "Register" : "Loading..."}
                </Button>

              </div>
              <div className="mt-4 text-center text-sm space-y-2">

                <div>
                  <p className="inline-block">Register as a</p>
                  <span onClick={() => setIsUser(!isUser)} className="underline ml-1 font-semibold cursor-pointer">
                    {isUser ? "Orgainser" : "User"}!
                  </span>
                </div>
                <div>
                  <p className="inline-block">Already have an account?</p>
                  <Link to="/auth/signin" className="underline ml-1 font-semibold">
                    Sign in
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
