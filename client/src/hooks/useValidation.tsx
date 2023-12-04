import { useEffect, useState } from "react";
import { IValidations } from "../types/IValidations";

function useValidation(value: string, validations: IValidations) {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [isEmail, setEmail] = useState<boolean>(false);
  const [isValid, setValid] = useState<boolean>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          if (value) {
            setEmpty(false);
          } else {
            setEmpty(true);
          }
          break;
        case "isEmail": {
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          if (re.test(String(value).toLowerCase())) {
            setEmail(true);
          } else {
            setEmail(false);
          }
          break;
        }

        default:
          break;
      }
    }
  }, [validations, value]);

  useEffect(() => {
    if (!isEmpty && isEmail) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [isEmpty, isEmail]);

  return {
    isEmpty,
    isEmail,
    isValid,
  };
}

export default useValidation;
