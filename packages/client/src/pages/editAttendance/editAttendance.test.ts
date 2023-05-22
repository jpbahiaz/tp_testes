import { describe, expect, it } from "vitest";
import { isTimestamp, timestampMask } from "./functions";

describe("EditAttendance Component", () => {
  it("should remove letters from timestamp input", () => {
    expect(timestampMask("abk08:12")).toEqual("08:12");
    expect(timestampMask("08:12gja")).toEqual("08:12");
    expect(timestampMask("0ad8:1hlk2")).toEqual("08:12");
  });

  it("should place : after 2 digits on timestamp input", () => {
    expect(timestampMask("08")).toEqual("08:");
  })

  it("should prevent more than 4 numbers on timestamp input", () => {
    expect(timestampMask("08304523")).toEqual("08:30");
    expect(timestampMask("08:304523")).toEqual("08:30");
    expect(timestampMask("0452305632312")).toEqual("04:52");
  })

  it("should prevent the first hour digit to be more than 2 on timestamp input", () => {
    expect(timestampMask("32:00")).toEqual("22:00");
    expect(timestampMask("92:30")).toEqual("22:30");
    expect(timestampMask("12:30")).toEqual("12:30");
  })

  it("should prevent the second hour digit to be more than 3 if hours > 20 on timestamp input", () => {
    expect(timestampMask("24:00")).toEqual("23:00");
    expect(timestampMask("29:00")).toEqual("23:00");
    expect(timestampMask("23:30")).toEqual("23:30");
  })

  it("should prevent the first minute digit to be more than 5 on timestamp input", () => {
    expect(timestampMask("23:60")).toEqual("23:50");
    expect(timestampMask("12:92")).toEqual("12:52");
    expect(timestampMask("23:59")).toEqual("23:59");
  })

  it("should return true if string is timestamp", () => {
    expect(isTimestamp("08:00")).toBeTruthy()
    expect(isTimestamp("08:0")).toBeFalsy()
    expect(isTimestamp("08:")).toBeFalsy()
    expect(isTimestamp("08")).toBeFalsy()
    expect(isTimestamp("0")).toBeFalsy()
    expect(isTimestamp("abcdw")).toBeFalsy()
    expect(isTimestamp("0800")).toBeFalsy()
    expect(isTimestamp("0800")).toBeFalsy()
  })
});
