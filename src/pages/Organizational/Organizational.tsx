import '../../App.css';
import pecil from '../../assets/pencil.svg';
import bin from '../../assets/bin.svg';
import triangulo from '../../assets/triangulo.svg';
import { useEffect, useState } from 'react';
import { TabelaProps } from '../../interfaces/Transaction';


export const Tabela = ({ transacao, setTransacao, setEditRegister, setCurrentRegister }: TabelaProps) => {
  const [idTransacao, setIdTransacao] = useState<number | null>(null);
  const [idEditTransacao, setIdEditTransacao] = useState<number | null>(null);

  const handleData = (data: string) => {
    const date = new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    return date;
  };

  const handleGetDay = (data: string) => {
    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'sábado', 'Domingo'];
    const date = new Date(data);
    const day = date.getDay();
    return daysOfWeek[day];
  };

  const handleDeleteItem = (event: number) => {
    setIdTransacao(event);
  };

  const handleEditRegister = (event: number) => {
    setIdEditTransacao(event);
    setEditRegister(true);
  };

  useEffect(() => {
    if (idTransacao !== null) {
      setTransacao(transacao.filter((transacao) => transacao.id !== idTransacao));
      setIdTransacao(null);
    }

    if (idEditTransacao !== null) {
      setCurrentRegister(transacao.find((transacao) => transacao.id === idEditTransacao));
    }
  }, [idTransacao, idEditTransacao, setTransacao, setCurrentRegister, transacao]);

  return (
    <div className='container-table'>
      <table>
        <thead>
          <tr>
            <th scope='col' className='data-th-txt'>
              Data
              <img src={triangulo} alt='icone reorganizar por data' />
            </th>
            <th>Dia da Semana</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transacao.map((transacao) => (
            <tr key={transacao.id}>
              <td>{handleData(transacao.data)}</td>
              <td>{handleGetDay(transacao.data)}</td>
              <td className='table-description'>{transacao.descricao}</td>
              <td className='table-category'>{transacao.categoria}</td>
              <td className='col-value' style={{ color: transacao.saida ? 'var(--DEBT_ORANGE)' : 'var(--SECONDARY_BLUE)' }}>
                R$ {transacao.valor}
              </td>
              <td className='edit-icon'>
                <img src={pecil} alt="ícone de editar" style={{ cursor: 'pointer' }} onClick={() => handleEditRegister(transacao.id)} />
                <img src={bin} alt="ícone de deletar" style={{ marginLeft: '13px', cursor: 'pointer' }} onClick={() => handleDeleteItem(transacao.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};