import React, { useState } from "react";
import { Grid, Typography, Container, Button } from "@mui/material";
import { FaUserLock } from "react-icons/fa";
import Input from "./Input.js";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { SIGN_UP_GOOGLE } from "../../mutations/authMutations.js";
import { useMutation } from "@apollo/client";

import { AuthAvatar, AuthForm, AuthPaper, AuthSubmit } from "./styles.js";
import { PROFILE } from "../../queries/authQueries.js";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [signUpGoogle, { loading, error, data }] = useMutation(SIGN_UP_GOOGLE);
  const handleSubmit = () => {};

  const handleChange = () => {};

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  const googleSuccess = async (credentialResponse) => {
    var decoded = jwtDecode(credentialResponse?.credential);

    // console.log(decoded);

    await signUpGoogle({
      variables: {
        name: decoded["name"],
        email: decoded["email"],
        pfp: decoded["picture"],
      },
      update(cache, { data: { signUpGoogle } }) {
        cache.writeQuery({
          query: PROFILE,
          data: {
            profile: {
              name: signUpGoogle.name,
              email: signUpGoogle.email,
              pfp: signUpGoogle.pfp,
            },
          },
        });
      },
    });
    // console.log(data);

    // setUserProfile({
    //   name: data?.signUpGoogle?.name,
    //   email: data?.signUpGoogle?.email,
    // });

    // console.log(userProfile);
  };

  const googleFailure = () => {
    console.log("Google auth failed");
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
