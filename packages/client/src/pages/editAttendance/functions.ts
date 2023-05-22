export function timestampMask(str: string) {
  return str
    .replace(/\D/g, "")
    .replace(/^(\d{2})(.*)$/, "$1:$2")
    .replace(/^(\d{2}):(\d{2}).*$/, "$1:$2")
    .replace(/^[3-9](\d.*)$/, "2$1")
    .replace(/^2[4-9](.*)$/, "23$1")
    .replace(/^(.{3})[6-9](\d)?$/, "$15$2");
}

export function isTimestamp(str: string) {
  const reg = /^\d{2}:\d{2}$/;
  return reg.test(str);
}
