import { DataTable } from "@/components/shared/DataTable"
import { confirmAlert, editAlert, successAlert } from "@/lib/sweetalert/alerts"
import { categoryColumns } from "./DataTableColumns/categoriesColumn"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { checkForErrors } from "@/lib/utils"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { deleteData, getData, postData, putData } from "@/lib/react-query/apiFunctions"
import { useState } from "react"


const MangeCategoriesPage = () => {

  const { isInterConnected } = useInternet();
  const [newCategory, setNewCategory] = useState("");
  const [noCategory, setNoCategory] = useState(false);
  const queryClient = useQueryClient();

  //fetching category data
  const { data: categoryData } = useQuery({
    queryKey: 'categories',
    queryFn: () => getData({ endpoint: '/api/categories/all' }),
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching categories data! place:ManageCategoriesPage", error.message);
    }
  });

  //  to add a new categorie
  const { mutate, isLoading: creatingLoading } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      successAlert({
        title: "Category Created!",
        text: "You have successfully Created a New Category",
      })
      queryClient.invalidateQueries("categories");

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while creating new category! place:MangeCategoriesPage", error.message);
    }
  })
  //  to update a categorie
  const { mutate: updateMutate } = useMutation({
    mutationFn: putData,
    onSuccess: () => {
      successAlert({
        title: "Category Updated!",
        text: "You have successfully Update Category!",
      })
      queryClient.invalidateQueries("categories");

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while updating category! place:MangeCategoriesPage", error.message);
    }
  })

  //to delete a categorie
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      successAlert({
        title: "Category Deleted!",
        text: "You have successfully Deleted the Category!",
      })
      queryClient.invalidateQueries("categories");

    },
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while deleting category! place:MangeCategoriesPage", error.message);
    }
  })


  const handleAddCategory = async () => {

    if (!newCategory) {
      setNoCategory(true);
      return;
    }

    mutate({
      endpoint: "/api/categories/create",
      payload: {
        categoryname: newCategory
      }
    })
  }

  const handleDeleteCategory = async (categoryId: string) => {
    deleteMutate({
      endpoint: `/api/categories/delete/${categoryId}`
    })
    return false;
  }

  const handleEditCategory = async (id: any, newValue: string) => {
    updateMutate({
      endpoint: "/api/categories/update",
      payload: { categoryId: id, categoryname: newValue },
    })
    return false;
  }

  const editCategory = (id: any) => {
    editAlert({ editFunction: handleEditCategory, title: "Category", text: "Update the Category!", id, inputPlaceholder: "Write new Category here..", inputType: "text", confirmButtonText: "Update", stext: "Category Updated Successfully!", stitle: "Category Updated!" })
  }

  const deleteCategory = (categoryId: any) => {
    confirmAlert({
      confirmFunction: handleDeleteCategory, qtitle: "Are you Sure?", iconType: "warning", qconfirmtext: "Yes, Delete It!", id: categoryId, stitle: "Operation Successful!", stext: "Your Record Has been Deleted!", qtext: "This action won't be Revert!"
    })
  }
  return (
    <div className='pt-10'>
      <h1 className='mb-5 text-4xl font-semibold text-center'>Manage Categories</h1>
      <div className="max-w-6xl pb-1 flex gap-5 mt-16 justify-center items-center mx-auto">

        <Input
          type="text"
          placeholder="Enter category name"
          className="flex-grow max-w-sm"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value)
            setNoCategory(false);
          }}
        />



        <Button onClick={handleAddCategory}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {!creatingLoading ? "Add Category" : "Loading..."}
        </Button>

      </div>
      <div className="max-w-xl mx-auto mb-5">
        {noCategory && <p className="text-left px-4 text-sm text-red-600">Plzz Provide Category!</p>}
      </div>

      <DataTable columns={categoryColumns} editRecord={editCategory} isSrno={true} data={categoryData?.data || []} isActions={true} deleteRecordFunction={deleteCategory} messageForNoRecord='No Category Found!' />
    </div>
  )
}

export default MangeCategoriesPage
