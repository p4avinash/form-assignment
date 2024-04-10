import { Text } from "@chakra-ui/react"
import { Flex, Box } from "@chakra-ui/react"
import { FieldValues, useFormContext } from "react-hook-form"
import { useEffect, useState } from "react"

const Display = () => {
  const { formState, getValues, reset } = useFormContext()
  const [state, setstate] = useState<FieldValues>({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    gender: "",
    techstack: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      handleIsLoading()
      console.log("loading")
    }
  }, [formState.isSubmitSuccessful])

  console.log(formState.isSubmitSuccessful, formState.isSubmitted)

  const techStackArray = state.techstack.map((item: { name: string }) => {
    return item.name
  })

  const sleep = (ms: number, formData: FieldValues) =>
    new Promise((resolve) =>
      setTimeout(() => {
        setstate({ ...formData })
        resolve("resolved")
      }, ms)
    )
  const handleIsLoading = async () => {
    console.log("loading-1")
    const formData = getValues()
    await sleep(3000, formData)
    reset()
    setIsLoading(false)
  }

  return (
    <Box>
      {!isLoading && (
        <Flex justifyContent={"center"}>
          <Box backgroundColor={"#D5ECFF"} w={700} p={10} rounded={10}>
            <Flex direction={"column"}>
              <Flex alignItems={"center"} gap={4}>
                <Text as={"b"} fontSize={"lg"}>
                  First Name:
                </Text>
                <Text fontSize={"lg"} as={"i"}>
                  {state.firstName}
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={4}>
                <Text as={"b"} fontSize={"lg"}>
                  Last Name:
                </Text>
                <Text fontSize={"lg"} as={"i"}>
                  {state.lastName}
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={4}>
                <Text as={"b"} fontSize={"lg"}>
                  Date of Birth:
                </Text>
                <Text fontSize={"lg"} as={"i"}>
                  {state.dob}
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={4}>
                <Text as={"b"} fontSize={"lg"}>
                  Email:
                </Text>
                <Text fontSize={"lg"} as={"i"}>
                  {state.email}
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={4}>
                <Text as={"b"} fontSize={"lg"}>
                  Phone:
                </Text>
                <Text fontSize={"lg"} as={"i"}>
                  {state.phone}
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={4}>
                <Text as={"b"} fontSize={"lg"}>
                  Gender:
                </Text>
                <Text fontSize={"lg"} as={"i"}>
                  {state.gender.label}
                </Text>
              </Flex>
              <Flex alignItems={"center"} gap={4}>
                <Text as={"b"} fontSize={"lg"}>
                  Tech Stack:
                </Text>
                <Text fontSize={"lg"} as={"i"}>
                  {techStackArray.join(", ")}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

export default Display
