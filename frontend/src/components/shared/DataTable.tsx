
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { useState } from "react"
import { Input } from "@/components/ui/input"
import DataTablePagination from "./DataTablePagination"
import { CircleCheckBig, Pencil, Settings, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Switch } from "../ui/switch"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  isActions?: boolean,
  messageForNoRecord: string,
  deleteRecordFunction?: (id: any,data?: any) => void,
  isSrno?: boolean,
  onRowClick?: string,
  editRecord?: (edit: any) => void,
  isPermissionActions?: boolean,
  isNoEditButton?: boolean,
  permissionAllowedFunction?: (id: any,secondId:any) => void,
  isActivityAllowed?: boolean,
  changeActivityFunc?: (status: boolean, id: any) => void,
  isNoDeleteButton? : boolean
}

export function DataTable({
  columns,
  data,
  isActions = false,
  messageForNoRecord,
  isSrno = false,
  deleteRecordFunction,
  onRowClick,
  editRecord,
  isPermissionActions = false,
  permissionAllowedFunction,
  isActivityAllowed = false,
  changeActivityFunc,
  isNoEditButton = false,
  isNoDeleteButton = false,
}: DataTableProps<any, any>) {

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const navigate = useNavigate();


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      return row
        .getVisibleCells()
        .some((cell) =>
          String(cell.getValue())
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );

    },
  });


  return (
    <div className="max-w-6xl pb-12 mx-auto px-8">
      <div className="flex items-center py-4">
        <label htmlFor="search" className="mr-2 font-semibold">Search:</label>
        <Input
          id="search"
          placeholder="Search across the table..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="border rounded-md">

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {isSrno && <TableHead className="py-4">
                  <div className="flex items-center justify-center gap-2 text-xl font-semibold cursor-pointer">
                    <span>S No.</span>
                  </div>
                </TableHead>}
                {headerGroup.headers.map((header) => {
                  return (

                    <TableHead className="py-4" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}


                {(isActions || isActivityAllowed) && <TableHead className="py-4">
                  <div className="flex items-center justify-center gap-2 text-xl font-semibold cursor-pointer">
                    <span>Actions</span>
                    <span><Settings className="size-5" /></span>
                  </div>
                </TableHead>}


                {isPermissionActions && <TableHead className="py-4">
                  <div className="flex items-center justify-center gap-2 text-xl font-semibold cursor-pointer">
                    <span>Actions</span>
                    <span><Settings className="size-5" /></span>
                  </div>
                </TableHead>}

              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow

                  className="bg-secondary"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {isSrno && <TableCell onClick={() => navigate(onRowClick ? `${onRowClick as string}/${row.original?.eventId || row.original?._id}` : '')} className="flex items-center justify-center gap-6 py-3 text-lg font-medium text-center">
                    {index + 1}
                  </TableCell>}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell onClick={() => navigate(onRowClick ? `${onRowClick as string}/${row.original?.eventId || row.original?._id}` : '')} key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}

                  {isActions && <TableCell className="flex items-center justify-center gap-6 py-3 text-lg font-medium text-center">
                    {!isNoEditButton && <Pencil onClick={() => {
                      if (!editRecord)
                        navigate(`${onRowClick}/${row.original?.eventId || row.original._id}`);

                      else
                        editRecord(row.original._id)
                    }} color="#04ff00" className="cursor-pointer active:bg-primary" />}
                    <Trash2 onClick={() => {
                      if (!deleteRecordFunction)
                        return;

                      //passing status based on editbutton true or false
                      else if (isNoEditButton)
                        deleteRecordFunction(row.original._id,row.original.status);
                        
                      else
                      deleteRecordFunction(row.original._id);
                    }} color="#ff0000" className="cursor-pointer active:bg-primary" />

                  </TableCell>}

                  {isPermissionActions && <TableCell className="flex items-center justify-center gap-6 py-3 text-lg font-medium text-center">

                    <CircleCheckBig onClick={() => {
                      
                      if (!permissionAllowedFunction)
                        return;

                      console.log(row.original);


                      permissionAllowedFunction(row.original?._id,row.original?.eventId || null);
                    }} color="#04ff00" className="cursor-pointer active:bg-primary" />
                    {!isNoDeleteButton && <Trash2 onClick={() => {
                      if (!deleteRecordFunction)
                        return;

                      deleteRecordFunction(row.original._id);
                    }} color="#ff0000" className="cursor-pointer active:bg-primary" />}
                  </TableCell>}
                  {
                    isActivityAllowed && <><TableCell className="flex items-center justify-center gap-6 py-3 text-lg font-medium text-center">
                      <Switch
                        onCheckedChange={(status) => {
                          if (!changeActivityFunc)
                            return
                          changeActivityFunc(status, row.original._id)
                        }} checked={row.original.isAllowed} /></TableCell>
                    </>
                  }

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (isActions || isPermissionActions ? 2 : 0)} className="h-24 text-3xl font-semibold text-center">
                  {messageForNoRecord}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
