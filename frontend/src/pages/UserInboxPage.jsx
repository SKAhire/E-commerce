import React from "react";
import Headers from "../components/layout/Headers";
import UserInbox from "../components/Profile/UserInbox";
import styles from "../styles/styles.js";

const UserInboxPage = () => {
  return (
    <div>
      <Headers />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <UserInbox active={4} />
      </div>

    </div>
  );
};

export default UserInboxPage;
