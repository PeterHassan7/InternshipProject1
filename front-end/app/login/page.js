"use client";

import { useState } from "react";
import styling from "./page.module.css";
import { handleSubmit, handleCapsKey } from "./logic";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondpassword, setSecondpassword] = useState("");
  const [showpass1, setShowpass1] = useState(false);
  const [showpass2, setShowpass2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [capslockon, setCapsLockon] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});

  return (
    <div className={styling.page}>
      <main className={styling.main}>
        <div className={styling.togglecontainer}>
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setSecondpassword("");
              setErrors({});
            }}
            disabled={isLogin}
            className={styling.togglebutton}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setSecondpassword("");
              setErrors({});
            }}
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
            aria-invalid={errors.username ? "true" : "false"}
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
              aria-invalid={errors.password ? "true" : "false"}
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
                  aria-invalid={errors.secondpassword ? "true" : "false"}
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
            <div className={styling.capswarning}>
              ⚠️ Warning: Caps Lock is ON
            </div>
          )}

          <button type="submit" className={styling.button} disabled={loading}>
            {loading
              ? isLogin
                ? "Logging in…"
                : "Signing up…"
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
        </form>
      </main>
    </div>
  );
}
