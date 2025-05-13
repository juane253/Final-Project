const mongoose = require('mongoose');
const State = require('./models/statesModels');
require('dotenv').config();

const seedData = [
  {
    stateCode: 'KS',
    funfacts: [
      'Kansas is home to the geographic center of the 48 contiguous states.',
      'The first woman mayor in the United States was elected in Argonia, Kansas in 1887.',
      'Dodge City, Kansas, is known as the windiest city in the United States.'
    ]
  },
  {
    stateCode: 'MO',
    funfacts: [
      'Missouri is home to the world’s largest chess piece in St. Louis.',
      'The ice cream cone was popularized at the 1904 World\'s Fair in St. Louis.',
      'Branson, Missouri, has more theater seats than Broadway.'
    ]
  },
  {
    stateCode: 'OK',
    funfacts: [
      'The first parking meter was installed in Oklahoma City in 1935.',
      'Oklahoma has more man-made lakes than any other state.',
      'The state capitol building is the only one with an active oil well underneath it.'
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    await State.deleteMany({ stateCode: { $in: ['KS', 'MO', 'OK'] } }); // Optional: Clear old data
    await State.insertMany(seedData);
    console.log('Fun facts seeded!');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seed();