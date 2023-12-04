import { useState, useEffect } from "react";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import { IUser } from "../types/IUser";

function useSubmit() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [activeRequests, setActiveRequests] = useState<number>(0);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );
  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    if (activeRequests === 0) {
      setLoading(false);
    }
  }, [activeRequests]);

  async function onSubmit(
    event: React.FormEvent,
    email: string,
    phone: string
  ) {
    event.preventDefault();

    if (cancelToken) {
      cancelToken.cancel();
    }

    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken);

    setActiveRequests((prevCount) => prevCount + 1);

    try {
      setLoading(true);

      const response: AxiosResponse<IUser[]> = await axios.get(
        "http://localhost:3600/",
        {
          params: { email: email, phone: phone.replace(/-/g, "") },
          cancelToken: newCancelToken.token,
        }
      );

      setUsers(response.data);
      if (response.data.length === 0) {
        setErrorText("Нет пользователей с такими данными");
      } else {
        setErrorText("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActiveRequests((prevCount) => prevCount - 1);
    }
  }

  return {
    onSubmit,
    users,
    isLoading,
    errorText,
  };
}

export default useSubmit;
