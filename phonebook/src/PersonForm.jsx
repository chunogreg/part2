const PersonForm = ({
  addPerson,
  handleName,
  handleNumber,
  newName,
  newNumber,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName} onChange={handleName} />
        </div>
        <div>
          nunber:
          <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
