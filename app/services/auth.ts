import axios from "axios";

const signUpUser = async (data: Object) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      data
    );

    const result = res.data;

    console.log("SignUp:", result);

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    // Redirect
    // router.push("/dashboard");
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "An error occurred";
    alert(errorMessage);
  }
};

const signInUser = async (data: Object) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      data
    );

    const result = res.data;

    console.log("Logged in:", result);

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    // Redirect
    // router.push("/dashboard");
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.message || err.message || "An error occurred";
    alert(errorMessage);
  }
};

export { signUpUser , signInUser };
