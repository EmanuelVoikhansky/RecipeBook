// @flow

import * as React from "react";
import { useState } from "react";
import Modal from "./Modal.js";
import TextInput from "./TextInput.js";
import "../App.css";
import type { Account } from "../state/useCookbookReducer.js";
import { HARDCODED_DEV_ACCOUNT } from "../constants/devData.js";
import { commitMutation } from "./GraphQLCallers.js";

type Props = {
  onLoginSuccess: (Account, string) => void,
};

const LOGIN = `
  mutation Login($pwd: String!, $email: String!) {
    login(password: $pwd, email: $email) {
      token
      account {
        id
        name
      }
    }
  }
`;

function LoginForm({ onLoginSuccess }: Props): React.Node {
  const [show, setShown] = useState(false);
  const [error, setError] = useState(null);
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
          {error != null ? <p style={{ textColor: "red" }}>{error}</p> : null}
          <button
            className="LargeButton Confirm"
            onClick={() => {
              setError(null);
              commitMutation(
                LOGIN,
                {
                  email: userName,
                  pwd,
                },
                (response) =>
                  onLoginSuccess(
                    response.data.login.account,
                    response.data.login.token
                  ),
                (error) => setError(error)
              );
            }}
          >
            Login
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default LoginForm;
