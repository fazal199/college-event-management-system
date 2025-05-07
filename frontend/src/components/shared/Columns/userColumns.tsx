
import { ColumnDef } from "@tanstack/react-table"
import ColumnDesign from "../ColumnDesign"
import { EventRegisteredUser } from "@/types"

export const userColumns: ColumnDef<EventRegisteredUser>[] = [
    {
        accessorKey: "username",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"Username"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-lg font-medium text-center">{row.getValue("username")}</div>
        },
    },

    {
        accessorKey: "email",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"Email"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-lg font-medium text-center">{row.getValue("email")}</div>
        },
    },
    {
        accessorKey: "date",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"Date"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-lg font-medium text-center">{row.getValue("date")}</div>
        },
    },

]
