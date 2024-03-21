import React from "react"
import "./App.css"
import Form from "./components/Form"
import Display from "./components/Display"
import { StateMachineProvider, createStore } from "little-state-machine"

createStore({
  data: {
    firstName: "",
    lastName: "",
    gender: {
      label: "",
      value: "",
      Icon: "",
    },
    dob: "",
    email: "",
    phone: "",
    techstack: [{ name: "" }],
  },
})

function App() {
  return (
    <StateMachineProvider>
      <Form />
      <Display />
    </StateMachineProvider>
  )
}

export default App
