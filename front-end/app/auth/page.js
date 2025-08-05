'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styling from "./page.module.css";
import { handleSubmit, handleCapsKey } from "./logic";
import { Toaster } from "react-hot-toast";
import zxcvbn from "zxcvbn";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeFromUrl = searchParams.get("mode") || "login";
  const isLogin = modeFromUrl === "login";


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondpassword, setSecondpassword] = useState("");
  const [showpass1, setShowpass1] = useState(false);
  const [showpass2, setShowpass2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [capslockon, setCapsLockon] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe , setrememberMe] = useState(false);
  const strength = zxcvbn(password);


  function toggleMode(newMode) {
  router.replace(`/auth?mode=${newMode}`, undefined, { shallow: true });
  setSecondpassword("");
  setErrors({});
}


  return (
    <div className={styling.page}>
      <main className={styling.main}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ style: { background: "hsl(var(--background))", color: "hsl(var(--foreground))" } }}
        />
        <div className={styling.togglecontainer}>
          <button
            type="button"
            onClick={() => toggleMode("login")}
            disabled={isLogin}
            className={styling.togglebutton}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => toggleMode("register")}
            disabled={!isLogin}
            className={styling.togglebutton}
          >
            Sign Up
          </button>
        </div>

        <form
          onSubmit={(e) =>
            handleSubmit({
              e,
              username,
              password,
              secondpassword,
              isLogin,
              setErrors,
              setLoading,
              rememberMe,
              router,
            })
          }
          noValidate
        >
          <input
            type="text"
            placeholder={isLogin ? "Username" : "Create a Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styling.input}
            disabled={loading}
          />
          {errors.username && <div className={styling.error}>{errors.username}</div>}

          <div className={styling.passbox}>
            <input
              type={showpass1 ? "text" : "password"}
              placeholder={isLogin ? "Password" : "Create a Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleCapsKey(e, setCapsLockon)}
              onKeyUp={(e) => handleCapsKey(e, setCapsLockon)}
              className={styling.input}
              disabled={loading}
            />
            <button
              type="button"
              className={styling.passbutton}
              onClick={() => setShowpass1(!showpass1)}
              disabled={loading}
            >
              <img
                src={showpass1 ? "/hidepass.svg" : "/showpass.svg"}
                alt={showpass1 ? "Hide password" : "Show password"}
                className={styling.passview}
                draggable={false}
              />
            </button>
          </div>
          {errors.password && <div className={styling.error}>{errors.password}</div>}
          {!isLogin && password && (
       <div className={styling.strengthWrapper}>
       <div className={styling.strengthBars}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`${styling.strengthBar} ${
            i <= strength.score ? styling[`score-${strength.score}`] : ""
          }`}
        />
          ))}
       </div>
        <div className={`${styling.strengthText} ${styling[`score-${strength.score}`]}`}>
          Strength: {["Very Weak", "Weak", "Fair", "Good", "Strong"][strength.score]}
       </div>
   </div>
    )}

          {isLogin && (
            <div className={styling.rememberme}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setrememberMe(e.target.checked)}
                disabled={loading}
                />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
          )}
          {!isLogin && (
            <>
              <div className={styling.passbox}>
                <input
                  type={showpass2 ? "text" : "password"}
                  placeholder="Re-enter Password"
                  value={secondpassword}
                  onChange={(e) => setSecondpassword(e.target.value)}
                  onKeyDown={(e) => handleCapsKey(e, setCapsLockon)}
                  onKeyUp={(e) => handleCapsKey(e, setCapsLockon)}
                  className={styling.input}
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styling.passbutton}
                  onClick={() => setShowpass2(!showpass2)}
                  disabled={loading}
                >
                  <img
                    src={showpass2 ? "/hidepass.svg" : "/showpass.svg"}
                    alt={showpass2 ? "Hide password" : "Show password"}
                    className={styling.passview}
                    draggable={false}
                  />
                </button>
              </div>
              {errors.secondpassword && (
                <div className={styling.error}>{errors.secondpassword}</div>
              )}
            </>
          )}

          {capslockon && (
            <div className={styling.capswarning}>⚠️ Warning: Caps Lock is ON</div>
          )}

          <button type="submit" className={styling.button} disabled={loading}>
            {loading ? (isLogin ? "Logging in…" : "Signing up…") : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </main>
    </div>
  );
}
