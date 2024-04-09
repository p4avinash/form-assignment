import { useStateMachine } from "little-state-machine"
import UpdateState from "./UpdateState"
import { Text } from "@chakra-ui/react"
import { Flex, Box } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

const Display = () => {
  console.log()
  const { state } = useStateMachine({ UpdateState })
  console.log("state from display component", state)
  const { firstName, lastName, dob, email, phone, gender, techstack } =
    state.data

  const techStackArray = techstack.map((item) => {
    return item.name
  })
  console.log("techStackArray", techStackArray)

  return (
    <Box>
      <Flex justifyContent={"center"}>
        <Box backgroundColor={"#D5ECFF"} w={700} p={10} rounded={10}>
          <Flex direction={"column"}>
            <Flex alignItems={"center"} gap={4}>
              <Text as={"b"} fontSize={"lg"}>
                First Name:
              </Text>
              <Text fontSize={"lg"} as={"i"}>
                {firstName}
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={4}>
              <Text as={"b"} fontSize={"lg"}>
                Last Name:
              </Text>
              <Text fontSize={"lg"} as={"i"}>
                {lastName}
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={4}>
              <Text as={"b"} fontSize={"lg"}>
                Date of Birth:
              </Text>
              <Text fontSize={"lg"} as={"i"}>
                {dob}
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={4}>
              <Text as={"b"} fontSize={"lg"}>
                Email:
              </Text>
              <Text fontSize={"lg"} as={"i"}>
                {email}
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={4}>
              <Text as={"b"} fontSize={"lg"}>
                Phone:
              </Text>
              <Text fontSize={"lg"} as={"i"}>
                {phone}
              </Text>
            </Flex>
            <Flex alignItems={"center"} gap={4}>
              <Text as={"b"} fontSize={"lg"}>
                Gender:
              </Text>
              <Text fontSize={"lg"} as={"i"}>
                {gender.label}
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
    </Box>
  )
}

export default Display
