import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"

const DataTablePagination = ({ table }: any) => {

    const pageSizeOptions = [20, 40, 60, 80, 100];
    

    return (
        <div className="flex flex-col-reverse mt-5 justify-end items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
                <p className="whitespace-nowrap text-sm font-semibold">Rows per page</p>
                <Select
                    defaultValue="20"
                    onValueChange={(value) => {
                        table.setPageSize(Number(value))
                    }}
                >
                    <SelectTrigger  className="h-8 w-[4.5rem]">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {pageSizeOptions.map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-center text-sm font-semibold">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}:
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    aria-label="Go to first page"
                    variant="outline"
                    className="hidden size-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
                </Button>
                <Button
                    aria-label="Go to previous page"
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeftIcon className="size-4" aria-hidden="true" />
                </Button>
                <Button
                    aria-label="Go to next page"
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRightIcon className="size-4" aria-hidden="true" />
                </Button>
                <Button
                    aria-label="Go to last page"
                    variant="outline"
                    size="icon"
                    className="hidden size-8 lg:flex"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
                </Button>
            </div>
        </div>
    )
}

export default DataTablePagination
