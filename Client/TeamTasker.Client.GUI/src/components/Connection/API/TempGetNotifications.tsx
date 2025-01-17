import axios from "axios";
import { AxiosOptions } from "../../Types/AxiosOptions";
import { ReadEmployeeDto } from "../../Types/ReadEmployeeDto";
import { TempNotificationDto } from "../../Types/TempNotificationDto";

//TODO: Temp solution, due to lack of endpoints at the moment - needs to be corrected in the next week.

export default async function TempGetNotifications(setNotifications: React.Dispatch<React.SetStateAction<TempNotificationDto[]>>)
{
    try {
        const responseEmail = await axios.get<string>('https://localhost:7014/api/Account/authorize/email', AxiosOptions);
        const responseEmployee = await axios.get<ReadEmployeeDto>(`https://localhost:7014/api/User/email?email=${responseEmail.data}`, AxiosOptions);
        const notifications = await axios.get<TempNotificationDto[]>(`https://localhost:7014/api/Notification/GetUserNotifications?id=${responseEmployee.data.id}`, AxiosOptions);

        setNotifications(notifications.data);

        console.log("All requests passed.");
    } catch (error) 
    {
        console.log("Something went wrong, with cascade requests.");
    }
}
