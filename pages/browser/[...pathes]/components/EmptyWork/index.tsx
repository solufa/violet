import React, { useState } from 'react'
import styled from 'styled-components'
import { fileTypes } from '~/server/utils/constants'
import { colors, fontSizes } from '~/utils/constants'
import { FileTypeAlertModal } from './FileTypeAlertModal'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const DraggingPanel = styled.div<{ dragging: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: ${(props) => (props.dragging ? 32 : 160)}px;
  background: ${(props) => (props.dragging ? colors.gray : colors.transparent)};
  transition: background 0.2s, padding 0.2s;
`

const DraggingFrame = styled.div<{ dragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: ${fontSizes.big};
  color: ${(props) => (props.dragging ? colors.white : colors.gray)};
  border: 4px dashed ${(props) => (props.dragging ? colors.white : colors.gray)};
  border-radius: 24px;
`

const Dropper = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`

export const EmptyWork = () => {
  const [dragging, setDragging] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const dragEnter = () => setDragging(true)
  const dragLeave = () => setDragging(false)
  const acceptExtensions = fileTypes.map((x) => x.ex).join()
  const drop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length !== 1) {
      e.target.value = ''
      setDragging(false)
      return
    }
    console.log('extentions->', acceptExtensions)
    const targetFileType = e.target.files[0].type
    const typeList = fileTypes.map<string>((x) => x.type)
    typeList.some((t) => t === targetFileType) ? setDragging(false) : setOpenAlert(true)
    e.target.value = ''
  }

  const closeModal = () => {
    setDragging(false)
    setOpenAlert(false)
  }

  return (
    <Container>
      {openAlert ? (
        <FileTypeAlertModal closeModal={closeModal} />
      ) : (
        <>
          <DraggingPanel dragging={dragging}>
            <DraggingFrame dragging={dragging}>Drop file to create new revision</DraggingFrame>
          </DraggingPanel>
          <Dropper
            type="file"
            accept={acceptExtensions}
            onDragEnter={dragEnter}
            onDragEnd={dragLeave}
            onChange={drop}
          />
        </>
      )}
    </Container>
  )
}
