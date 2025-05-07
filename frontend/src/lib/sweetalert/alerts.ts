import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Swal, { SweetAlertIcon } from "sweetalert2";

// types of funcitons
interface confirmAlertType {
  confirmFunction: (id: any, data: any) => Promise<boolean>;
  qtitle: string;
  qtext: string;
  qconfirmtext: string;
  stitle: string;
  stext: string;
  iconType?: SweetAlertIcon;
  id?: any;
  data?: any;
  eventId?: any;
}
interface successAlertType {
  title: string;
  text: string;
}

interface editAlertType {
  title: string;
  text: string;
  inputType?: any;
  inputPlaceholder?: string;
  confirmButtonText: string;
  editFunction: (id: any, reason: string, data?:any) => Promise<boolean>;
  id: any;
  data? : any
  stitle: string;
  stext: string;
}

const successAlert = ({ title, text }: successAlertType) => {
  Swal.fire({
    position: "center",
    icon: "success",
    text,
    title,
    showConfirmButton: true,
    confirmButtonText: "OK", // Customize the text on the button
    allowOutsideClick: false, // Prevent closing the alert by clicking outside
  });
};

const warningAlert = ({ title, text }: any) => {
  Swal.fire({
    position: "center",
    icon: "warning",
    text,
    title,
    showConfirmButton: true,
    confirmButtonText: "OK", // Customize the text on the button
    allowOutsideClick: false, // Prevent closing the alert by clicking outside
  });
};

const confirmAlert = ({
  confirmFunction,
  qtitle,
  qtext,
  qconfirmtext,
  stitle,
  stext,
  iconType = "warning",
  id,
  data,
}: confirmAlertType) => {
  Swal.fire({
    title: qtitle,
    text: qtext,
    icon: iconType,
    showCancelButton: true,
    confirmButtonColor: "hsl(262.1 83.3% 57.8%)",
    cancelButtonColor: "#d33",
    confirmButtonText: qconfirmtext,
  }).then(async (result) => {
    if (result.isConfirmed) {
      const isError = await confirmFunction(id, data);
      if (!isError) successAlert({ title: stitle, text: stext });
    }
  });
};

const editAlert = ({
  title,
  text,
  inputType = "text",
  inputPlaceholder,
  confirmButtonText,
  editFunction,
  id,
  stitle,
  stext,
  data = ""

}: editAlertType) => {
  Swal.fire({
    title,
    text,
    input: inputType,
    inputPlaceholder,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: "Cancel",
    inputValidator: (value: string) => {
      if (!value) {
        return "You need to provide a reason!";
      }
    },
  }).then(async (result: any) => {
    if (result.isConfirmed) {
      const isError = await editFunction(id, result.value,data);
      if (!isError) successAlert({ title: stitle, text: stext });
    }
  });
};

export { confirmAlert, successAlert, editAlert, warningAlert };
