import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { organiserProfileSchema } from '@/lib/zod/organiserProfileSchema'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery } from "react-query"
import { getData, putData } from "@/lib/react-query/apiFunctions"
import { successAlert } from "@/lib/sweetalert/alerts"
import { checkForErrors } from "@/lib/utils"
import { onlyUpdateOrganiserData } from '@/lib/redux/slices/authSlice'
import { useInternet } from '@/contexts/InterStatusWrapper'


const OrganiserProfilePage = () => {
  const dispatch = useDispatch();
  const { isInterConnected } = useInternet();

  const form = useForm({
    resolver: zodResolver(organiserProfileSchema),
    defaultValues: {
      organiserName: '',
      organiserPhone: '',
      organiserUpiId: '',
    }
  });

  // Fetch organiser data from API
  const { data: organiserData, isLoading: isFetching } = useQuery({
    queryKey: 'organiserData',
    queryFn: () => getData({ endpoint: '/api/auth/user' }),
    onSuccess: (response) => {
      const { organisername, phoneno, upiId } = response.data?.data?.organiserData;
      form.reset({
        organiserName: organisername,
        organiserPhone: phoneno,
        organiserUpiId: upiId,
      });
    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching organiser data! place:OrganiserProfilePage", error.message);
    }
  });

  // Mutation to handle form submission
  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: putData,
    onSuccess: async (response) => {
      successAlert({
        title: "Data Updated!",
        text: "Your Data successfully Updated!",
      });

      // Fetch updated data and update the redux state
      dispatch(onlyUpdateOrganiserData(response.data));
      form.reset({ organiserName: response.data.organisername, organiserPhone: response.data.phoneno, organiserUpiId: response.data.upiId });
    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while updating organiser data! place:OrganiserProfilePage", error.message);
    }
  });

  // Handle form submission
  const onOrganiserProfileSubmit = (values: any) => {
    mutate({ endpoint: "/api/auth/update/organiser", payload: values });
  };

  // Reusable function to render form fields
  const renderFormField = (name: string, label: string) => (
    <FormField
      key={name}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">{label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  console.log(organiserData);

  return (
    <div>
      <h1 className='my-6 text-4xl font-semibold text-center'>Hello, {organiserData?.data?.data?.username}👋</h1>
      <Card className="h-auto max-w-sm px-4 mx-auto shadow-xl my-7">
        <CardHeader>
          <CardTitle className="block mt-2 text-2xl text-center">Your Profile</CardTitle>
          <CardDescription className="block !mt-4 text-center">
            Update Your Data Here.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onOrganiserProfileSubmit)}>
              <div className="grid gap-4 space-y-2">

                {isFetching ? (
                  <p>Loading...</p> // Add a loading state while fetching the data
                ) : (
                  <>
                    {renderFormField('organiserName', 'Organiser Name')}
                    {renderFormField('organiserPhone', 'Organiser Phone no.')}
                    {renderFormField('organiserUpiId', 'Organiser UpiId')}

                    <Button type="submit" className="w-full text-lg">
                      {isSubmitting ? "Loading..." : "Update"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganiserProfilePage;