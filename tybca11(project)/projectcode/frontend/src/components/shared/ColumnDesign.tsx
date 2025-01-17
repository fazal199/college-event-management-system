import { CaretSortIcon } from "@radix-ui/react-icons"
import exp from "constants"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

const ColumnDesign = ({ column, title }: { column: any, title: any }) => {
    //if true then ascending, otherwise descending :)
    const order = column.getIsSorted() === "asc"

    return (<div onClick={() => column.toggleSorting(order)} className="text-xl font-semibold flex gap-2  justify-center items-center cursor-pointer">

        <span>{title}</span>
        <span>{column.getCanSort() && column.getIsSorted() === "desc" ? (
            <ArrowUpIcon className="size-6" aria-hidden="true" />

        ) : column.getIsSorted() === "asc" ? (
            <ArrowDownIcon className="size-6" aria-hidden="true" />
        ) : (
            <CaretSortIcon className="size-6" aria-hidden="true" />
        )}</span>

    </div>)

}

export default ColumnDesign