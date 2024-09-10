import { useEffect, useState } from "react"
import Filter from "./Filter"
import PersonForm from "./PersonForm"
import Person from "./Person"
import personService from "./services/notes"
import Notification from "./Notification"

const App = () => {
  const [persons, setPersons] = useState([
    // { name: "Arto Hellas", number: "040-123456", id: 1 },
    // { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    // { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    // { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchStr, setSearchStr] = useState("")
  const [showMsg, setShowMsg] = useState("")
  const [isMsgReady, setIsMsgReady] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        console.log("all persons......", initialPersons)
        setPersons(initialPersons)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [])

  const addPerson = (event) => {
    setIsMsgReady(true)
    event.preventDefault()
    const newPersonObj = { name: newName, number: newNumber }

    const updateThisPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    if (updateThisPerson) {
      if (
        window.confirm(
          `${newName} already in the phonebook, replace the phone number`
        )
      ) {
        updatePerson(updateThisPerson.id)
      }
    } else {
      personService
        .create(newPersonObj)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))

          setShowMsg(`${newName} is being added`)

          setTimeout(() => {
            setShowMsg("")
          }, 5555)
        })
        .catch((error) => {
          console.error("Error fetching data:", error)
        })
    }

    setNewName("")
    setNewNumber("")
  }

  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handleNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setSearchStr(e.target.value)
  }
  console.log("searching -----", searchStr)

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchStr.toLowerCase())
  )

  const handleDelete = (id) => {
    personService
      .del(id)
      .then((response) => {
        console.log("deleted person", response.data)

        setPersons(persons.filter((person) => person.id !== id))
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }

  const updatePerson = (id) => {
    setIsMsgReady(false)
    const personToUpdate = persons.find((person) => person.id === id)
    const changedPerson = { ...personToUpdate, number: newNumber }
    personService
      .update(id, changedPerson)
      .then((returnedPerson) => {
        console.log("updated person:---", returnedPerson)
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        )
      })
      .catch((error) => {
        setShowMsg(`${newName} has been removed from the phonebook`)
        setTimeout(() => {
          setShowMsg("")
        }, 5555)
        console.log(error)
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        message={showMsg}
        className={isMsgReady ? "addPersonClass" : "deletePersonClass"}
      />

      <Filter handleFilter={handleFilter} searchStr={searchStr} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          handleDelete={() =>
            window.confirm(`do you want to delete ${person.name}?`) &&
            handleDelete(person.id)
          }
        />
      ))}
    </div>
  )
}

export default App
