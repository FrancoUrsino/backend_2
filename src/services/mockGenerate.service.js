import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export function generateMockUser() {
  const password = bcrypt.hashSync('coder123', 10);
  const role = faker.helpers.arrayElement(['user', 'admin']);

  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password,
    role,
    pets: []
  };
}

export function generateMockPet() {
  return {
    name: faker.animal.cat(),
    species: faker.animal.type(),
    age: faker.number.int({ min: 1, max: 15 })
  };
}
