const State = require('/Users/juanenriquez/Desktop/Back End Final Project/Models/statesModels');
const statesData = require('/Users/juanenriquez/Desktop/Back End Final Project/statesData');
const getStateData = (code) => statesData.find(st => st.code === code.toUpperCase());

const getAllStates = async (req, res) => {
  let states = [...statesData];
  if (req.query.contig === 'true') {
    states = states.filter(st => st.code !== 'AK' && st.code !== 'HI');
  } else if (req.query.contig === 'false') {
    states = states.filter(st => st.code === 'AK' || st.code === 'HI');
  }

  const dbStates = await State.find();
  states = states.map(st => {
    const match = dbStates.find(db => db.stateCode === st.code);
    return match ? { ...st, funfacts: match.funfacts } : st;
  });

  res.json(states);
};

const getState = async (req, res) => {
  const code = req.params.state.toUpperCase();
  const state = getStateData(code);
  if (!state) return res.status(404).json({ error: 'Invalid state abbreviation parameter' });

  const dbEntry = await State.findOne({ stateCode: code });
  if (dbEntry) state.funfacts = dbEntry.funfacts;
  res.json(state);
};

const getFunFact = async (req, res) => {
  const code = req.params.state.toUpperCase();
  const dbEntry = await State.findOne({ stateCode: code });
  if (!dbEntry || !dbEntry.funfacts || dbEntry.funfacts.length === 0)
    return res.status(404).json({ message: `No Fun Facts found for ${code}` });

  const fact = dbEntry.funfacts[Math.floor(Math.random() * dbEntry.funfacts.length)];
  res.json({ funfact: fact });
};

const createFunFact = async (req, res) => {
  const code = req.params.state.toUpperCase();
  const { funfacts } = req.body;
  if (!Array.isArray(funfacts)) return res.status(400).json({ message: 'State fun facts value required' });

  let state = await State.findOne({ stateCode: code });
  if (state) {
    state.funfacts.push(...funfacts);
  } else {
    state = new State({ stateCode: code, funfacts });
  }

  const result = await state.save();
  res.json(result);
};

const updateFunFact = async (req, res) => {
  const code = req.params.state.toUpperCase();
  const { index, funfact } = req.body;
  if (!index || !funfact) return res.status(400).json({ message: 'State fun fact index and value required' });

  const state = await State.findOne({ stateCode: code });
  if (!state || !state.funfacts || index < 1 || index > state.funfacts.length)
    return res.status(404).json({ message: `No Fun Fact found at that index for ${code}` });

  state.funfacts[index - 1] = funfact;
  const result = await state.save();
  res.json(result);
};

const deleteFunFact = async (req, res) => {
  const code = req.params.state.toUpperCase();
  const { index } = req.body;
  if (!index) return res.status(400).json({ message: 'State fun fact index value required' });

  const state = await State.findOne({ stateCode: code });
  if (!state || !state.funfacts || index < 1 || index > state.funfacts.length)
    return res.status(404).json({ message: `No Fun Fact found at that index for ${code}` });

  state.funfacts.splice(index - 1, 1);
  const result = await state.save();
  res.json(result);
};

const getCapital = (req, res) => {
  const code = req.params.state.toUpperCase();
  const state = getStateData(code);
  if (!state) return res.status(404).json({ error: 'Invalid state abbreviation parameter' });

  res.json({ state: state.state, capital: state.capital_city });
};

const getNickname = (req, res) => {
  const code = req.params.state.toUpperCase();
  const state = getStateData(code);
  if (!state) return res.status(404).json({ error: 'Invalid state abbreviation parameter' });

  res.json({ state: state.state, nickname: state.nickname });
};

const getPopulation = (req, res) => {
  const code = req.params.state.toUpperCase();
  const state = getStateData(code);
  if (!state) return res.status(404).json({ error: 'Invalid state abbreviation parameter' });

  res.json({ state: state.state, population: state.population });
};

const getAdmission = (req, res) => {
  const code = req.params.state.toUpperCase();
  const state = getStateData(code);
  if (!state) return res.status(404).json({ error: 'Invalid state abbreviation parameter' });

  res.json({ state: state.state, admitted: state.admission_date });
};

module.exports = {
  getAllStates,
  getState,
  getFunFact,
  createFunFact,
  updateFunFact,
  deleteFunFact,
  getCapital,
  getNickname,
  getPopulation,
  getAdmission
};