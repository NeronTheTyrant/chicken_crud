import { API_URL } from "~/config";
import { Logger } from "../logger";

export async function deleteCoop(id: number) {
    try {
        const res = await fetch(`${API_URL}/coop/${id}`, {
            method: "DELETE",
        })
        return res;
    } catch (err) {
        Logger.error(err);
    }
}