// export interface Transacao {
//   id: number;
//   data: string;
//   descricao: string;
//   categoria_id: number;
//   valor: number;
//   tipo: "entrada" | "saida";
// }

// export interface ICategoria {
//   id: string;
//   descricao: string;
// }

// export interface AddRegisterModalProps {
//   show: boolean;
//   onClose: () => void;
//   onNewTransaction: () => void;
// }

// export interface PopupProps {
//   onConfirm: () => void;
//   onCancel: () => void;
// }

// export interface LoginProps {
//   setIsAuthenticated: (isAuthenticated: boolean) => void;
// }

// export interface TabelaProps {
//   transacao: Transacao[];
//   setTransacao: React.Dispatch<React.SetStateAction<Transacao[]>>;
//   setEditRegister: React.Dispatch<React.SetStateAction<boolean>>;
//   setCurrentRegister: React.Dispatch<
//     React.SetStateAction<Transacao | undefined>
//   >;
// }

// export interface ResumeTableProps {
//   transacao: Transacao[];
// }

// export interface EditRegisterModalProps {
//   show: boolean;
//   onClose: () => void;
//   onUpdate: () => void;
//   currentRegister: Transacao | undefined;
// }

// export interface EditCategoria {
//   id: number;
//   descricao: string;
// }

// export interface AppRoutesProps {
//   isAuthenticated: boolean;
//   setIsAuthenticated: (isAuthenticated: boolean) => void;
// }

// export interface ProtectedRouteProps {
//   isAuthenticated: boolean;
//   children: JSX.Element;
// }

// export type LoginError = {
//   message: string;
// };

// export interface EditUserModalProps {
//   show: boolean;
//   onClose: () => void;
//   onNameUpdate: (newName: string) => void;
// }

// Estou tentando manter em inglês, mas optamos por deixar o que for relacionado a API em português para não fazer um de-para (tentamos e não conseguimos).

export interface Transaction {
  id: number;
  data: string;
  descricao: string;
  categoria_id: number;
  valor: number;
  tipo: "entrada" | "saida";
}

export interface ICategory {
  id: string;
  descricao: string;
}

export interface EditCategory {
  id: number;
  descricao: string;
}

export interface AddRegisterModalProps {
  show: boolean;
  onClose: () => void;
  onNewTransaction: () => void;
}

export interface PopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface ScheduleProps {
  transaction: Transaction[];
  setTransaction: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setEditRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentRegister: React.Dispatch<
    React.SetStateAction<Transaction | undefined>
  >;
}

export interface ResumeScheduleProps {
  transaction: Transaction[];
}

export interface EditRegisterModalProps {
  show: boolean;
  onClose: () => void;
  onUpdate: () => void;
  currentRegister: Transaction | undefined;
}

export interface AppRoutesProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

export type LoginError = {
  message: string;
};

export interface EditUserModalProps {
  show: boolean;
  onClose: () => void;
  onNameUpdate: (newName: string) => void;
}
