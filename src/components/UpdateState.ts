import { GlobalState } from "little-state-machine"
type FormValues = {
  firstName: string
  lastName: string
  gender: {
    label: string
    value: string
    Icon: any
  }
  dob: string
  email: string
  phone: string
  techstack: {
    name: string
  }[]
}

export default function UpdateState(
  state: GlobalState,
  payload: { data: FormValues }
): GlobalState {
  console.log("state", state)
  console.log("payload", payload)

  return {
    ...state,
    ...payload,
  }
}
