import axios from "axios";
import { AxiosOptions } from "../../Types/AxiosOptions";
import { ReadEmployeeDto } from "../../Types/ReadEmployeeDto";
import { TempNotificationDto } from "../../Types/TempNotificationDto";

//TODO: Temp solution, due to lack of endpoints at the moment - needs to be corrected in the next week.

export default async function TempSendNotification()
{
    try {
        const responseEmail = await axios.get<string>('https://localhost:7014/api/Account/authorize/email', AxiosOptions);
        const responseEmployee = await axios.get<ReadEmployeeDto>(`https://localhost:7014/api/User/email?email=${responseEmail.data}`, AxiosOptions);
        const notifications = await axios.get<TempNotificationDto[]>(`https://localhost:7014/api/Notification/GetUserNotifications?id=${responseEmployee.data.id}`, AxiosOptions);
        //const tempNewNotification = notifications.data.length + 1;
        const contentOfTheNotification = "Test notification nr: " + notifications.data.length++;

        await axios.post(`https://localhost:7014/api/Notification/AddNotificationToUser`, {content: contentOfTheNotification, userId: responseEmployee.data.id});

        console.log("All requests passed.");
    } catch (error) 
    {
        console.log("Something went wrong, with cascade requests.");
    }
}
