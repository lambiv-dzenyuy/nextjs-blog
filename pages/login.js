import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as crypto from "crypto";
import styles from "../styles/RegisterAndLogin.module.css";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenInStorage = window.localStorage.getItem("token")
    if(tokenInStorage != null)
      setToken(tokenInStorage);
  }, []);

  function clearToken() {
    window.localStorage.setItem("token", "");
    console.log(token);
    router.reload();
  }

  function validateUser(event) {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem("user"));

    const checkUserInputDataWithLocalStorageUserData =
      user.email === email && user.password === password;

    if (checkUserInputDataWithLocalStorageUserData) {
      const token = crypto.createHash("sha256").update(password).digest("hex");
      window.localStorage.setItem("token", token);
      router.reload();
    } else window.alert("Email or password is incorrect");
  }

  if (token.length()) {
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
