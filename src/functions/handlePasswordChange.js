import { checkPasswordStrength } from "./checkPasswordStrength";

export const handlePasswordChange = (e) => {
    const password = e.target.value;
    const level = checkPasswordStrength(password);
    const passwordField = document.getElementById("password-input");
    const passwordStrengthBar = document.getElementById(
      "password-strength-bar-fill"
    );
    const passwordStrengthText = document.getElementById(
      "password-strength-text"
    );

    if (passwordField && passwordStrengthBar && passwordStrengthText) {
      passwordField.classList.remove(
        "low-security",
        "medium-security",
        "high-security",
        "very-high-security"
      );
      passwordStrengthBar.classList.remove(
        "low-security-bar",
        "medium-security-bar",
        "high-security-bar",
        "very-high-security-bar"
      );
      switch (level) {
        case 0:
          passwordField.classList.add("low-security");
          passwordStrengthBar.classList.add("low-security-bar");
          passwordStrengthText.textContent = "Nivel de seguridad: Bajo";
          break;
        case 1:
          passwordField.classList.add("medium-security");
          passwordStrengthBar.classList.add("medium-security-bar");
          passwordStrengthText.textContent = "Nivel de seguridad: Medio";
          break;
        case 2:
          passwordField.classList.add("high-security");
          passwordStrengthBar.classList.add("high-security-bar");
          passwordStrengthText.textContent = "Nivel de seguridad: Alto";
          break;
        case 3:
          passwordField.classList.add("very-high-security");
          passwordStrengthBar.classList.add("very-high-security-bar");
          passwordStrengthText.textContent = "Nivel de seguridad: Muy Alto";
          break;
        default:
          break;
      }
    }
  };