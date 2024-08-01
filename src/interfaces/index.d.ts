export interface HeaderProps {
    isLoggedIn: boolean;
}



export interface Transacao {
    id: number;
    data: string;
    descricao: string;
    categoria: string;
    valor: number;
    saida: boolean;
}


