// @flow

import * as React from "react";
import { useState } from "react";
import Icon from "./Icon.js";
import EditableImage from "./EditableImage.js";
import TextInput from "./TextInput.js";
import Image from "./Image.js";
import user from "../assets/user.jpg";
import type { Account } from "../state/useCookbookReducer.js";

type Props = {
  account: Account,
  onUpdateAccount: (Account) => void,
};

const PORTRAIT_FALLBACK = {
  border: "1px solid black",
  borderRadius: "50%",
};

function AccountWidget(props: Props): React.Node {
  const [account, setAccount] = useState(props.account);
  const [editMode, setEditMode] = useState(false);

  const fallback = (
    <Image src={user} size="120px" styleOverride={PORTRAIT_FALLBACK} />
  );

  return (
    <div
      className="Border Horizontal"
      style={{
        justifyContent: "space-between",
      }}
    >
      <span className="Horizontal">
        <EditableImage
          fallback={fallback}
          src={account.profilePicUrl}
          onChange={
            editMode
              ? (profilePicUrl) => setAccount({ ...account, profilePicUrl })
              : undefined
          }
          size="120px"
          styleOverride={PORTRAIT_FALLBACK}
        />
        {editMode ? (
          <TextInput
            value={account.name}
            onChange={(name) => setAccount({ ...account, name })}
            placeHolder="Name: "
            margin="16px 0px 0px 8px"
            style={{ height: "24px" }}
          />
        ) : (
          <p>{account.name}</p>
        )}
      </span>
      {editMode ? (
        <button
          className="LargeButton"
          onClick={() => {
            props.onUpdateAccount(account);
            setEditMode(false);
          }}
        >
          Save
        </button>
      ) : (
        <Icon
          icon="faPencilAlt"
          margin="-2px 4px 0px 0px"
          onClick={() => setEditMode(true)}
        />
      )}
    </div>
  );
}

export default AccountWidget;
