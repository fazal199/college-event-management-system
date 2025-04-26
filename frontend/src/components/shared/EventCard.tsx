
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"



export default function EventCard({ eventId, image, title, description, isFree, languagename, categoryname }: any) {
  return (
    <div className="bg-secondary shadow-md rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          width={300}
          height={200}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute bg-primary top-2 right-2" variant={"default"}>
          {isFree ? "Free" : "Paid"}
        </Badge>

      </div>

      <div className="p-4">
        <div className="flex gap-4 my-5">


          <Badge className=" bg-primary " variant={"default"}>
            {categoryname.toUpperCase() || "error"}
          </Badge>
          <Badge className=" bg-primary " variant={"default"}>
            {languagename.toUpperCase() || "error"}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className=" text-sm mb-4">{description}</p>
        <Link to={`/events/event/${eventId}`}><Button className="w-full">More Details</Button></Link>
      </div>
    </div>
  )
}

