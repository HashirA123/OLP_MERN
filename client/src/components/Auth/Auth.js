import React, { useContext, useState } from "react";
import { Grid, Typography, Container, Button, Alert } from "@mui/material";
import { FaUserLock } from "react-icons/fa";
import Input from "./Input.js";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { SIGN_UP, SIGN_UP_GOOGLE } from "../../mutations/authMutations.js";
import { SIGN_IN } from "../../queries/authQueries.js";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { AuthAvatar, AuthForm, AuthPaper, AuthSubmit } from "./styles.js";
import { AuthContext } from "./authContext.js";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState();
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [signUpGoogle] = useMutation(SIGN_UP_GOOGLE);
  const [signIn] = useLazyQuery(SIGN_IN);
  const [signUp] = useMutation(SIGN_UP);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      signUp({
        variables: {
          firstName: formData["firstName"],
          lastName: formData["lastName"],
          email: formData["email"],
          password: formData["password"],
          confirmPassword: formData["confirmPassword"],
        },
        fetchPolicy: "no-cache",
        update(proxy, { data: { signUp } }) {
          context.login(signUp);
          navigate("/");
        },
        onError({ graphQLErrors }) {
          setErrors(graphQLErrors);
        },
      });
    } else {
      signIn({
        variables: {
          email: formData["email"],
          password: formData["password"],
        },
        fetchPolicy: "no-cache",
        onCompleted(data) {
          context.login(data.signIn);
          navigate("/");
        },
        onError({ graphQLErrors }) {
          setErrors(graphQLErrors);
        },
      });
    }
  };

  const googleSuccess = async (credentialResponse) => {
    var decoded = jwtDecode(credentialResponse?.credential);
    // console.log(decoded);
    signUpGoogle({
      variables: {
        name: decoded["name"],
        email: decoded["email"],
        pfp: decoded["picture"],
      },
      fetchPolicy: "no-cache",
      update(proxy, { data: { signUpGoogle } }) {
        context.login(signUpGoogle);
        navigate("/");
      },
      onError({ graphQLErrors }) {
        setErrors(graphQLErrors);
      },
    });
  };

  const googleFailure = () => {
    console.log("Google auth failed");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <AuthPaper elevation={3}>
        <AuthAvatar>
          <FaUserLock />
        </AuthAvatar>
        <Typography variant="h5">{isSignup ? "sign up" : "sign in"}</Typography>
        <AuthForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>

          {errors && <Alert severity="error">{errors[0]?.message}</Alert>}

          <AuthSubmit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {isSignup ? "Sign up" : "Sign in"}
          </AuthSubmit>
          <Grid container justifyContent="center">
            <Grid item marginBottom="10px">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  googleSuccess(credentialResponse);
                }}
                onError={() => {
                  googleFailure();
                }}
                useOneTap={false}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-around">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? sign in"
                  : "Don't have an account? sign up"}
              </Button>
            </Grid>
          </Grid>
        </AuthForm>
      </AuthPaper>
    </Container>
  );
}
