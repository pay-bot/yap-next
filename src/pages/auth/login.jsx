import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

import ReactLoading from "react-loading";
import { removeAdmin, setAdminToken } from "../../features/authReducer";
import { useLoginMutation } from "../../features/authApi";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutDuration = window._DATADOG_SYNTHETICS_BROWSER ? 90000 : 2000;
  const loader = () => {
    return (
      <ReactLoading type="spokes" color="#5433ff" height="4%" width="4%" />
    );
  };

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [demo, setDemo] = useState({
    email: "admin2@mail.com",
    password: "12345678",
  });

  const onDemoLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(timeoutDuration);
    await login(demo);
    // Cookies.set('token', JSON.stringify(user?.token), { expires: 7 })
    // dispatch
    router.push("/");
  };

  const [login, response] = useLoginMutation();

  const handle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(timeoutDuration);
    await login(state);
    // Cookies.set('token', JSON.stringify(user?.token), { expires: 7 })
    // dispatch
    router.push("/");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (response.isSuccess) {
      Cookies.set("admin-token", response?.data?.token);
      Cookies.set("admin-name", response?.data?.user?.name);
      dispatch(setAdminToken(response?.data?.token));
      // navigate('/dashboard/products');
    }
  }, [response.isSuccess]);

  const isLogin = useSelector((state) => state.authReducer);

  const handleAddLogout = () => {
    dispatch(removeAdmin());
  };

  return (
    <>
      {isLogin?.adminToken ? (
        <div className="">
          sudah login
          <div onClick={handleAddLogout} className="">
            logout
          </div>
        </div>
      ) : (
        <div className=" mx-auto flex h-screen items-center justify-center">
          <div className="rounded border p-8 shadow-xl md:w-96">
            <Link href="/">
              <a>
                <h2 className=" pb-8 text-2xl font-semibold">BakulGadget</h2>
              </a>
            </Link>
            <form onSubmit={onLogin}>
              <div className="section">
                <input
                  type="text"
                  name="email"
                  onChange={handle}
                  value={state.email}
                  placeholder="Book author"
                  required
                  className="input"
                />
                <label htmlFor="" className="label">
                  Name
                </label>
              </div>
              <div className="section ">
                <input
                  type="text"
                  name="password"
                  placeholder="Book name"
                  onChange={handle}
                  value={state.password}
                  required
                  className="input"
                />

                <label htmlFor="" className="label">
                  Password
                </label>
              </div>
              {isLoading && (
                <div id="loaderSection" className="display-section-component">
                  {loader()}
                </div>
              )}
              <button
                type="submit"
                className="rounded bg-blue-500 px-2 py-1 text-white"
              >
                Login
              </button>
            </form>
            <form onSubmit={onDemoLogin} className="">
              <button
                type="submit "
                className="my-4 rounded bg-gray-100 px-2 py-1"
              >
                Demo
              </button>
            </form>
            <div className="">
              Dont have an account yet ?{" "}
              <span className="text-blue-500">
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

