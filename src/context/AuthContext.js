// ** React Imports
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'
import { axiosCall } from 'src/http-call-and-loader/Loader'

// ** Config
import authConfig from 'src/configs/auth'
import allURL from 'src/http-call-and-loader/allURL'
import { setCurrentUser } from 'src/store/apps/user'

const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);

  const inc = useCallback(
    () => setCounter((counter) => counter + 1),
    [setCounter]
  ); // add to counter

  const dec = useCallback(
    () => setCounter((counter) => counter - 1),
    [setCounter]
  ); // remove from counter

  const interceptors = useMemo(
    () => ({
      request: (config) => {
        return (
          inc(),
          (() => {
            config.headers.Authorization = localStorage.getItem("accessToken")
              ? `Bearer ${localStorage.getItem("accessToken")}`
              : "";
            config.headers["Access-Control-Allow-Origin"] = "*";

            return config;
          })()
        );
      },
      response: (response) => {
        dec();

        return response;
      },
      error: (err) => {
        return new Promise(async (resolve, reject) => {
          const originalReq = err.config;
          if (
            err?.response?.status === 500 &&
            err.response?.data?.message === "Refresh token error"
          ) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            window.location.href = "/login/";

            return Promise.reject(err);
          }
          if (
            err.response?.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            originalReq._retry = true;
            try {
              let response = await axiosCall.post(AllUrls.REFRESH_TOKEN, {
                refreshToken: reFreshToken,
              });
              if (response?.data?.data) {
                localStorage.setItem(
                  "accessToken",
                  JSON.stringify(response?.data?.data?.accessToken)
                );
                localStorage.setItem(
                  "refreshToken",
                  JSON.stringify(response?.data?.data?.refreshToken)
                );
                const oldReqRes = axiosCall(originalReq);
                resolve(oldReqRes);
              }
            } catch (error) {
              console.error("error", error);
            }
          }
          dec();

          return Promise.reject(err);
        });
      },
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inc, dec]
  ); // create the interceptors

  useEffect(() => {
    const reqInterceptor = axiosCall.interceptors.request.use(
      interceptors.request,
      interceptors.error
    );

    const resInterceptor = axiosCall.interceptors.response.use(
      interceptors.response,
      interceptors.error
    );

    return () => {
      axiosCall.interceptors.request.eject(reqInterceptor);
      axiosCall.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  return [counter > 0];
};

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  const [isLoading] = useAxiosLoader();

  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(!!isLoading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem("accessToken")
      if (storedToken) {
        setLoading(true)
        axiosCall
          .get(allURL.PROFILE)
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data.data })
            setCurrentUser({ ...response.data.data })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)

            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    // initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setUser(user ? user : JSON.parse(localStorage.getItem('userData')));
  }, [user])

  const handleLogin = (params, errorCallback) => {
    const rememberMe = params.rememberMe;
    delete params.rememberMe;
    console.log("params", params);

    axiosCall
      .post(allURL.LOGIN, params)
      .then(async response => {
        rememberMe
          ? window.localStorage.setItem("accessToken", response.data.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl
        setUser(response.data.data.user)
        rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.data.user)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem("accessToken")
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
