
import { ColumnDef } from "@tanstack/react-table"
import ColumnDesign from "../ColumnDesign"
import { OrgEventsData } from "@/types"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<OrgEventsData>[] = [
    {
        accessorKey: "eventName",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"Eventname"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {

            return <div className="text-lg font-medium text-center">{row.getValue("eventName")}</div>
        },
    },

    {
        accessorKey: "location",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"Location"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-lg font-medium text-center">{row.getValue("location")}</div>
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
    {
        accessorKey: "status",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"Status"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            const statusValue = row.getValue("status");
            return <div className="text-lg font-medium text-center">
                <Badge className="py-1  text-sm font-semibold capitalize" variant={statusValue}>{statusValue}</Badge>
            </div>
        },
    },
]
