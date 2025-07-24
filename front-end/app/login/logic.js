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

export const handleSubmit = async ({
  e,
  username,
  password,
  secondpassword,
  isLogin,
  setErrors,
  setLoading,
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
      body: JSON.stringify({ username, password: password }),
    });

    const text = await res.text();

    if (!res.ok) {
      alert(text);
    } else {
      alert(text);
    }
  } catch (error) {
    alert("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};

