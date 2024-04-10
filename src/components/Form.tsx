import {
  Input,
  Text,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
} from "@chakra-ui/react"
import { useFieldArray, useFormContext, FieldErrors } from "react-hook-form"
import { Flex, Spacer, Box, Spinner, Button } from "@chakra-ui/react"
import { useState } from "react"
import { AddIcon, CloseIcon } from "@chakra-ui/icons"
import { handleDateFormat } from "../utility/utility"
import CustomSelect from "./CustomSelect"
import CustomInput from "./CustomInput"

const Form = () => {
  const [isLoading, setIsLoading] = useState(false)

  // const { actions, state } = useStateMachine({ UpdateState })

  // function to handle loading state and dispatch form data to global state after timeout duration
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext()
  const handleIsLoading = (data: any) => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
      // actions.UpdateState({ data: data })
    }, 3000)
    return () => clearTimeout(timeout)
  }

  const { fields, append, remove } = useFieldArray({
    name: "techstack",
    control,
  })

  const techstackErrors = errors.techstack as
    | FieldErrors<
        Array<{
          name: string
          message: string
        }>
      >
    | undefined
  console.log(techstackErrors?.[0])

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
                <CustomInput register={register} type={"firstName"} />
                <Text color={"red"}>{errors.firstName?.message as string}</Text>
              </Box>

              <Box className='lastName'>
                <Text as={"b"} fontSize={"lg"}>
                  Last Name
                </Text>
                <br />
                <CustomInput register={register} type={"lastName"} />
                <Text color={"red"}>{errors.lastName?.message as string}</Text>
              </Box>
            </Flex>
          </Box>

          <Box my={10} className='other-information'>
            <Text as={"b"} fontSize='3xl'>
              Other Information
            </Text>
            <Flex gap={10}>
              <CustomSelect />

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
                    min: {
                      value: "1899-01-01",
                      message: "Invalid Date",
                    },
                    max: {
                      value: "2019-01-01",
                      message:
                        "User needs to be at least 5 years old to register",
                    },
                  })}
                />
                <Text color={"red"}>{errors.dob?.message as string}</Text>
              </Box>
            </Flex>

            <Box my={6}>
              <Flex gap={10}>
                <Box>
                  <Text as={"b"} fontSize={"lg"}>
                    Email
                  </Text>
                  <br />
                  <CustomInput register={register} type={"email"} />
                  <Text color={"red"}>{errors.email?.message as string}</Text>
                </Box>

                <Box>
                  <Text as={"b"} fontSize={"lg"}>
                    Phone
                  </Text>
                  <br />
                  <InputGroup>
                    <InputLeftAddon>+91</InputLeftAddon>
                    <Input
                      transition='all 0.2s'
                      borderRadius={6}
                      borderWidth='1px'
                      _hover={{ bg: "gray.400" }}
                      _expanded={{ bg: "blue.400" }}
                      _focus={{ boxShadow: "outline" }}
                      variant={"filled"}
                      size='md'
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
                  <Text color={"red"}>{errors.phone?.message as string}</Text>
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
                    <Box key={field.id}>
                      <InputGroup key={field.id}>
                        <Input
                          placeholder='Enter tech stack'
                          variant={"filled"}
                          key={field.id}
                          type='text'
                          {...register(`techstack.${index}.name` as const, {
                            required: "Tech Stack is required",
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
                      <Text color={"red"}>
                        {techstackErrors?.[index]?.name?.message}
                      </Text>
                    </Box>
                  )
                })}
              </Flex>
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
