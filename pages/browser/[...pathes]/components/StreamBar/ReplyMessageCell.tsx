import React from 'react'
import styled from 'styled-components'
import { Spacer } from '~/components/atoms/Spacer'
import { MessageHeader } from './MessageHeader'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 80%;
`
const Message = styled.div`
  position: relative;
  padding-right: 10px;
  margin-bottom: 12px;
  margin-left: 36px;
`

export const ReplyMessageCell = (props: {
  replymessagecell: {
    userName: string
    content: string
    createdAt: number
  }
}) => {
  return (
    <Container>
      <MessageHeader
        userName={props.replymessagecell.userName}
        createdAt={props.replymessagecell.createdAt}
      />
      <Message>{props.replymessagecell.content}</Message>
      <Spacer axis="y" size={4} />
    </Container>
  )
}
