import {
  Input,
  Text,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
} from "@chakra-ui/react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { Flex, Spacer, Box, Spinner, Button } from "@chakra-ui/react"
import { useState } from "react"
import { CheckIcon, AddIcon, CloseIcon } from "@chakra-ui/icons"
import { Select, components } from "chakra-react-select"
import UpdateState from "./UpdateState"
import { useStateMachine } from "little-state-machine"

const { Option } = components
function IconOption(props: any) {
  const {
    data: { label, Icon },
  } = props

  return (
    <Option {...props}>
      <Flex className='flex items-center gap-2'>
        <span>{label}</span>
        <Spacer />
        {props.isSelected && <Icon color='green' />}
      </Flex>
    </Option>
  )
}
const genderOptions = [
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

const option = (provided: any, state: any) => ({
  ...provided,

  backgroundColor: state.isSelected && "white",
  "&:hover": {
    backgroundColor: state.isSelected && "white",
  },
  color: "black",
})

const Form = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
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

  const { fields, append, remove } = useFieldArray({
    name: "techstack",
    control,
    rules: {
      required: "This is required",
      // validate: (fieldArrayValues) => {
      //   console.log(fieldArrayValues)
      // },
    },
  })

  const { actions, state } = useStateMachine({ UpdateState })

  const handleIsLoading = (data: any) => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
      actions.UpdateState({ data: data })
    }, 0)
    return () => clearTimeout(timeout)
  }

  const handleDateFormat = (date: string) => {
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

  console.log(errors)
  console.log(errors.techstack?.[0]?.name?.message)

  return (
    <form
      onSubmit={handleSubmit((data) => {
        data.phone = `+91${data.phone}`
        data.dob = handleDateFormat(data.dob)
        console.log(data)
        handleIsLoading(data)
      })}
    >
      <Flex
        className='parent-container'
        direction={"column"}
        alignItems={"center"}
      >
        <Box
          className='container'
          backgroundColor={"#D5ECFF"}
          p={6}
          m={6}
          rounded={10}
          position={"relative"}
        >
          <Box className='basic-detail'>
            <Text as={"b"} fontSize='3xl'>
              Basic Details
            </Text>
            <Flex gap={10}>
              <Box className='firstName'>
                <Text as={"b"} fontSize={"lg"}>
                  First Name
                </Text>
                <br />
                <Input
                  w={300}
                  transition='all 0.2s'
                  borderRadius={6}
                  borderWidth='1px'
                  _hover={{ bg: "gray.400" }}
                  _expanded={{ bg: "blue.400" }}
                  _focus={{ boxShadow: "outline" }}
                  variant={"filled"}
                  size='md'
                  type='text'
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 2,
                      message: "First Name should at least be 2 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "First Name can't contain number",
                    },
                  })}
                  placeholder='first name'
                />
                <Text color={"red"}>{errors.firstName?.message}</Text>
              </Box>

              <Box className='lastName'>
                <Text as={"b"} fontSize={"lg"}>
                  Last Name
                </Text>
                <br />
                <Input
                  w={300}
                  transition='all 0.2s'
                  borderRadius={6}
                  borderWidth='1px'
                  _hover={{ bg: "gray.400" }}
                  _expanded={{ bg: "blue.400" }}
                  _focus={{ boxShadow: "outline" }}
                  variant={"filled"}
                  size='md'
                  type='text'
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 2,
                      message: "Last Name should at least be 2 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Last Name can't contain number",
                    },
                  })}
                  placeholder='last name'
                />
                <Text color={"red"}>{errors.lastName?.message}</Text>
              </Box>
            </Flex>
          </Box>

          <Box my={10} className='other-information'>
            <Text as={"b"} fontSize='3xl'>
              Other Information
            </Text>
            <Flex gap={10}>
              <Box className='gender' w={300}>
                <Text as={"b"} fontSize={"lg"}>
                  Gender
                </Text>
                <br />
                <Controller
                  name='gender'
                  rules={{ required: "Please select a gender" }}
                  render={({ field }) => (
                    <Select
                      variant={"filled"}
                      placeholder='Select gender'
                      styles={{ option }}
                      hideSelectedOptions={false}
                      closeMenuOnSelect={false}
                      {...field}
                      options={genderOptions}
                      components={{
                        Option: IconOption,
                      }}
                    />
                  )}
                  control={control}
                />
                <Text color={"red"}>{errors.gender?.message}</Text>
              </Box>

              <Box className='date-of-birth'>
                <Text as={"b"} fontSize={"lg"}>
                  Date of Birth
                </Text>
                <br />
                <Input
                  variant={"filled"}
                  w={300}
                  transition='all 0.2s'
                  borderRadius={6}
                  borderWidth='1px'
                  _focus={{ boxShadow: "outline" }}
                  type='date'
                  id='dob'
                  {...register("dob", {
                    required: "Date of Birth is required",
                    // min: {
                    //   value: "1899-01-01",
                    //   message: "Invalid Date",
                    // },
                    // max: {
                    //   value: "2019-01-01",
                    //   message:
                    //     "User needs to be at least 5 years old to register",
                    // },
                  })}
                />
                <Text color={"red"}>{errors.dob?.message}</Text>
              </Box>
            </Flex>

            <Box my={6}>
              <Flex gap={10}>
                <Box>
                  <Text as={"b"} fontSize={"lg"}>
                    Email
                  </Text>
                  <br />
                  <Input
                    w={300}
                    transition='all 0.2s'
                    borderRadius={6}
                    borderWidth='1px'
                    _hover={{ bg: "gray.400" }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "outline" }}
                    variant={"filled"}
                    size='md'
                    type='text'
                    {...register("email", {
                      required: "Email is required",
                      minLength: {
                        value: 2,
                        message: "Email should at least be 2 characters",
                      },
                      pattern: {
                        value:
                          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                        message: "Invalid Email",
                      },
                    })}
                    placeholder='email'
                  />
                  <Text color={"red"}>{errors.email?.message}</Text>
                </Box>

                <Box>
                  <Text as={"b"} fontSize={"lg"}>
                    Phone
                  </Text>
                  <br />
                  <InputGroup>
                    <InputLeftAddon>+91</InputLeftAddon>
                    <Input
                      {...register("phone", {
                        required: "Phone is required",
                        maxLength: {
                          value: 10,
                          message: "Phone number should not exceed 10 digits",
                        },
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Only numbers and 10 digits are allowed",
                        },
                      })}
                      type='tel'
                      placeholder='phone number'
                    />
                  </InputGroup>
                  <Text color={"red"}>{errors.phone?.message}</Text>
                </Box>
              </Flex>
            </Box>

            <Box my={6} w={300}>
              <Flex alignItems={"center"}>
                <Text fontSize={"lg"} as={"b"}>
                  Tech Stack
                </Text>
                <Spacer />
                <AddIcon
                  onClick={() => {
                    append({
                      name: "",
                    })
                  }}
                  as='b'
                  cursor={"pointer"}
                />
              </Flex>
              <Flex my={4} direction={"column"} gap={2}>
                {fields.map((field, index) => {
                  return (
                    <InputGroup key={field.id}>
                      <Input
                        placeholder='Enter tech stack'
                        variant={"filled"}
                        key={field.id}
                        type='text'
                        {...register(`techstack.${index}.name`, {
                          required: "stack is required",
                        })}
                      />
                      {index !== 0 && (
                        <InputRightElement>
                          <CloseIcon
                            onClick={() => remove(index)}
                            fontSize={"sm"}
                            cursor={"pointer"}
                          />
                        </InputRightElement>
                      )}
                    </InputGroup>
                  )
                })}
              </Flex>
              {/* <Text color={"red"}>{errors}</Text> */}
            </Box>
          </Box>
          <Flex>
            <Box></Box>
            <Spacer />

            <Button
              position={"relative"}
              type='submit'
              w={200}
              my={10}
              bgColor={"black"}
              color={"white"}
              cursor={"pointer"}
            >
              {isLoading ? <Spinner size='sm' /> : "Submit"}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </form>
  )
}

export default Form
