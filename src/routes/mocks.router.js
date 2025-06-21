import { Router } from 'express';
import { generateMockUser, generateMockPet } from '../services/mockGenerate.service.js';
import { User } from '../models/user.model.js';
import PetModel from '../models/pet.model.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
  const pets = [];
  for (let i = 0; i < 100; i++) {
    pets.push(generateMockPet());
  }
  res.json({ pets });
});

router.get('/mockingusers', (req, res) => {
  const users = [];
  for (let i = 0; i < 50; i++) {
    users.push(generateMockUser());
  }
  res.json({ users });
});

router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  const userPromises = Array.from({ length: users }, () => User.create(generateMockUser()));
  const petPromises = Array.from({ length: pets }, () => PetModel.create(generateMockPet()));

  try {
    const createdUsers = await Promise.all(userPromises);
    const createdPets = await Promise.all(petPromises);

    res.json({
      message: 'Datos generados correctamente',
      users: createdUsers.length,
      pets: createdPets.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al generar datos', details: error.message });
  }
});

export default router;
