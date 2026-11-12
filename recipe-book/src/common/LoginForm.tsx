import * as React from "react";
import { useState } from "react";
import Modal from "./Modal";
import TextInput from "./TextInput";
import "../App.css";
import type { Account } from "../state/useCookbookReducer";
import { HARDCODED_DEV_ACCOUNT } from "../constants/devData";

type Props = {
  onLoginSuccess: (account: Account) => void,
  onLoginFailure: (reason: string) => void,
};

function LoginForm({ onLoginSuccess, onLoginFailure }: Props): JSX.Element {
  const [show, setShown] = useState(false);
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <button
        style={{
          width: "100%",
        }}
        onClick={() => setShown(true)}
      >
        Login
      </button>
      <Modal
        isShown={show}
        onClose={() => setShown(false)}
        height="auto"
        width="400px"
      >
        <div className="Vertical" style={{ alignItems: "flex-end" }}>
          <TextInput
            value={userName}
            onChange={setUserName}
            placeholder="Username"
            margin="0px 0px 8px 0px"
            style={{ width: "100%" }}
          />
          <TextInput
            value={pwd}
            onChange={setPwd}
            placeholder="Password"
            type="password"
            margin="0px 0px 16px 0px"
            style={{ width: "100%" }}
          />
          <button onClick={() => onLoginSuccess(HARDCODED_DEV_ACCOUNT)}>
            Login
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default LoginForm;
