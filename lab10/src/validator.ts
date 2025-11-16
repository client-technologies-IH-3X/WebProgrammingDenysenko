export type ValidationResult = "ok" | "error";

export interface FormData {
  fullname: string;
  email: string;
  password: string;
  group: "IN31" | "IN32" | "IN33" | "";
  birthdate: string; 
  avatarcolour: string;
  bio: string;
  newsletter: boolean;
}

export type FieldName =
  | "fullname"
  | "email"
  | "password"
  | "group"
  | "birthdate"
  | "avatarcolour"
  | "bio"
  | "newsletter";

export function formatName(name: string): string {
  const trimmed = name.trim().toLowerCase();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function formatEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function formatBio(bio: string): string {
  return bio.trim();
}

export function validateName(name: string): boolean {
  if (name.length < 2) return false;

  const lettersRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ\s]+$/;
  if (!lettersRegex.test(name)) return false;

  if (name[0] !== name[0].toUpperCase()) return false;

  return true;
}

export function validateBirthdate(dateStr: string): boolean {
  if (!dateStr) return false;
  const birth = new Date(dateStr);
  const now = new Date();

  const age = now.getFullYear() - birth.getFullYear();
  return age >= 10;
}

export function validateEmail(email: string): boolean {
  if (!email.includes("@")) return false;

  const [_, domain] = email.split("@");
  if (!domain || !domain.includes(".")) return false;

  const allowed = ["gmail.com", "ukr.net"];
  return allowed.includes(domain);
}

export function validatePassword(pw: string): boolean {
  return pw.length >= 5;
}

export function validateGroup(group: string): boolean {
  return ["IN31", "IN32", "IN33"].includes(group);
}

export function validateAvatarColour(color: string): boolean {
  return [
    "avatarred",
    "avataryellow",
    "avatargreen",
    "avatarblue",
    "avatarpink",
    "avatarorange"
  ].includes(color);
}

export function validateBio(): boolean {
  return true;
}

export function validateNewsletter(): boolean {
  return true;
}

export function validateField(
  name: FieldName,
  value: unknown
): ValidationResult {
  switch (name) {
    case "fullname":
      return typeof value === "string" && validateName(value) ? "ok" : "error";

    case "email":
      return typeof value === "string" && validateEmail(value) ? "ok" : "error";

    case "password":
      return typeof value === "string" && validatePassword(value) ? "ok" : "error";

    case "group":
      return typeof value === "string" && validateGroup(value) ? "ok" : "error";

    case "birthdate":
      return typeof value === "string" && validateBirthdate(value) ? "ok" : "error";

    case "avatarcolour":
      return typeof value === "string" && validateAvatarColour(value)
        ? "ok"
        : "error";

    case "bio":
      return typeof value === "string" && validateBio() ? "ok" : "error";

    case "newsletter":
      return typeof value === "boolean" && validateNewsletter()
        ? "ok"
        : "error";

    default:
      const _never: never = name;
      return _never;
  }
}

export function validateForm(data: FormData): string[] {
  const errors: string[] = [];

  if (!validateName(data.fullname))
    errors.push("Ім'я повинно починатися з великої букви.");

  if (!validateEmail(data.email))
    errors.push("Мейл повинен бути gmail.com або ukr.net.");

  if (!validatePassword(data.password))
    errors.push("Пароль повинен бути більше 5 символьів.");

  if (!validateGroup(data.group))
    errors.push("Група не обрана.");

  if (!validateBirthdate(data.birthdate))
    errors.push("Дата народження не правильна(Вам не може бути менше 10 років).");

  if (!validateAvatarColour(data.avatarcolour))
    errors.push("Колір аватару неправильний.");

  return errors;
}
