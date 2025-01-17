
import { CardHeader, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import createEventSchema from "@/lib/zod/createEventSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { checkForErrors, formatDate } from "@/lib/utils"
import { useInternet } from "@/contexts/InterStatusWrapper"
import { getData, postData } from "@/lib/react-query/apiFunctions"
import { successAlert } from "@/lib/sweetalert/alerts"
import { useNavigate, useParams } from "react-router-dom"

export default function EditEventPage() {

    const [defaultValues, setDefaultValues] = useState({
        name: "",
        location: "",
        speakers: "",
        date: "",
        description: "",
        address: "",
        capacity: "",
        ticketprice: "",
        eventthumbnail: "",
        category: "",
        language: "",
    });

    const form = useForm({
        resolver: zodResolver(createEventSchema),
        defaultValues
    })

    const { eventId } = useParams();
    const { isInterConnected } = useInternet();
    const navigate = useNavigate();
    const [preview, setPreview] = useState("");
    const queryClient = useQueryClient();

    //fetching event data
    const { data: eventData, isLoading: isEventLoading, isError: isEventError } = useQuery({
        queryKey: 'eventData',
        queryFn: () => getData({ endpoint: `/api/events/geteventdata/${eventId}` }),
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching categories data! place:EditEventPage", error.message);
        },

    })


    //fetching category data
    const { data: categoryData, isLoading, isError } = useQuery({
        queryKey: 'categoriesforedit',
        queryFn: () => getData({ endpoint: '/api/categories/all' }),

        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching categories data! place:EditEventPage", error.message);
        }
    });



    //fetching languages data
    const { data: languageData, isLoading: isLanguageLoading, isError: isLanguageError } = useQuery({
        queryKey: 'languagesforedit',
        queryFn: () => getData({ endpoint: '/api/languages/all' }),
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while fetching languages data! place:EditEventPage", error.message);
        }
    });

    //to update event event
    const { mutate, isLoading: isEventCreateLoading } = useMutation({
        mutationFn: postData,
        onSuccess: () => {
            successAlert({
                title: "Event Created!",
                text: "You have successfully Created a New Event!",
            })
            queryClient.invalidateQueries("eventData");
            

            navigate("/manage-events/yourevents");
        },
        onError: (error: any) => {
            checkForErrors(error?.response?.data, isInterConnected, "Something went wrong while creating new event! place:EditEventPage", error.message);
        }
    })

    //to show the preview and set the file 
    function handleOnFileChange(e: any) {
        const file = e.target.files?.[0];

        if (!file) {
            console.error("No file selected.");
            return;
        }

        // Check if the file is an image
        if (!file.type.startsWith("image/")) {
            console.error("Selected file is not an image.");
            return;
        }

        const reader = new FileReader();

        // Successful file reading
        reader.onload = () => {
            setPreview(reader.result as string); // Set image preview
        };

        // Error during file reading
        reader.onerror = () => {
            console.error("Error reading file:", reader.error);
        };

        // Start reading the file
        reader.readAsDataURL(file);

        // Update the form field manually with React Hook Form's setValue
        form.setValue("eventthumbnail", file); // Use setValue to update the file input in the form
    }

    //to create event 
    function onUpdateEventSubmit(values: any) {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("location", values.location);
        formData.append("speakers", values.speakers);
        formData.append("date", values.date);
        formData.append("description", values.description);
        formData.append("address", values.address);
        formData.append("capacity", values.capacity);
        formData.append("ticketprice", values.ticketprice);
        formData.append("category", values.category);
        formData.append("language", values.language);

        // Append the file to formData
        if (values.eventthumbnail) {
            formData.append("eventthumbnail", values.eventthumbnail); // Append the file to FormData
        }
        mutate({ endpoint: `/api/events/update/${eventId}`, payload: formData });
    }

    useEffect(() => {
        if (eventData) {
            setDefaultValues({ ...defaultValues, eventthumbnail: eventData.data.eventThumbnail })
            setPreview(eventData.data.eventThumbnail);
            form.reset({
                ...eventData.data, category: eventData.data.categoryId,
                language: eventData.data.languageId, eventthumbnail: eventData.data.eventThumbnail, date: formatDate(eventData?.data?.date), ticketprice: String(eventData?.data?.ticketprice), capacity: String(eventData?.data?.capacity)
            }); 
        }

    }, [eventData])


    return (
        <div className="px-12">
            <div className="w-full mx-auto">
                <CardHeader>
                    <h1 className='mb-5 text-4xl font-semibold text-left'>Update the Event</h1>
                    <CardDescription>Update the Event Information Here!.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onUpdateEventSubmit)} className="grid gap-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name={"name"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold">Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={"Enter Event Name!"} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name={"location"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold">Location</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={"Enter Event Location!"} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name={"category"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold">Category</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => form.setValue("category", value)} // Manually set the value
                                                        value={form.watch("category")} // Watch the current value of the field
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {!isLoading ? (
                                                                !isError ? (
                                                                    categoryData?.data?.map((categorie: any) => (
                                                                        <SelectItem key={categorie._id} value={categorie._id}>
                                                                            {categorie.categoryname}
                                                                        </SelectItem>

                                                                    ))
                                                                ) : (
                                                                    <p>Something Went Wrong!</p>
                                                                )
                                                            ) : (
                                                                <p>Loading..</p>
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                </div>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name={"speakers"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold">Name of Speaker</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={"Enter Event Speaker name!"} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name={"date"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold block mb-1">Date and Time</FormLabel>
                                                <FormControl>
                                                    <input {...field} placeholder="Enter Event Date and Time!" className="px-2 py-2 border-2 border-solid rounded-md bg-background border-primary" type="datetime-local" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name={"language"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold">Language</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => form.setValue("language", value)} // Manually set the value
                                                        value={form.watch("language")} // Watch the current value of the field
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Language" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {!isLanguageLoading ? (
                                                                !isLanguageError ? (
                                                                    languageData?.data?.map((language: any) => (
                                                                        <SelectItem key={language._id} value={language._id}>
                                                                            {language.languagename}
                                                                        </SelectItem>
                                                                    ))
                                                                ) : (
                                                                    <p>Something Went Wrong!</p>
                                                                )
                                                            ) : (
                                                                <p>Loading..</p>
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                </div>
                                <div className="col-span-2 ">
                                    <FormField
                                        control={form.control}
                                        name={"description"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold block mb-1">Event Description</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} placeholder="Provide details about the event" rows={8} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <FormField
                                        control={form.control}
                                        name={"address"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold block mb-1">Event Address</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} placeholder="Plzz Provide the Detail Address of Event" rows={8} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name={"capacity"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold block mb-1">Event Capacity</FormLabel>
                                                <FormControl>
                                                    <Input  {...field} placeholder="Plzz Provide the Capacity of Event" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name={"ticketprice"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold block mb-1">Event Ticket Price</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Enter Ticket Price of the Event" />
                                                </FormControl>

                                                <FormMessage />
                                                <p className="text-foreground/70 font-semibold">if free, fill the price 0.</p>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-2 mt-5 space-y-2">
                                    <FormField
                                        control={form.control}
                                        name={"eventthumbnail"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold block mb-2">Choose the Event Cover</FormLabel>
                                                <FormControl>
                                                    <input
                                                        onChange={(e) => handleOnFileChange(e)} // Removed direct field.onChange
                                                        type="file"
                                                        className="block text-sm font-semibold cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                {preview && <figure>
                                    <img src={preview} alt="" />
                                </figure>}
                            </div>

                            <div className="flex gap-3 mt-4">
                                <Button type="reset" variant="outline">Reset</Button>
                                <Button type="submit">{
                                    !isEventCreateLoading ? "Update Event" : "Loading..."
                                }</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>

            </div>
        </div >
    )


}