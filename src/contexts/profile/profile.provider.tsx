import React, { useReducer, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import schedules from "features/checkouts/data";
import { ProfileContext } from "./profile.context";
import { User } from "services/user";
import { removeItem } from "localforage";
import Loader from "components/loader/loader";
import { AuthContext } from "contexts/auth/auth.context";
import Router, { useRouter } from "next/router";

const INITIAL_STATE: any = {};
type Action = { type: "INIT_PROFILE"; payload: any };

function reducer(state: any, action: Action): any {
  switch (action.type) {
    case "INIT_PROFILE":
      return { ...action };
  }
}

export const ProfileProvider: React.FunctionComponent = ({ children }) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);

  const [profileState, profileDispatch] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const fetchData = React.useCallback(() => {
    setLoading(true);
    console.log("address");
    const token = localStorage.getItem("access_token");
    if (token) {
      User.getProfile()
        .then((response) => {
          profileDispatch(response.data.data);
          setLoading(false);
          console.log(profileState);
        })
        .catch((error) => {
          profileDispatch(INITIAL_STATE);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  }
  return (
    <ProfileContext.Provider
      value={{ profileState, profileDispatch, fetchData }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
