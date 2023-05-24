import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/RegisterAndLogin.module.css";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function validateUser(event) {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem("user"));

    const checkUserInputDataWithLocalStorageUserData =
      user.email === email && user.password === password;
    window.alert("status " + checkUserInputDataWithLocalStorageUserData);
  }

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
