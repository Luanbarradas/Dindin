export interface Transaction {
  id: number;
  data: string;
  descricao: string;
  categoria: string;
  valor: number;
  saida: boolean;
}
