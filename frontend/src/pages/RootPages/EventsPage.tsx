import EventCard from "@/components/shared/EventCard"
import GridMainContent from "@/components/shared/GridMainContent"
import { Input } from "@/components/ui/input"
import FilterSidebar from "./FilterSidebar"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { checkForErrors } from "@/lib/utils"
import { useQuery, useQueryClient } from "react-query"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { getData } from "@/lib/react-query/apiFunctions"
import { log } from "console"
import { useEffect, useState } from "react"
import { useDebounceCallback } from "usehooks-ts"

const EventsPage = () => {

  const { isInterConnected } = useInternet()

  const [filters, setFilters] = useState({
    search: '',
    isfree: '',
    language: [],
    category: [],
    ticketprice: 0,
    page: 1,
  });

  const { data: allEventsData, isLoading, isError } = useQuery({
    queryKey: ['alleventsdata', filters],

    // queryFn: () => getData({ endpoint: `/api/events/allevents` }),
    queryFn: () => getData({ endpoint: `/api/events/allevents?page=${filters.page}&search=${filters.search}&isfree=${filters.isfree}&language=${filters.language}&category=${filters.category}&ticketprice=${filters.ticketprice}` }),
    onError: (error: any) => {
      checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching all events data! place:EventsPage", error.message);
    }
  })
  

  //for handling serach of events
  const [searchEvents, setSearchEvents] = useState(filters.search);
  const debouncedSerachEvents = useDebounceCallback(setSearchEvents, 500);

  useEffect(() => {
      setFilters({...filters,search:searchEvents})
  }, [searchEvents]);
  
  return (
    <GridMainContent>
      <FilterSidebar filters={filters} setFilters={setFilters} maximumPrice={allEventsData?.data?.maximumprice || 0} />
      <div className="w-full px-8 pt-5">
        <div className="mb-6">
          <Input onChange={(e) => debouncedSerachEvents(e.target.value)
          } type="search" placeholder="Search events..." className="w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-y-16 gap-x-5">
          {!isLoading ? (
            !isError ? (
              allEventsData?.data?.docs?.length != 0 ? (
                allEventsData?.data?.docs.map((event: any) =>
                  <EventCard
                    key={event._id}
                    image={event.eventThumbnail || "/placeholder.svg?height=200&width=300"}
                    title={event.name}
                    description={event.description}
                    languagename={event.languagename}
                    categoryname={event.categoryname}
                    
                    isFree={event.isFree}
                    eventId={event._id}
                  />
                )
              ) : (
                <h1>No Events!</h1>
              )
            ) : (
              <h1>Error!</h1>
            )
          ) : (
            <h1>Loading...</h1>
          )

          }

          {/* Add more EventCard components as needed */}
        </div>
        <Pagination className="my-10">
          <PaginationContent>
            <PaginationItem className={`${!allEventsData?.data?.hasPrevPage ? 'opacity-50 pointer-events-none' : ''} cursor-pointer bg-primary/80 rounded-md`}
              aria-disabled={!allEventsData?.data?.hasPrevPage} onClick={() => setFilters({ ...filters, page: filters.page - 1 })}>
              <PaginationPrevious />
            </PaginationItem>
            {Array.from({ length: Math.min(5, allEventsData?.data?.totalPages || 0) }, (_, i) => {
              const currentPage = allEventsData?.data?.page || 1;
              let pageNum = i + 1;

              // If current page is > 3, shift the page numbers to show current page in middle
              if (currentPage > 3 && allEventsData?.data?.totalPages > 5) {
                pageNum = Math.max(1, Math.min(currentPage - 2 + i, allEventsData?.data?.totalPages));
              }

              return (
                <PaginationItem onClick={() => setFilters({ ...filters, page: pageNum })} key={pageNum}>
                  <PaginationLink

                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem className={`${!allEventsData?.data?.hasNextPage ? 'opacity-50 pointer-events-none' : ''} cursor-pointer bg-primary/80 rounded-md`}
              aria-disabled={!allEventsData?.data?.hasNextPage} onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>
              <PaginationNext


              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

    </GridMainContent>
  )
}

export default EventsPage
