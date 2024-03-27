import { Avatar, Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AuthPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

export const AuthTextfield = styled(TextField)(({ theme }) => ({
  "& .MuiTextField-root": {
    margin: theme.spacing(1),
  },
}));

export const AuthAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

export const AuthForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

export const AuthSubmit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));
