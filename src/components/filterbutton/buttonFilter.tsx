import './buttonFilter.css'
import Filter from '../../assets/filter.svg'


export const FilterButton = () => {
  return (
    <div className='filter-button'>
      <img src={Filter} alt="filtro" />
      <strong>Filtrar</strong>
    </div>

  )
}