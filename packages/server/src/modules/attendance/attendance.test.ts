import { describe, expect, it } from "vitest";
import { validateRecordings } from "./service/editAttendance";
import { addDays } from "date-fns";
import { addHours } from "date-fns";

describe("AttendanceModule", () => {

  describe("Edição de ponto", () => {

    describe("Dado problema nos horários fornecidos", () => {
      
      it("nenhum horário fornecido, deve lançar ApiError", () => {
        let timestamps = [];

        expect(() => validateRecordings(timestamps)).toThrowError();
      });

      it("número ímpar de horários, deve lançar ApiError", () => {
        let timestamps = [new Date(), new Date(), new Date(), new Date(), new Date()];

        expect(() => validateRecordings(timestamps)).toThrowError();
      });
      
      it("pontos em dias diferentes, deve lançar ApiError", () => {
        let first = new Date("2023-05-20T03:00:00.000Z");
        let second = new Date("2023-05-20T04:00:00.000Z");
        let third = new Date("2023-05-20T05:00:00.000Z");
        let tomorrow = new Date("2023-05-21T03:00:00.000Z");

        let timestamps = [first, second, third, tomorrow];

        expect(() => validateRecordings(timestamps)).toThrowError();
      });

      it("pontos fora de ordem, deve lançar ApiError", () => {
        let first = new Date("2023-05-20T03:00:00.000Z");
        let second = new Date("2023-05-20T04:00:00.000Z");
        let third = new Date("2023-05-20T05:00:00.000Z");
        let fourth = new Date("2023-05-20T06:00:00.000Z");
        let timestamps = [fourth, third, second, first];

        expect(() => validateRecordings(timestamps)).toThrowError();
      });
      
    });

    describe("Dado horários corretos fornecidos", () => {
      
      it("deve passar nas validações", () => {
        let first = new Date("2023-05-20T03:00:00.000Z");
        let second = new Date("2023-05-20T04:00:00.000Z");
        let third = new Date("2023-05-20T05:00:00.000Z");
        let fourth = new Date("2023-05-20T06:00:00.000Z");
        let timestamps = [first, second, third, fourth];

        expect(validateRecordings(timestamps)).toBe(true);
      });
      
    });

  });

})