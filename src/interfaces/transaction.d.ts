// export interface Transaction {
//   id: number;
//   data: string;
//   descricao: string;
//   categoria: string;
//   valor: number;
//   saida: boolean;
// }

// export interface TabelaProps {
//   transacao: Transacao[];
//   setTransacao: React.Dispatch<React.SetStateAction<Transacao[]>>;
//   setEditRegister: React.Dispatch<React.SetStateAction<boolean>>;
//   setCurrentRegister: React.Dispatch<React.SetStateAction<Transacao | undefined>>;
// }

// export interface ResumeTableProps {
//   transacao: Transacao[];
// }

export interface Transaction {
  id: number;
  type: string;
  description: string;
  value: number;
  date: string;
  user_id: number;
  category_id: number;
  category_name: string;
}
