import cron from "node-cron";
import moment from "moment-timezone";
import { userRepository } from './repositories/userRepository';
import { User } from "./entities/User";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

//Get data user 
const getUserBirthday = async () => {
    return await userRepository
                .createQueryBuilder("user")
                .where("DATE_FORMAT(user.birthdate, '%m-%d') = DATE_FORMAT(NOW(), '%m-%d') AND user.status = 0")
                .getMany();
}

//Update status user
const updateStatusUser = async (id: number, status: number) => {
    try {
        let user = await userRepository.findOneBy({ id: Number(id) });
        if (user) {
            user.status = status
            await userRepository.save(user);
        }

        await userRepository
            .createQueryBuilder()
            .update(User)
            .set({status: 0})
            .where("DATE_FORMAT(user.birthdate, '%m-%d') != DATE_FORMAT(NOW(), '%m-%d')")
            .execute();
    } catch (error) {
        // ✅ Proper error handling
        console.log("Error update status user", error);
    }
}

const sendEmail = async (requestData: any, id: number) => {
    try {
        const hostEmail: string = process.env.EMAIL_HOST ?? ""
        const response = await axios.post(hostEmail, requestData);
        console.log(response.status);
        if(response.data.status == "sent"){
            updateStatusUser(id, 1)
        }
    } catch (error) {
        // ✅ Proper error handling
        if (axios.isAxiosError(error)) {
            console.error(`Error sending email to: ${requestData.email}`);
        }
    }
    
}

export const sendBirthdayGreeting = () => {
    const setSchedule: string = process.env.SCHEDULER || "*/10 * * * *"
    cron.schedule(setSchedule, async () => {
        const users = await getUserBirthday();
        const now = moment();
        if(users.length > 0){
            users.forEach(user => {
                const userTime = moment().tz(user.timezone).format("HH:mm");
                const fullName = user.firstname + " " + user.lastname
                const emailText: string = process.env.EMAIL_CONTENT || "";
                const emailContentText = replaceVariables(emailText,{fullName:fullName});
                const emailAt:string = process.env.EMAIL_AT || "09:00";
                const userEmailAt = moment(emailAt, "HH:mm");
                const userEmailNow = moment(userTime, "HH:mm");
                
                if (userEmailNow.isSameOrAfter(userEmailAt)) {
                    const requestData = {
                        "email": user.email,
                        "message": emailContentText
                    }
                    sendEmail(requestData, user.id)
                    console.log(`⏰ Cron Job Executed at 9:00 AM in ${userTime}:`, now.format("YYYY-MM-DD HH:mm:ss"));
                }
            });
        }
    });
}

const replaceVariables = (template: string, values: Record<string, string>) => {
    return template.replace(/{(.*?)}/g, (_, key) => values[key] || "");
};
  