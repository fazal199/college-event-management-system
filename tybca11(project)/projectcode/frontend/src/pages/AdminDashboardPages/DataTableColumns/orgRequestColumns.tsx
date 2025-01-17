import ColumnDesign from "@/components/shared/ColumnDesign"


export const orgRequestColumns: any = [
    {
        accessorKey: "organisername",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"OrganiserName"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-lg font-medium text-center">{row.getValue("organisername")}</div>
        },
    },
   
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
   

]
