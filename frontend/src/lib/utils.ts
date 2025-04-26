import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { warningAlert } from "./sweetalert/alerts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkForErrors(
  { statusCode, devMessage, clientMessage }: any,
  isInterConnected: boolean,
  errorDetail: string,
  clientError: string,
  showWarning: boolean = true
) {
  if (!isInterConnected) {
    warningAlert({
      title: "Network Problem!",
      text: "Plzz check your Internet Connection!",
    });
  } else if (statusCode == 500) {
    console.error(devMessage);
    console.log(errorDetail);
     console.log(clientError);
     
    window.location.href = "/500";
  } else {
    if (showWarning)
      warningAlert({
        title: "Oops!",
        text: clientMessage || "Something went wrong, Plzz try Later!",
      });

    console.error(devMessage);
    console.error(errorDetail, clientError);
  }
}

export function formatDate(dateString: string) {

  if(!dateString)
    return "";
  
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
}
