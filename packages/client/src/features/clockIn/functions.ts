import { Status } from "../../modules/attendance/types";

export function timestampFromDate(date: Date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
}

export function statusToColor(status: Status) {
    const colors: Record<Status, string> = {
        WAITING_APPROVAL: "yellow",
        PENDING: "red",
        DONE: "green",
    }

    return colors[status] || "gray"
}

export function statusToText(status: Status) {
    const texts: Record<Status, string> = {
        WAITING_APPROVAL: "Aguardando Aprovação",
        PENDING: "Pendente",
        DONE: "Concluído",
    }

    return texts[status] || "Desconhecido"
}
