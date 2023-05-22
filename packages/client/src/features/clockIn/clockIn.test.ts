import { describe, expect, it } from "vitest";
import { statusToColor, statusToText, timestampFromDate } from "./functions";
import { Status } from "../../modules/attendance/types";

describe("ClockIn Component", () => {
    it("should return timestamp from date", () => {
        const date = new Date();
        date.setHours(12);
        date.setMinutes(30);
        const timestamp = timestampFromDate(date);

        expect(timestamp).toEqual("12:30");
    });

    it("should pad the timestamp hours with zeros", () => {
        const date = new Date();
        date.setHours(8);
        date.setMinutes(30);
        const timestamp = timestampFromDate(date);

        expect(timestamp).toEqual("08:30");
    });

    it("should pad the timestamp minutes with zeros", () => {
        const date = new Date();
        date.setHours(22);
        date.setMinutes(3);
        const timestamp = timestampFromDate(date);

        expect(timestamp).toEqual("22:03");
    });

    it("should return midnight timestamp as 00:00", () => {
        const date = new Date();
        date.setHours(24);
        date.setMinutes(0);
        const timestamp = timestampFromDate(date);

        expect(timestamp).toEqual("00:00");
    });

    it("should show red if status is PENDING", () => {
        expect(statusToColor("PENDING")).toEqual("red");
    });

    it("should show yellow if status is WAITING_APPROVAL", () => {
        expect(statusToColor("WAITING_APPROVAL")).toEqual("yellow");
    });

    it("should show green if status is DONE", () => {
        expect(statusToColor("DONE")).toEqual("green");
    });

    it("should show gray for unknown status", () => {
        expect(statusToColor("UNKNOWN" as Status)).toEqual("gray");
    });

    it("should show Pendente if status is PENDING", () => {
        expect(statusToText("PENDING")).toEqual("Pendente");
    });

    it("should show Aguardando Aprovação if status is WAITING_APPROVAL", () => {
        expect(statusToText("WAITING_APPROVAL")).toEqual("Aguardando Aprovação");
    });

    it("should show Concluído if status is DONE", () => {
        expect(statusToText("DONE")).toEqual("Concluído");
    });

    it("should show Desconhecido for unknown status", () => {
        expect(statusToText("UNKNOWN" as Status)).toEqual("Desconhecido");
    });
});
