import React from "react";
import { Grid, InputAdornment, IconButton } from "@mui/material";
import { AuthTextfield } from "./styles";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

export default function Input(props) {
  return (
    <Grid item xs={12} sm={props.half ? 6 : 12}>
      <AuthTextfield
        name={props.name}
        onChange={props.handleChange}
        variant="outlined"
        required
        fullWidth
        label={props.label}
        autoFocus={props.autoFocus}
        type={props.type}
        InputProps={
          props.name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={props.handleShowPassword}>
                      {props.type === "password" ? (
                        <MdVisibility />
                      ) : (
                        <MdVisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
}
