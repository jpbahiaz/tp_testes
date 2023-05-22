import { describe, expect, it } from "vitest";
import { validateRecordings } from "./service/editAttendance";
import { calculateExtraWorkedTime, calculateWorkedMinutes, getAttendanceStatusByRecordings, hasCompletedWorkday } from "./utils/utils";

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


  describe("Cálculo de minutos trabalhadas", () => {
      
    it("Retorna os minutos corretos", () => {
      let first = new Date("2023-05-20T03:00:00.000Z");
      let second = new Date("2023-05-20T04:00:00.000Z");
      let third = new Date("2023-05-20T05:00:00.000Z");
      let fourth = new Date("2023-05-20T06:00:00.000Z");
      let timestamps = [first, second, third, fourth];

      expect(calculateWorkedMinutes(timestamps)).toBe(120);
    });

    it("Dado fronteira entre dias, Retorna os minutos corretos", () => {
      let first = new Date("2023-05-19T23:00:00.000Z");
      let second = new Date("2023-05-20T00:00:00.000Z");
      let third = new Date("2023-05-20T05:00:00.000Z");
      let fourth = new Date("2023-05-20T06:00:00.000Z");
      let timestamps = [first, second, third, fourth];

      expect(calculateWorkedMinutes(timestamps)).toBe(120);
    });

  });
    
  describe("Cálculo de horas extras", () => {
      
    it("Dado tempo trabalhado maior que o previsto, deve retornar o valor correto", () => {
      let first = new Date("2023-05-20T08:00:00.000Z");
      let second = new Date("2023-05-20T12:00:00.000Z");
      let third = new Date("2023-05-20T13:00:00.000Z");
      let fourth = new Date("2023-05-20T18:00:00.000Z");
      let timestamps = [first, second, third, fourth];

      let expectedWorkedHoursPerDay = 480;

      expect(calculateExtraWorkedTime(expectedWorkedHoursPerDay, timestamps)).toBe(60);
    });

    it("Dado tempo trabalhado igual ao previsto, deve retornar o valor correto", () => {
      let first = new Date("2023-05-20T08:00:00.000Z");
      let second = new Date("2023-05-20T12:00:00.000Z");
      let third = new Date("2023-05-20T13:00:00.000Z");
      let fourth = new Date("2023-05-20T17:00:00.000Z");
      let timestamps = [first, second, third, fourth];

      let expectedWorkedHoursPerDay = 480;

      expect(calculateExtraWorkedTime(expectedWorkedHoursPerDay, timestamps)).toBe(0);
    });

    it("Dado tempo trabalhado menor que o previsto, deve retornar disparar erro", () => {
      let first = new Date("2023-05-20T08:00:00.000Z");
      let second = new Date("2023-05-20T12:00:00.000Z");
      let third = new Date("2023-05-20T13:00:00.000Z");
      let fourth = new Date("2023-05-20T16:00:00.000Z");
      let timestamps = [first, second, third, fourth];

      let expectedWorkedHoursPerDay = 480;

      expect(() => calculateExtraWorkedTime(expectedWorkedHoursPerDay, timestamps)).toThrowError;
    });

  });

  describe("Verificação de dia de trabalho completo", () => {
    it("Dado mais horas de trabalho que o previsto, deve retornar dia completo ", () => {
      let first = new Date("2023-05-20T08:00:00.000Z");
      let second = new Date("2023-05-20T12:00:00.000Z");
      let third = new Date("2023-05-20T13:00:00.000Z");
      let fourth = new Date("2023-05-20T18:00:00.000Z");
      let timestamps = [first, second, third, fourth];

      let expectedWorkedHoursPerDay = 480;

      expect(hasCompletedWorkday(expectedWorkedHoursPerDay, timestamps)).toBe(true);
    });

    it("Dado horas de trabalho igual ao previsto, deve retornar dia completo", () => {
      let first = new Date("2023-05-20T08:00:00.000Z");
      let second = new Date("2023-05-20T12:00:00.000Z");
      let third = new Date("2023-05-20T13:00:00.000Z");
      let fourth = new Date("2023-05-20T17:00:00.000Z");
      let timestamps = [first, second, third, fourth];

      let expectedWorkedHoursPerDay = 480;

      expect(hasCompletedWorkday(expectedWorkedHoursPerDay, timestamps)).toBe(true);
    });

    it("Dado menos horas de trabalho que o previsto, deve retornar dia incompleto", () => {
      let first = new Date("2023-05-20T08:00:00.000Z");
      let second = new Date("2023-05-20T12:00:00.000Z");
      let third = new Date("2023-05-20T13:00:00.000Z");
      let fourth = new Date("2023-05-20T16:00:00.000Z");
      let timestamps = [first, second, third, fourth];

      let expectedWorkedHoursPerDay = 480;

      expect(hasCompletedWorkday(expectedWorkedHoursPerDay, timestamps)).toBe(false);
    });

  });

  describe("Verificação de status do ponto", () => {
    it("Dado número ímpar de pontos, deve retornar pendente", () => {
      let first = new Date("2023-05-20T08:00:00.000Z");
      let second = new Date("2023-05-20T12:00:00.000Z");
      let third = new Date("2023-05-20T13:00:00.000Z");
      let fourth = new Date("2023-05-20T16:00:00.000Z");
      let fifth = new Date("2023-05-20T17:00:00.000Z");

      let timestamps = [first, second, third, fourth, fifth];

      expect(getAttendanceStatusByRecordings(timestamps)).toBe("PENDING");
    });

    it("Dado menos que 4 pontos, deve retornar pendente", () => {
      let first = new Date("2023-05-20T08:00:00.000Z");
      let second = new Date("2023-05-20T12:00:00.000Z");

      let timestamps = [first, second];

      expect(getAttendanceStatusByRecordings(timestamps)).toBe("PENDING");
    });

    it("Dado número de pontos registrados maior igual que 4 e par, deve retornar completo", () => {
      let first = new Date("2023-05-20T08:00:00.000Z");
      let second = new Date("2023-05-20T12:00:00.000Z");
      let third = new Date("2023-05-20T13:00:00.000Z");
      let fourth = new Date("2023-05-20T16:00:00.000Z");

      let timestamps = [first, second, third, fourth];

      expect(getAttendanceStatusByRecordings(timestamps)).toBe("DONE");
    });

  });

})