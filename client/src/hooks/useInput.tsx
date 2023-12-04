import { ChangeEvent, useState } from "react";
import useValidation from "./useValidation";
import { IValidations } from "../types/IValidations";

function useInput(initialValue: string, validations: IValidations) {
  const [text, setText] = useState<string>(initialValue);
  const [isBlur, setBlur] = useState<boolean>(false);
  const valid = useValidation(text, validations);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function onBlur() {
    setBlur(true);
  }

  return {
    text,
    onChange,
    onBlur,
    ...valid,
    isBlur,
  };
}

export default useInput;
