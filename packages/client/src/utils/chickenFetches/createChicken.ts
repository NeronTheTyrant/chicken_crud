import { Chicken } from "@nest-react/domain";
import { API_URL } from "~/config";
import { Logger } from "../logger";

export async function createChicken(): Promise<Chicken | undefined> {
    try {
        const randomInfoRes = await fetch(`https://randomuser.me/api/`);
        const randomData = await randomInfoRes.json()
        const name: string = randomData.results[0].name.first;
        const dob: Date = randomData.results[0].dob.date
        const res = await fetch(`${API_URL}/chicken`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, birthday: dob, weight: Math.floor(Math.random() * 120) })
        })
        const data = await res.json();
        return data;
    } catch (err) {
        Logger.error(err);
    }
}