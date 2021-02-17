// @flow

import * as React from "react";
import Icon from "./Icon.js";
import user from "../assets/user.jpg";

type Props = {
  account: Account,
};

export type Account = {
  name: string,
  profilePicUrl?: string,
};

function AccountWidget({ account }: Props): React.Node {
  return (
    <div
      className="Border Horizontal"
      style={{
        justifyContent: "space-between",
      }}
    >
      <span className="Horizontal">
        <img
          style={{
            borderRadius: "50%",
            height: "120px",
            width: "120px",
            border: "1px solid black",
            marginRight: "8px",
          }}
          src={account.profilePicUrl ?? user}
        />
        <p>{account.name}</p>
      </span>
      <Icon icon="faPencilAlt" margin="-2px 4px 0px 0px" />
    </div>
  );
}

export default AccountWidget;
