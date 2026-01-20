import React, { useState } from "react";

const FormValidation = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({});

  const HandleUpdate = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const Validate = (values) => {
    const err = {};

    if (!values.name.trim()) {
      err.name = "Name is Required";
    }
    if (!values.email.includes("@")) {
      err.email = "Email is invalid";
    }

    if (values.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }
    return err;
  };
  const HandleError = (e) => {
    e.preventDefault();
    const validationEror = Validate(input);
    setError(validationEror);

    if (Object.keys(validationEror).length > 0) return;

    console.log("Form submitted:", input);
  };

  return (
    <div>
      <form onSubmit={HandleError}>
        <input
          type="text"
          name="name"
          placeholder="Enter you Name"
          value={input.name}
          onChange={HandleUpdate}
        />
           {error.name && <p>{error.name}</p>}
        <input
          type="text"
          name="email"
          placeholder="Enter you E-mail"
          value={input.email}
          onChange={HandleUpdate}
          />
           {error.email && <p>{error.email}</p>}
        
        <input
          type="password"
          name="password"
          placeholder="Enter you Password"
          value={input.password}
          onChange={HandleUpdate}
         
        />
         {error.password && <p>{error.password}</p>}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FormValidation;
