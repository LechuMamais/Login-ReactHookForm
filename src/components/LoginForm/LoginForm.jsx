import "./LoginForm.css";
import { useForm } from "react-hook-form";
import React from "react";
import { useState } from "react";
import { handlePasswordChange } from "../../functions/handlePasswordChange";
import { checkPasswordStrength } from "../../functions/checkPasswordStrength";

const LoginForm = () => {
  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = (formData) => {
    if (validatePassword(formData.password)) {
      console.log(formData);
      setLoading(true);
    }
  };

  // En la siguiente funcion añado estilos y clases a elementos del DOM utilizando JS.
  // He decidido hacerlo así para mayor rendimiento, que re-renderice el componente completo*

  const validatePassword = (value) => {
    const strength = checkPasswordStrength(value);
    return (
      strength >= 2 || "Nivel mínimo requerido: Alto" // Mensaje de error personalizado
    );
  };

  return (
    <div id="login-container" className="box-shadow">
      <form onSubmit={handleSubmit(submit)}>
        <h2>Bienvenido!</h2>
        <div className="form-section-container">
          <label>Nombre de usuario</label>
          <input
            className="box-shadow"
            {...register("userName", {
              required: {
                value: "true",
                message: "Introduce el nombre de usuario",
              },
              minLength: {
                value: 3,
                message:
                  "El nombre de usuario debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 18,
                message:
                  "El nombre de usuario debe tener como máximo 18 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z0-9]{3,18}$/,
                message:
                  "El nombre de usuario debe incluir números, letras Mayúsculas y minúsculas",
              },
            })}
            style={{ borderColor: formState.errors.userName && "red" }}
          />
          {formState.errors.userName && (
            <p className="error-message">{formState.errors.userName.message}</p>
          )}
        </div>
        <div className="form-section-container">
          <label>Email</label>
          <input
            className="box-shadow"
            {...register("email", {
              required: {
                value: "true",
                message: "Introduce tu email",
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Introduce un email válido",
              },
            })}
            style={{ borderColor: formState.errors.email && "red" }}
          />
          {formState.errors.email && (
            <p className="error-message">{formState.errors.email.message}</p>
          )}
        </div>
        <div className="form-section-container">
          <label>Contraseña</label>
          <div className="password-input-container">
            <input
              className="box-shadow"
              id="password-input"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: {
                  value: true,
                  message: "Introduce la contraseña",
                },
                validate: validatePassword,
              })}
              onChange={handlePasswordChange} // Utilizamos nuestro onChange personalizado
            ></input>
            <div
              className={`password-toggle-container`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-slash"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              )}
            </div>
          </div>
          <div className="password-strength-bar">
            <div
              id="password-strength-bar-fill"
              className="password-strength-bar-fill"
            ></div>
          </div>
          <span id="password-strength-text">Nivel de seguridad: - </span>
          {formState.errors.password && (
            <p className="error-message">{formState.errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={!formState.isDirty}
          className="box-shadow button-submit"
        >
          {!loading? 'Login':
          <div className="submit-loading-animation"><span></span><span></span><span></span></div>
          }
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
