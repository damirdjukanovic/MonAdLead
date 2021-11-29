import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import s from "./Login.module.css";

export default function BasicTextFields(props) {
  const { setUsername, setPassword, password, username } = props;

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { marginBottom: "30px", width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        className={s.TextField}
        onChange={handleUsername}
        value={username}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        type="password"
        variant="outlined"
        className={s.TextField}
        onChange={handlePassword}
        value={password}
      />
    </Box>
  );
}
