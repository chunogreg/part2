const Notification = ({ message, className }) => {
  if (message === "") {
    return ""
  } else {
    return <div className={className}>{message}</div>
  }
}

export default Notification
