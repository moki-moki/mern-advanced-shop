const baseURL = "/api/auth";

const register = async (user) => {
  const registerOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    }),
  };
  try {
    return await fetch(`${baseURL}/register`, registerOptions);
  } catch (error) {
    console.log(error);
  }
};

const login = async (user) => {
  const res = await fetch(`${baseURL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });

  const req = await res.json();
  console.log(req);

  return req;
};

const authServices = {
  register,
  login,
};

export default authServices;
