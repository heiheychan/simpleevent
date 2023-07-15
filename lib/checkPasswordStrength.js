import { passwordStrength } from 'check-password-strength'

export const checkPasswordStrength = (pw) => {
  const level = passwordStrength(pw).id;
  let result;

  switch (level) {
    case 0:
      result = { value: 0, color: "text-red-500"}
      break;
    case 1:
      result = { value: 1, color: "text-orange-500"}
      break;
    case 2:
      result = { value: 2, color: "text-green-500"}
      break;
    case 3:
      result = { value: 3, color: "text-green-500"}
      break;
  }

  return result
}