import { Chicken } from "@nest-react/domain";
import { API_URL } from "~/config";
import { Logger } from "../logger";

export async function chickenRun(id: number): Promise<Chicken | undefined> {
    try {
        const res = await fetch(`${API_URL}/chicken/run/${id}`, {
            method: "PATCH",
        })
        return await res.json();
    } catch (err) {
        Logger.error(err);
    }
}