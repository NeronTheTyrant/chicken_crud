import { Coop } from "@nest-react/domain";
import { API_URL } from "~/config";
import { Logger } from "../logger";

export async function createCoop(name: string): Promise<Coop | undefined> {
    try {
        const res = await fetch(`${API_URL}/coop`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        })
        const data = await res.json();
        return data;
    } catch (err) {
        Logger.error(err);
    }
}