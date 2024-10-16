import ColumnDesign from "@/components/shared/ColumnDesign"


export const cancelEventColumns: any = [

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
        accessorKey: "eventLocation",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"Location"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-lg font-medium text-center">{row.getValue("eventLocation")}</div>
        },
    },
    {
        accessorKey: "eventDate",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"Date"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-lg font-medium text-center">{row.getValue("eventDate")}</div>
        },
    },

]

export default cancelEventColumns;