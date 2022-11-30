import React from 'react'
import Button from 'react-bootstrap/Button';
import { Modal as ModalComponent } from 'react-bootstrap';

const Modal = ({
  close,
  show,
  title,
  message,
  action,
  callback,
  actionType = "success",
  size = "md",
  cancelText = "Cancel",
  hideCancelBtn = false,
  centered = false
}) => {
  return (
    <ModalComponent show={show} onHide={close} size={size} centered={centered}>
      <ModalComponent.Header closeButton>
        <ModalComponent.Title>{title} {(title == 'Approve' || title == 'Reject') ? ' Merchant' : ''}</ModalComponent.Title>
      </ModalComponent.Header>
      <ModalComponent.Body>{message}</ModalComponent.Body>
      <ModalComponent.Footer>
        {
          !hideCancelBtn && (
            <Button variant="default" onClick={close}>
              {cancelText}
            </Button>
          )
        }
        <Button variant={actionType} onClick={callback}>
          {action}
        </Button>
      </ModalComponent.Footer>
    </ModalComponent>
  )
}

export default Modal

