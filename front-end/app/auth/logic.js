import { toast } from "react-hot-toast";

export const validate = (username, password, secondpassword, isLogin) => {
  const newErrors = {};
  if (!username.trim()) newErrors.username = "Username is required";
  if (!password) newErrors.password = "Password is required";
  if (!isLogin && !secondpassword) {
    newErrors.secondpassword = "Please re-enter password";
  }
  if (!isLogin && password && secondpassword && password !== secondpassword) {
    newErrors.secondpassword = "Passwords do not match";
  }
  return newErrors;
};

export const handleCapsKey = (e, setCapsLockon) => {
  const caps = e.getModifierState && e.getModifierState("CapsLock");
  setCapsLockon(caps);
};

export const fetchWithRefresh = async (url, options = {}) => {
  const getStorage = () =>
    localStorage.getItem("token") ? localStorage : sessionStorage;

  let storage = getStorage();
  let token = storage.getItem("token");

  const makeRequest = async () => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  let response = await makeRequest();

  if (response.status === 401) {
    const refreshToken = storage.getItem("refreshToken");
    if (!refreshToken) return response;

    const refreshRes = await fetch("http://localhost:5057/api/user/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshRes.ok) return response;

    const { token: newToken } = await refreshRes.json();

    storage.setItem("token", newToken);
    token = newToken;

    response = await makeRequest();
  }

  return response;
};


export const handleSubmit = async ({
  e,
  username,
  password,
  secondpassword,
  isLogin,
  setErrors,
  setLoading,
  rememberMe,
  router,
}) => {
  e.preventDefault();

  const validationErrors = validate(username, password, secondpassword, isLogin);
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  setLoading(true);

  try {
    const endpoint = isLogin ? "login" : "register";

    const res = await fetch(`http://localhost:5057/api/user/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: isLogin
        ? JSON.stringify({ username, password, RememberMe: rememberMe })
        : JSON.stringify({ username, password }),
    });

    const raw = await res.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }

    if (!res.ok) {
      const errorMessage =
        typeof data === "string"
          ? data
          : data?.message || (isLogin ? "Login Failed" : "Signup Failed");
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    toast.success(isLogin ? "Login successful!" : "Signup Successful");

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");

    if (rememberMe) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
    } else {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("refreshToken", data.refreshToken);
    }

    router.push("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};
