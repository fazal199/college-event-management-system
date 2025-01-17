import ColumnDesign from "@/components/shared/ColumnDesign"


export const languagesColumn: any = [
    {
        accessorKey: "languagename",
        //this is header styling 
        header: ({ column }: { column: any }) => <ColumnDesign column={column} title={"LanguageName"} />,
        //this is cell
        cell: ({ row }: { row: any }) => {
            return <div className="text-lg font-medium text-center">{row.getValue("languagename")}</div>
        },
    },

]
