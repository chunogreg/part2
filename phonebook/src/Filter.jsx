const Filter = ({ handleFilter, searchStr }) => {
  return (
    <div>
      filter shown with:
      <input value={searchStr} onChange={handleFilter} />
    </div>
  )
}

export default Filter
