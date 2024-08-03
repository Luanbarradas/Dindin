import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().required("* Todos os campos são obrigatórios"),
  email: Yup.string()
    .required("* Todos os campos são obrigatórios")
    .email("Email inválido"),
  password: Yup.string()
    .required("* Todos os campos são obrigatórios")
    .min(6, "Senha de no mínimo 6 caracteres")
    .max(8, "Senha de no máximo 8 caracteres"),
  confirmPassword: Yup.string()
    .required("* Todos os campos são obrigatórios")
    .oneOf([Yup.ref("password")], "Senhas divergentes"),
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("* Todos os campos são obrigatórios")
    .email("Email inválido"),
  password: Yup.string()
    .required("* Todos os campos são obrigatórios")
    .min(6, "")
    .max(8, ""),
});
