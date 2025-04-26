import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { FilterIcon } from 'lucide-react'
import { useInternet } from '@/contexts/InterStatusWrapper'
import { useQuery } from 'react-query'
import { getData } from '@/lib/react-query/apiFunctions'
import { checkForErrors } from '@/lib/utils'
import { useDebounceCallback } from "usehooks-ts"
import { useEffect, useState } from "react"

const FilterSidebar = ({ maximumPrice, filters, setFilters }: any) => {
    const { isInterConnected } = useInternet()
    const [minimumPrice, setMinimumPrice] = useState(0);

    const { data: allCategoriesData, isLoading: isCategoryLoading, isError: isCategoryError } = useQuery({
        queryKey: 'allcategoriessidebar',
        queryFn: () => getData({ endpoint: '/api/categories/all' }),
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching all categories data for sidebar! place:FilterSidebar", error.message);
        }
    })

    const { data: allLanguagesData, isLoading: langLoading, isError: langError } = useQuery({
        queryKey: 'alllanguagessidebar',
        queryFn: () => getData({ endpoint: '/api/languages/all' }),
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching all languages data for sidebar! place:FilterSidebar", error.message);
        }
    })

    const getCategoryValue = (categoryname: any) => {

        const categroiesArray = [...filters.category];

        if (categroiesArray.includes(categoryname)) {
            categroiesArray.splice(categroiesArray.indexOf(categoryname), 1);
        }

        else {
            categroiesArray.push(categoryname);
        }

        setFilters((prevFilters: any) => ({ ...prevFilters, category: categroiesArray }));

    }
    const getLanguageValue = (languagename: any) => {

        const languagesArray = [...filters.language];

        if (languagesArray.includes(languagename)) {
            languagesArray.splice(languagesArray.indexOf(languagename), 1);
        }

        else {
            languagesArray.push(languagename);
        }

        setFilters((prevFilters: any) => ({ ...prevFilters, language: languagesArray }));

    }

    //for handling price
    const [ticketprice, setTicketprice] = useState(filters.ticketprice);
    const debouncedTicketPrice = useDebounceCallback(setTicketprice, 500);

    
    //for handling search
    useEffect(() => {
        setFilters((prevFilter:any) => ({...prevFilter,ticketprice: ticketprice}))
    }, [ticketprice]);



    return (
        <aside className="flex-col hidden pt-6 border-r-2 px-8 shadow-lg min-h-[83vh] bg-secondary/95 shadow-muted/15 border-secondary/96 border-t-0 border-b-0 sm:flex">
            <div className='mb-3 flex items-center gap-2'>
                <h2 className="text-3xl font-semibold mb-2 ">Filters</h2>
                <FilterIcon />
            </div>
            <div className="space-y-5">
                <div>
                    <div className="text-lg font-semibold mb-2">Categories</div>
                    <div className="space-y-1 mt-2">
                        {
                            !isCategoryLoading ? (
                                !isCategoryError ? (
                                    allCategoriesData?.data?.length != 0 ? (
                                        allCategoriesData?.data.map((category: any) =>
                                            <div className="flex items-center">
                                                <Checkbox id={category.categoryname} value={category.categoryname} onCheckedChange={() => getCategoryValue(category.categoryname)} />
                                                <Label htmlFor={category.categoryname} className="ml-2">
                                                    {category.categoryname.slice(0, 1).toUpperCase() + category.categoryname.slice(1)}
                                                </Label>
                                            </div>
                                        )
                                    ) : (
                                        <h1>No Categories Availble!</h1>
                                    )
                                ) : (
                                    <h1>Error!</h1>
                                )
                            ) : (
                                <h1>Loading...</h1>
                            )
                        }

                    </div>
                </div>


                <div>
                    <div className="text-lg font-semibold mb-2">Languages</div>
                    <div className="space-y-1 mt-2">
                        {
                            !langLoading ? (
                                !langError ? (
                                    allLanguagesData?.data?.length != 0 ? (
                                        allLanguagesData?.data.map((language: any) => <>
                                            <div className="flex items-center">
                                                <Checkbox id={language.languagename} onCheckedChange={() => getLanguageValue(language.languagename)} value={language.languagename} />
                                                <Label htmlFor={language.languagename} className="ml-2">
                                                    {language.languagename.slice(0, 1).toUpperCase() + language.languagename.slice(1)}
                                                </Label>
                                            </div>
                                        </>)
                                    ) : (
                                        <h1>No Languages Available!</h1>
                                    )
                                ) : (
                                    <h1>Error!</h1>
                                )
                            ) : (
                                <h1>Loading...</h1>
                            )
                        }
                    </div>
                </div>


                <div>
                   
                    <div className="space-y-5 mt-2">
                        <div className="flex items-center">
                            <Checkbox id="price-free" onCheckedChange={() => setFilters((prevFilter: any) => ({ ...prevFilter, isfree: !prevFilter.isfree }))} />
                            <Label htmlFor="price-free" className="ml-2">
                                Free Events
                            </Label>
                        </div>
                        <div>
                            <Label htmlFor="price-range" className="mb-2 block">
                                Price Range
                            </Label>
                            <Slider id="price-range" min={0}  onValueChange={(price) => (debouncedTicketPrice(price[0]),setMinimumPrice(price[0]))
                            } max={maximumPrice} className="w-full" />
                            <div className="flex justify-between mt-2 text-sm text-secondary/50">
                                <span>₹{minimumPrice}</span>
                                <span>₹{maximumPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav>
            </nav>
        </aside>
    )
}

export default FilterSidebar
