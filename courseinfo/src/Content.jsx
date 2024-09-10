import Part from "./Part"

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercise={part.exercises} />
      ))}
      <strong>
        <p>total of {parts.reduce((sum, e) => sum + e.exercises, 0)} courses</p>
      </strong>
    </div>
  )
}

export default Content
