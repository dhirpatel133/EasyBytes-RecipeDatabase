import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("authenticated")) {
      let uID = sessionStorage.getItem("authenticated");
      navigate("/home", {
        state: { userId: uID },
      });
    }
  }, []);

  const alertError = (message) => {
    let timerInterval;
    Swal.fire({
      position: "top",
      icon: "error",
      html: message,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        timerInterval = setInterval(() => {
          Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  };

  const login = () => {
    if (userName === "" || password === "") {
      let message = "Both username and password fields are required!";
      alertError(message);
    } else {
      Axios.post("http://localhost:5000/login", {
        userName: userName,
        password: password,
      }).then((response) => {
        // console.log(response.data[0]["user_id"]);
        if (response.data === "invalid") {
          let message = "Username or password don't match. Please try again!";
          alertError(message);
        } else {
          sessionStorage.setItem("authenticated", response.data[0]["user_id"]);
          let uID = sessionStorage.getItem("authenticated");
          navigate("/home", {
            state: { userId: uID },
          });
        }
      });
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          margin= "5px"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={login}>
        Login
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
