import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as crypto from "crypto";
import styles from "../styles/RegisterAndLogin.module.css";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  function clearToken() {
    window.localStorage.setItem("token", "");
    setIsLogin(false);
  }

  function validateUser(event) {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem("user"));

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    const checkUserInputDataWithLocalStorageUserData =
      user.email === email && user.password === hashedPassword;

    if (checkUserInputDataWithLocalStorageUserData) {
      const token = crypto.createHash("sha256").update(password).digest("hex");
      window.localStorage.setItem("token", token);
      setIsLogin(true);
    } else window.alert("Email or password is incorrect");
  }

  if (isLogin) {
    return (
      <div className={styles.main_container}>
        <button
          onClick={clearToken}
          style={{
            padding: "16px",
          }}
        >
          Logout
        </button>
      </div>
    );
  } else
    return (
      <div className={styles.main_container}>
        <div className={styles.form_container}>
          <div className={styles.form_header}>Login</div>
          <form onSubmit={validateUser}>
            <div className={styles.fields_container} style={{ gap: "16px" }}>
              <input
                type="email"
                value={email}
                className={styles.form_field}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                className={styles.form_field}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <button type="submit" className={styles.btn_submit}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}
