import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { required } from "../../utils/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { login } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import s from "../common/FormsControls/FormsControls.module.css";

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("Login", "email", [required], Input)}
      {createField("Password", "password", [required], Input, {
        type: "password",
      })}
      {createField(
        "",
        "rememberMe",
        [],
        Input,
        {
          type: "checkbox",
        },
        "remember me"
      )}
      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl &&
        createField("Symbols from image", "captcha", [required], Input)}
      {error && <div className={s.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = ({ login, isAuth, captchaUrl }) => {
  const onSubmit = ({ email, password, rememberMe, captcha }) => {
    login(email, password, rememberMe, captcha);
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
