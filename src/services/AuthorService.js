const notPermittedAcess = {
  error: true,
  message: 'Only administrator can access',
};

const register = async (name, picture, role) => {
  if (role !== 'admin') return notPermittedAcess;
};

// const findAll = async (req, res) => {

// };

// const findById = async (req, res) => {

// };

// const update = async (req, res) => {

// };

// const remove = async (req, res) => {

// };

module.exports = {
  register,
  // findById,
  // findAll,
  // remove,
  // update,
};
