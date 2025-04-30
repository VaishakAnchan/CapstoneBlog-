import { SignUp } from "@clerk/clerk-react";
import React from "react";

const Register = () => {
  return (
    <div className="flex items-center justify-center mt-16">
      <SignUp signInUrl="login" />
    </div>
  );
};

export default Register;
