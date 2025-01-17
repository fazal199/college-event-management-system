import { DataTable } from "@/components/shared/DataTable"
import { confirmAlert, editAlert, successAlert } from "@/lib/sweetalert/alerts"
import { languagesColumn } from "./DataTableColumns/languageColumn"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { deleteData, getData, postData, putData } from "@/lib/react-query/apiFunctions"
import { checkForErrors } from "@/lib/utils"
import { useInternet } from "@/contexts/InterStatusWrapper"

const ManageLanguagesPage = () => {

  const [newLanguage, setNewLanguage] = useState("");
  const [noLanguage, setNoLanguage] = useState(false);
  const { isInterConnected } = useInternet();
  const queryClient = useQueryClient();



  //fetching language data
  const { data: languageData } = useQuery({
    queryKey: 'languages',
    queryFn: () => getData({ endpoint: '/api/languages/all' }),
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching languages data! place:ManageLanguages", error.message);
    }
  });

  //  to add a new language
  const { mutate, isLoading: creatingLoading } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      successAlert({
        title: "Language Added!",
        text: "You have successfully Added a New Language",
      })
      queryClient.invalidateQueries("languages");

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while adding new language! place:ManageLanguages", error.message);
    }
  })

  //  to update a language
  const { mutate:updateMutate } = useMutation({
    mutationFn: putData,
    onSuccess: () => {
      successAlert({
        title: "Language Updated!",
        text: "You have successfully Updated the Language",
      })
      queryClient.invalidateQueries("languages");

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while updating the language! place:ManageLanguages", error.message);
    }
  })

   //to delete a categorie
   const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      successAlert({
        title: "Language Deleted!",
        text: "You have successfully Deleted the Language!",
      })
      queryClient.invalidateQueries("languages");

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while deleting language! place:ManageLanguages", error.message);
    }
  })

  const handleAddLanguage = async () => {

    if (!newLanguage) {
      setNoLanguage(true);
      return;
    }

    mutate({
      endpoint: "/api/languages/create",
      payload: {
        languagename: newLanguage
      }
    })
  }

  const handleDeleteLanguage = async (languageId: any) => {
    deleteMutate({
      endpoint: `/api/languages/delete/${languageId}`
    })
    return false;
  }

  const handleEditLanguage = async (id: any, newValue: string) => {
    updateMutate({
      endpoint: "/api/languages/update",
      payload: { languageId: id, languagename: newValue },
    })
    return false;
  }

  const editLanguage = (id: any) => {
    editAlert({ editFunction: handleEditLanguage, title: "Language", text: "Update the Language!", id, inputPlaceholder: "Write new Language here..", inputType: "text", confirmButtonText: "Update", stext: "Language Updated Successfully!", stitle: "Language Updated!" })
  }

  const deleteCategory = (languageId: any) => {
    confirmAlert({
      confirmFunction: handleDeleteLanguage, qtitle: "Are you Sure?", iconType: "warning", qconfirmtext: "Yes, Delete It!", id: languageId, stitle: "Operation Successful!", stext: "Language Has been Deleted!", qtext: "This action won't be Revert!"
    })
  }

  return (
    <div className='pt-10'>
      <h1 className='mb-5 text-4xl font-semibold text-center'>Manage Languages</h1>
      <div className="max-w-6xl pb-4 flex gap-5 mt-16 justify-center items-center mx-auto">
        <Input
          type="text"
          placeholder="Enter category name"
          value={newLanguage}
          onChange={(e) => {
            setNewLanguage(e.target.value)
            setNoLanguage(false)
          }}
          className="flex-grow max-w-sm"

        />
        <Button onClick={handleAddLanguage}>
          <PlusCircle className="mr-2 h-4 w-4" />
         {!creatingLoading ?  "Add Language" : "Loading..."}
        </Button>
      </div>
      <div className="max-w-xl mx-auto mb-5">
        {noLanguage && <p className="text-left px-4 text-sm text-red-600">Plzz Provide Language!</p>}
      </div>
      <DataTable columns={languagesColumn} editRecord={editLanguage} isSrno={true} data={languageData?.data || []} isActions={true} deleteRecordFunction={deleteCategory} messageForNoRecord='No Languages Found!' />

    </div>
  )
}

export default ManageLanguagesPage
