import api from "./axios";

const signUpUser = async (data: any) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

const signUpCreator = async (data: any) => {
  const res = await api.post("/auth/signup/creator", data);
  return res.data;
};

const signInUser = async (data: any) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export { signUpUser, signUpCreator, signInUser, logout };
