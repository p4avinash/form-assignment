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
