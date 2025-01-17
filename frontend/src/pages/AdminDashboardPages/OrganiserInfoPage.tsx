import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from "react-query"
import { checkForErrors } from "@/lib/utils"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { getData } from "@/lib/react-query/apiFunctions"
import { useParams } from 'react-router-dom'
const OrganiserInfoPage = () => {

  const { isInterConnected } = useInternet();

  const { userId } = useParams();
  //fetching all users and orgainsers data
  const { data: orgData } = useQuery({
    queryKey: 'orginfoforadmin',
    queryFn: () => getData({ endpoint: `/api/auth/getorganiser/${userId}` }),
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching organiser info. data! place:OrganiserInfoPage", error.message);
    }
  });


  return (
    <div className=" max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Organizer Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Name</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{orgData?.data?.name}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Username</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">@{orgData?.data?.username}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{orgData?.data?.email}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Phone Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{orgData?.data?.phoneno}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>UPI ID</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{orgData?.data?.upiId}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OrganiserInfoPage
