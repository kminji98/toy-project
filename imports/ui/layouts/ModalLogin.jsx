import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import  LoginForm  from './LoginLayout.jsx';


const ModalLogin = () => (
  <Modal dimmer="inverted" trigger={ <Button content='Log In' inverted basic/>}>
    <Modal.Content><LoginForm /></Modal.Content>
  </Modal>
)

export default ModalLogin