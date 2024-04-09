import { CheckIcon } from "@chakra-ui/icons"

// function to handle date format
export const handleDateFormat = (date: string) => {
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  let monthIndex = new Date(date).getMonth()
  let day = new Date(date).getDate()
  let year = new Date(date).getFullYear()
  let month = monthName[monthIndex]

  let dayStr = day.toString().padStart(2, "0")

  let formattedDate = `${dayStr}/${month}/${year}`
  console.log(formattedDate, monthIndex)
  return formattedDate
}

//gender options
export const genderOptions = [
  {
    label: "Male",
    value: "male",
    Icon: CheckIcon,
  },
  {
    label: "Female",
    value: "female",
    Icon: CheckIcon,
  },
  {
    label: "Other",
    value: "other",
    Icon: CheckIcon,
  },
]

//input field data for firstName
export const firstNameData = {
  placeholderText: "first name",
  patternData: {
    value: /^[a-zA-Z]+$/,
    message: "First Name can't contain number or spaces",
  },
  minLengthLogic: {
    value: 2,
    message: "First Name should at least be 2 characters",
  },
  requiredText: "First Name is required",
  inputType: "text",
}

//input field data for lastName
export const lastNameData = {
  placeholderText: "last name",
  patternData: {
    value: /^[a-zA-Z]+$/,
    message: "Last Name can't contain number and spaces",
  },
  minLengthLogic: {
    value: 2,
    message: "Last Name should at least be 2 characters",
  },
  requiredText: "Last Name is required",
  inputType: "text",
}

//input field data for emailName
export const emailData = {
  placeholderText: "email",
  patternData: {
    value:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: "Invalid Email",
  },
  minLengthLogic: {
    value: 2,
    message: "Email should at least be 2 characters",
  },
  requiredText: "Email is required",
  inputType: "text",
}
