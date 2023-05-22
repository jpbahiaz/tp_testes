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
        let first = new Date();
        let second = addHours(first, 1);
        let third = addHours(second, 1);
        let tomorrow = addDays(third, 1);

        let timestamps = [first, second, third, tomorrow];

        expect(() => validateRecordings(timestamps)).toThrowError();
      });

      it("pontos fora de ordem, deve lançar ApiError", () => {
        let first = new Date();
        let second = addHours(first, 1);
        let third = addHours(second, 1);
        let fourth = addHours(third, 1);
        let timestamps = [fourth, third, second, first];

        expect(() => validateRecordings(timestamps)).toThrowError();
      });
      
    });

    describe("Dado horários corretos fornecidos", () => {
      
      it("deve passar nas validações", () => {
        let first = new Date();
        let second = addHours(first, 1);
        let third = addHours(second, 1);
        let fourth = addHours(third, 1);
        let timestamps = [first, second, third, fourth];

        expect(validateRecordings(timestamps)).toBe(true);
      });
      
    });

  });

})