import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../server";
import styles from "../styles/styles";

function ActivationPage() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activationToken: activation_token,
          });
          console.log(res.data.message);
        } catch (error) {
          setError(true);
        }
      };

      activationEmail();
    }
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {error ? (
        <>
          <p>Your token is expired!</p>
          <Link to={"/"}>
            <div className={`${styles.button}`}>
              <span className="text-white">Go Back</span>
            </div>
          </Link>
        </>
      ) : (
        <>
          <p>Your account has been created suceessfully!</p>
          <Link to={"/login"}>
            <div className={`${styles.button}`}>
              <span className="text-white">Login</span>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}

export default ActivationPage;
