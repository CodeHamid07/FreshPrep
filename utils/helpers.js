import { faker } from '@faker-js/faker';


/**
 * This function generate Random Full Name using Faker.js
 * @returns {string} A random full name
 */
export function generateRandomFullName() {
  return faker.person.fullName(); // or faker.name.fullName() if using older versions
}

/**
 * This function generate Random Email using Faker.js
 * @returns {string} A random email address
 */
export function generateRandomEmail() {
  return faker.internet.email();
}

/** * This function generates a random text.
 * @returns {string} A random text
 */
export function generateRandomText(length = 100) {
  return faker.lorem.text().slice(0, length);
}

/***
 * This function is for validation of text
 */

export async function validateText(locator, expectedText) {
  await expect(locator).toHaveText(expectedText);
}