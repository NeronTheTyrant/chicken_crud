import { API_URL } from "~/config";
import { Logger } from "../logger";

export async function getAllChickens() {
    try {
        const res = await fetch(`${API_URL}/chicken`, {
            method: "GET",
        })
        const data = await res.json();
        return data;
    } catch (err) {
        Logger.error(err);
    }
}