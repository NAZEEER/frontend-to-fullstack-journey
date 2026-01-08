import React, { useState } from "react";

const FormControl = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
      <button onClick={(e)=>{e.preventDefault();console.log(form);
      }}>Submit</button>
      </form>
    </div>
  );
};

export default FormControl;
