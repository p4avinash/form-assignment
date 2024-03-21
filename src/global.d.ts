import "little-state-machine"

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
declare module "little-state-machine" {
  interface GlobalState {
    data: FormValues
  }
}
