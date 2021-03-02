// @flow

import * as React from "react";
import { useState } from "react";
import Modal from "./Modal.js";
import TextInput from "./TextInput.js";
import "../App.css";
import type { Account } from "../state/useCookbookReducer.js";
import { HARDCODED_DEV_ACCOUNT } from "../constants/devData.js";

type Props = {
  onLoginSuccess: (Account) => void,
  onLoginFailure: (string) => void,
};

function LoginForm({ onLoginSuccess, onLoginFailure }: Props): React.Node {
  const [show, setShown] = useState(false);
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const loginButton = (
    <button
      style={{
        width: "100%",
      }}
      className="LargeButton"
      onClick={() => setShown(true)}
    >
      Login
    </button>
  );
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
        className="LargeButton"
        onClick={() => setShown(true)}
      >
        Login
      </button>
      <Modal
        isShown={show}
        onClose={() => setShown(false)}
        height={"200px"}
        width={"400px"}
      >
        <div className="Vertical" style={{ alignItems: "flex-end" }}>
          <TextInput
            value={userName}
            onChange={setUserName}
            placeholder="Username: "
            margin="16px 0px 8px 0px"
          />
          <TextInput
            value={pwd}
            onChange={setPwd}
            placeholder="Password: "
            type="password"
            margin="0px 0px 16px 0px"
          />
          <button
            className="LargeButton Confirm"
            onClick={() => onLoginSuccess(HARDCODED_DEV_ACCOUNT)}
          >
            Login
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default LoginForm;
