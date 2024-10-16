import ColumnDesign from "@/components/shared/ColumnDesign"


export const categoryColumns: any = [

    {
        accessorKey: "categoryname",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"CategoryName"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-lg font-medium text-center">{row.getValue("categoryname")}</div>
        },
    },




]
