import { forwardRef } from "react"
import { Input } from "@chakra-ui/react"
import { firstNameData, lastNameData, emailData } from "../utility/utility"

const CustomInput = forwardRef((props: any, ref: any) => {
  const { register, type } = props

  //data to implement on the custom input field based on the type
  const inputData: any = {
    firstName: firstNameData,
    lastName: lastNameData,
    email: emailData,
  }

  return (
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
      type={inputData[type].inputType}
      {...register(`${type}`, {
        required: inputData[type].requiredText,
        minLength: inputData[type].minLengthLogic,
        pattern: inputData[type].patternData,
      })}
      placeholder={inputData[type].placeholderText}
    />
  )
})

export default CustomInput
