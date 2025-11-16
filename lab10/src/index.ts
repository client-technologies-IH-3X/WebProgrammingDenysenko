import {formatName, formatEmail, formatBio, validateName, validateEmail, validatePassword, validateBirthdate, validateGroup, validateAvatarColour, validateField, validateForm, FormData} from "./validator";

console.log('formatName("  дениС ") =>', formatName("  дениС "));
console.log('formatEmail("  TEST@GMAIL.COM  ") =>', formatEmail("  TEST@GMAIL.COM  "));
console.log('formatBio("  Hello world   ") =>', formatBio("  Hello world   "));

console.log('validateName("Денис") =>', validateName("Денис"));
console.log('validateName("денис") =>', validateName("денис")); // помилка — мала літера
console.log('validateEmail("test@gmail.com") =>', validateEmail("test@gmail.com"));
console.log('validateEmail("test@google.com") =>', validateEmail("test@google.com"));
console.log('validatePassword("12345") =>', validatePassword("12345"));
console.log('validatePassword("123") =>', validatePassword("123"));
console.log('validateBirthdate("2015-05-01") =>', validateBirthdate("2015-05-01"));
console.log('validateBirthdate("2020-01-01") =>', validateBirthdate("2020-01-01"));
console.log('validateGroup("IN31") =>', validateGroup("IN31"));
console.log('validateGroup("") =>', validateGroup(""));
console.log('validateAvatarColour("avatarblue") =>', validateAvatarColour("avatarblue"));
console.log('validateAvatarColour("wrongcolor") =>', validateAvatarColour("wrongcolor"));

console.log('\n--- validateField() ---');
console.log('validateField("fullname", "Денис") =>', validateField("fullname", "Денис"));
console.log('validateField("email", "test@gmail.com") =>', validateField("email", "test@gmail.com"));
console.log('validateField("group", "WRONG") =>', validateField("group", "WRONG"));

console.log('\n--- validateForm() ---');

const testData: FormData = {
  fullname: "Денис",
  email: "test@gmail.com",
  password: "12345",
  group: "IN31",
  birthdate: "2010-01-01",
  avatarcolour: "avatarpink",
  bio: "Потім щось напишу",
  newsletter: true
};

console.log("validateForm(testData) =>", validateForm(testData));

const badData: FormData = {
  fullname: "денис",
  email: "wrong@ukr.com",
  password: "12",
  group: "",
  birthdate: "2020-01-01",
  avatarcolour: "wrongcolor",
  bio: "",
  newsletter: false
};

console.log("\nvalidateForm(badData) =>", validateForm(badData));
