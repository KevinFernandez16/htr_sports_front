import React from "react";
import "../pages/css/error.css";

import { MainLayout } from "./mainLayout";
const Error = () => {
  return (
    <div className="Error" style={styles.container}>
      <MainLayout>
        <div>
        </div>
        <a href="/">
          <button
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#ec6a00",
              fontWeight: "bolder",
            }}
          >
            Go to Homepage
          </button>
        </a>
      </MainLayout>
    </div>
  );
};

export default Error;

const styles = {
  container: {
    backgroundImage: `url(https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  },
};
