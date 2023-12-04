import "./App.css";
import UserCard from "./Components/UserCard";
import UserSkelet from "./Components/UserSkelet";
import useInput from "./hooks/useInput";
import useMask from "./hooks/useMask";
import useSubmit from "./hooks/useSubmit";

function App() {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const phone = useMask("");
  const submit = useSubmit();

  return (
    <>
      <div className="root_form">
        <form onSubmit={(e) => submit.onSubmit(e, email.text, phone.phone)}>
          <div className="labelInput">
            Email<span className="mark">*</span>
          </div>
          <div className="containerInput">
            <input
              className={
                email.isBlur && !email.isValid ? "myInput error" : "myInput"
              }
              type="email"
              id="email"
              value={email.text}
              onChange={(e) => email.onChange(e)}
              onBlur={email.onBlur}
              autoComplete="off"
              placeholder="example@mail.ru"
            />
            {email.isBlur && email.isEmpty && (
              <div className="errorNotification">Поле не может быть пустым</div>
            )}
            {email.isBlur && !email.isEmail && !email.isEmpty && (
              <div className="errorNotification">Некорректный формат Email</div>
            )}
          </div>
          <div className="labelInput">Phone number</div>
          <div className="containerInput">
            <input
              value={phone.phone}
              onChange={(e) => phone.onChange(e)}
              className="myInput"
              type="tel"
              id="phone"
              autoComplete="off"
              placeholder="01-23-45"
            />
          </div>
          <button
            className="submitButton"
            disabled={!email.isValid}
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="userList">
          {!submit.isLoading &&
            submit.users.length > 0 &&
            submit.users.map((user) => (
              <UserCard
                key={user.email + user.number}
                email={user.email}
                number={user.number}
              />
            ))}
          {submit.isLoading && <UserSkelet />}
          {!submit.isLoading && submit.errorText && (
            <div className="userCard">Нет пользователей с такими данными</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
