import * as Yup from "yup";

export const transactionValidationSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(["entrada", "saída"], 'Tipo deve ser "entrada" ou "saída"')
    .required("Tipo é obrigatório"),
  description: Yup.string().required("Descrição é obrigatória"),
  price: Yup.number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .required("O preço é obrigatório"),
  date: Yup.date()
    .required("Data é obrigatória")
    .typeError("Data deve ser uma data válida"),
  category_id: Yup.number()
    .integer("Categoria ID deve ser um número inteiro")
    .positive("Categoria ID deve ser um número positivo")
    .required("Categoria ID é obrigatório"),
});
