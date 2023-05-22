import { describe, expect, it } from "vitest";
import { validateUser } from "./service/postUser";
import { ApiError } from "../../models/Error";

describe("UserModule" , () => {

  describe("Validação de usuário", () => {

    describe("Dado e-mail inválido", () => {

      it("sem caracter @, deve lançar ApiError", () => {
        const body = {
          email: 'invalid_email.com',
          name: 'Name'
        };

        expect(() => validateUser(body)).toThrowError();
      })

      it("que não termina com domínio, deve lançar ApiError", () => {
        const body = {
          email: 'invalid_email@gmail',
          name: 'Name'
        };

        expect(() => validateUser(body)).toThrowError();
      })

      it("que não tem subdomínio, deve lançar ApiError", () => {
        const body = {
          email: 'invalid_email@.com',
          name: 'Name'
        };

        expect(() => validateUser(body)).toThrowError();
      })

      it("que não tem nome do utilizador, deve lançar ApiError", () => {
        const body = {
          email: '@gmail.com',
          name: 'Name'
        };

        expect(() => validateUser(body)).toThrowError();
      })
    });

    describe("Dado nome inválido", () => {
      it("que tem menos de 3 caracteres, deve lançar ApiError", () => {
        const body = {
          email: 'valid_email@gmail.com',
          name: 'a'
        };

        expect(() => validateUser(body)).toThrowError();
      });

      it("que tem caracter especial, deve lançar ApiError", () => {
        const body = {
          email: 'valid_email@gmail.com',
          name: 'Inv@lid Name'
        };

        expect(() => validateUser(body)).toThrowError();
      });
    });

    describe("Dado nome e e-mail válidos", () => {
      it("deve retornar válido", () => {
        const body = {
          email: 'valid_email@gmail.com',
          name: 'valid name'
        };

        expect(validateUser(body)).toBe(true);
      });

    });

  });

});