import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";


type Props = {};

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...on CurrentUser {
          id,
          identifier
      }
      ...on InvalidCredentialsError {
        errorCode,
        message,
        authenticationError
      }
    }
  }
`;

const GET_ME = gql`
  query me {
    me {
      id
      identifier
    }
  }
`;

export const LoginPage: NextPage<Props> = () => {
  const [ username, setUsername ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");

  const [loginUser, { data, loading, error }] = useMutation(LOGIN);

  const onSubmit = () => {
    loginUser({
        variables: {
            username,
            password
        }
    })
  };

  const { loading: isLoadingMe , error: meError, data: meData } = useQuery(GET_ME);

  if (isLoadingMe) {
    return null
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "300px",
            padding: 30,
          }}
        >
          <form>
            Me: {JSON.stringify(meData)}
            <h2>Login page</h2>
            {loading && 'Trying to login...'}
            {error && `Submission error! ${error.message}`}
            <div>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                name="login"
                className="border"
                placeholder="username"
              />
            </div>
            <div>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="text"
                name="password"
                className="border"
                placeholder="password"
              />
            </div>
            <button type="button" onClick={onSubmit} className="button p-1 border">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;