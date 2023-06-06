import React from 'react'
import { HStack, Avatar, Text } from '@chakra-ui/react'

const Message = ({text, uri, user="other"}) => {
  return (
    <HStack bg={"gray.100"} paddingX={user==="me"?"4":"2"} borderRadius={"base"} paddingY={"2"} alignSelf={user==="me"?"flex-end":"flex-start"}>
        {
        user==="other" && <Avatar src={uri} />
        }
        <Text>{text}</Text>
        {
        user==="me" && <Avatar src={uri} />
        }

    </HStack>
  )
}

export default Message
