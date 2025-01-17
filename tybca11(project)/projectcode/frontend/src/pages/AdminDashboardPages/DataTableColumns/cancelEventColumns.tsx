import ColumnDesign from "@/components/shared/ColumnDesign"


export const cancelEventColumns: any = [

    {
        accessorKey: "name",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"Eventname"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-lg font-medium text-center">{row.getValue("name")}</div>
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

]

export default cancelEventColumns;