import "./App.css"
import Form from "./components/Form"
import Display from "./components/Display"
import { FormProvider, useForm } from "react-hook-form"
import { FormValues } from "./types/type"

function App() {
  const methods = useForm<FormValues>({
    defaultValues: {
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
  return (
    <FormProvider {...methods}>
      <Form />
      <Display />
    </FormProvider>
  )
}

export default App
