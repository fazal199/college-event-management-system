import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { userColumns } from "../../components/shared/Columns/userColumns"
import { DataTable } from "@/components/shared/DataTable"
import { orgRequestColumns as registeredOrganisersColumns } from "./DataTableColumns/orgRequestColumns"
import { confirmAlert, successAlert } from "@/lib/sweetalert/alerts"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { deleteData, getData, postData, putData } from "@/lib/react-query/apiFunctions"
import { checkForErrors } from "@/lib/utils"
import { useInternet } from "@/contexts/InterStatusWrapper"

const ManageUsersPage = () => {

  const { isInterConnected } = useInternet();
  const queryClient = useQueryClient();


  //fetching all users and orgainsers data
  const { data: allUsersData } = useQuery({
    queryKey: 'allusersandorgansiers',
    queryFn: () => getData({ endpoint: '/api/auth/getalluserandorganisers' }),
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching all users and organisers data! place:ManageUsersPage", error.message);
    }
  });

  //to update organiser permission
  const { mutate: updateOrgPermisson } = useMutation({
    mutationFn: putData,
    onSuccess: () => {
      successAlert({
        title: "Permission Updated!",
        text: "You have successfully Updated the Permission!",
      })
      queryClient.invalidateQueries("allusersandorgansiers");

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while updating oragniser permission! place:ManageUsersPage", error.message);
    }
  })


  const handleChangePermission = async (userId: any, permission: boolean) => {
    console.log(userId,permission);
    
    updateOrgPermisson({
      endpoint: `/api/auth/update/permission/${userId}?permission=${permission}`
    })

    return false;
  }

  console.log(allUsersData);
  
  const changePermission = (permission: boolean, userId: any) => {
    confirmAlert({
      confirmFunction: handleChangePermission, qtitle: "Are you Sure?", qtext: "Do you really want to change permission?", iconType: "warning", qconfirmtext: "Yes!", id: userId, data: permission, stitle: "Permission Changed!", stext: "Permission Has been Changed!"
    })
  }



  return (
    <div className='px-8 pt-5'>
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="box-content grid h-12 max-w-md grid-cols-2">
          <TabsTrigger className='py-2 text-lg ' value="users">Users</TabsTrigger>
          <TabsTrigger className='py-2 text-lg' value="orgainsers">Organisers</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <h1 className='mb-5 mt-16 text-4xl font-semibold text-center'>Registered Users</h1>
          <DataTable columns={userColumns} isSrno={true} data={allUsersData?.data?.usersData || []} messageForNoRecord='No Users Found!' />
        </TabsContent>
        <TabsContent value="orgainsers">
          <h1 className='mb-5 mt-16 text-4xl font-semibold text-center'>Registered Organisers</h1>
          <DataTable isSrno={true} changeActivityFunc={changePermission} isActivityAllowed={true} onRowClick="/admin/orginfo" columns={registeredOrganisersColumns} data={allUsersData?.data?.organisersData || []} isActions={false} messageForNoRecord='No Organisers Found!' />
        </TabsContent>

      </Tabs>
    </div>
  )
}

export default ManageUsersPage
