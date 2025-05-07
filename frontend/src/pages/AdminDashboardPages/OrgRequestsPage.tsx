import { DataTable } from "@/components/shared/DataTable";
import { confirmAlert } from "@/lib/sweetalert/alerts";
import { orgRequestColumns } from "./DataTableColumns/orgRequestColumns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getData, putData } from "@/lib/react-query/apiFunctions";
import { useInternet } from "@/contexts/InterStatusWrapper";
import { checkForErrors } from "@/lib/utils";


const OrgRequestsPage = () => {

  const { isInterConnected } = useInternet();
  const queryClient = useQueryClient();

  //fetching languages data
  const { data: orgData, isLoading } = useQuery({
    queryKey: 'orgrequest',
    queryFn: () => getData({ endpoint: '/api/auth/orgrequest' }),
    onSuccess: () => {

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching orgRequest data! place:OrgRequestsPage", error.message);
    }
  });

  //to give or reject permission permission 
  const { mutate } = useMutation({
    mutationFn: putData,
    onSuccess: () => {
        queryClient.invalidateQueries("orgrequest");
    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while Deciding the permission for organiser! place:OrgRequestsPage", error.message);
    }
  })

  const allowPermissiontoOrg = async (id: any) => {
    mutate({
      endpoint: `/api/auth/orgrequest/permission/${id}?permission=true`
    })

    return false;
  }

  const notallowPermissiontoOrg = async (id: any) => {
    mutate({
      endpoint: `/api/auth/orgrequest/permission/${id}?permission=false`
    })
    return false;
  }

  const handleAllowPermissiontoOrg = (id: any) => {
    confirmAlert({ confirmFunction: allowPermissiontoOrg, qtitle: "Allowing Permission!", qtext: "Do you Really want to Allow Permission?", qconfirmtext: "Yes, Allow it!", stitle: "Permission Allowed!", stext: "The Organiser has been allowed to create events!", id })
  }

  const handleNotAllowPermissiontoOrg = (id: any) => {
    confirmAlert({ confirmFunction: notallowPermissiontoOrg, qtitle: "Cancel Organiser Request!", qtext: "Do you Really want to Cancel Permission?", qconfirmtext: "Yes, Cancel it!", stitle: "Permission Cancelled!", stext: "The Organiser can't create events!", id })
  }

  return (
    <div className='pt-10'>
      <h1 className='mb-5 text-4xl font-semibold text-center'>Manage New Organisers</h1>
      <DataTable columns={orgRequestColumns} deleteRecordFunction={handleNotAllowPermissiontoOrg} permissionAllowedFunction={handleAllowPermissiontoOrg} data={!isLoading && orgData.data} onRowClick="/admin/orginfo" isSrno={true} isPermissionActions={true} messageForNoRecord='No Organiers Requests Found!' />
    </div>
  )
}


export default OrgRequestsPage
