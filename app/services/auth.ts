import axios from "axios";

const signUpUser = async (data: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
    data
  );
  return res.data;
};


const signInUser = async (data: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
    data
  );
  return res.data; // Sirf data return karein
};

export { signUpUser, signInUser };
