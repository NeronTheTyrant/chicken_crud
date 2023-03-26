import { API_URL } from "~/config";
import { Logger } from "../logger";

export async function getAllCoops() {
    try {
        const res = await fetch(`${API_URL}/coop`, {
            method: "GET",
        })
        const data = await res.json();
        return data;
    } catch (err) {
        Logger.error(err);
    }
}