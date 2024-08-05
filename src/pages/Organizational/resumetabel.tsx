import { useState, useEffect } from "react";
import "./resumetabel.css";
import { ResumeTableProps } from "../../interfaces/Transaction";

export const ResumeTable = ({ transacao }: ResumeTableProps) => {
    const [entrada, setEntrada] = useState<number>(0);
    const [saida, setSaida] = useState<number>(0);

    useEffect(() => {
        let totalEntrada = 0;
        let totalSaida = 0;

        transacao.forEach((item) => {
            if (item.tipo === 'entrada') {
                totalEntrada += Number(item.valor);
            } else if (item.tipo === 'saida') {
                totalSaida += Number(item.valor);
            }
        });

        setEntrada(Number(totalEntrada.toFixed(2)));
        setSaida(Number(totalSaida.toFixed(2)));
    }, [transacao]);

    const saldo = entrada - saida;

    return (
        <div className="resume">
            <div className="container-txt-h2-resume">
                <h2>Resumo</h2>
            </div>
            <table className="table-resume">
                <tbody className="tbody">
                    <tr>
                        <th scope="row" className="entrace-txt">
                            Entradas
                        </th>
                        <td className="entrace">R$ {entrada.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="exit-txt">
                            Saídas
                        </th>
                        <td className="exit">R$ {saida.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <table className="table-resume">
                <tbody>
                    <tr>
                        <th scope="row" className="balance-txt">
                            Saldo
                        </th>
                        <td className="balance">R$ {saldo.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
