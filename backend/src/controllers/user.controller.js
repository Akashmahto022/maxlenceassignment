const userRegister = async (req, res) => {
  const { email, password } = req.body;
  console("building user register api");
};

const verifyUser = async (req, res) => {
  const { token } = req.query;
};

export { userRegister, verifyUser };
