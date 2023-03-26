import { API_URL } from "~/config";
import { Logger } from "../logger";

export async function deleteChicken(id: number) {
    try {
        const res = await fetch(`${API_URL}/chicken/${id}`, {
            method: "DELETE",
        })
        // const data = await res.json();
        // return data;
        return res;
    } catch (err) {
        Logger.error(err);
    }
}