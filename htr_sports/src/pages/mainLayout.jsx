import React from "react";
import Header from "../components/header";

const MainLayout = (props) => {
    return <div>
            <Header />
            {props.children}
          </div>
}

export {MainLayout}