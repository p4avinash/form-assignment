import { Text } from "@chakra-ui/react"
import { Controller, useFormContext } from "react-hook-form"
import { Flex, Spacer, Box } from "@chakra-ui/react"
import { Select, components } from "chakra-react-select"

import { genderOptions } from "../utility/utility"

const { Option } = components

// function to implement check icon in custom select
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

// overwriting bgcolor and text color for custom select
const option = (provided: any, state: any) => ({
  ...provided,

  backgroundColor: state.isSelected && "white",
  "&:hover": {
    backgroundColor: state.isSelected && "white",
  },
  color: "black",
})

const CustomSelect = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Box className='gender' w={300}>
      <>
        <Text as={"b"} fontSize={"lg"}>
          Gender
        </Text>
        <br />
        <Controller
          name='gender'
          rules={{
            required: true,
            validate: {
              check: (value) => value.label !== "" || "Please select a gender",
            },
          }}
          render={({ field }) => (
            <Select
              variant={"filled"}
              placeholder='Select Gender'
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
        <Text color={"red"}>{errors.gender?.message as string}</Text>
        {console.log(typeof errors.gender?.message)}
      </>
    </Box>
  )
}

export default CustomSelect
