export const checkPasswordStrength = (password) => {
    let passwordSecurityLevel = 0;
    if (password.length >= 8) {
      if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
        passwordSecurityLevel++;
      }
      if (/\d/.test(password)) {
        passwordSecurityLevel++;
      }
      if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        passwordSecurityLevel++;
      }
    }
    return passwordSecurityLevel;
  };