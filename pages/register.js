import { useState } from "react";
import * as crypto from "crypto";
import styles from "../styles/RegisterAndLogin.module.css";

export default function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function saveUserInfo() {
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    window.localStorage.setItem(
      "user",
      JSON.stringify({  email: email , password : hashedPassword })
    );
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.form_container}>
        <div className={styles.form_header}> Registration form</div>
        <form onSubmit={saveUserInfo}>
          <div className={styles.fields_container}>
            <input
              type="name"
              className={styles.form_field}
              placeholder="Name"
            />

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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
