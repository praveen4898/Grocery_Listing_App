

import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Box
} from '@chakra-ui/react'; 

const Grocerycad = ({ grocery, onDelete ,onUpdate}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const [updatedGrocery, setUpdatedGrocery] = useState({ ...grocery });

  const handledelete = async () => {
    try {
      await axios.delete(`https://groceryjsonserver.onrender.com/groceries/${grocery.id}`);
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`https://groceryjsonserver.onrender.com/groceries/${grocery.id}`, updatedGrocery);
      onClose();
      onUpdate()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{textAlign:"left", padding:"10px", color:"yellow"}}>
      <h2>NAME: <h3 style={{color:"white"}}>{grocery.name}</h3></h2>
      <h2>QUANTITY: <h3 style={{color:"white"}}>{grocery.quantity}</h3></h2>
      <h2>PRICE: <h3 style={{color:"white"}}>{grocery.price}</h3></h2>
      <h2>DESCRIPTION:<h3 style={{color:"white"}}> {grocery.description}</h3></h2>

      <button onClick={handledelete}>DELETE</button>
      <Button onClick={onOpen}>EDIT</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent maxW="lg" isCentered style={{ backgroundColor: 'lightblue' }}>
          <ModalHeader>To Edit the Grocery Details</ModalHeader>
          <ModalBody pb={6}>
            <Box maxW="lg" mx="auto">
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  value={updatedGrocery.name}
                  onChange={(e) => setUpdatedGrocery({ ...updatedGrocery, name: e.target.value })}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  placeholder="Quantity"
                  value={updatedGrocery.quantity}
                  onChange={(e) => setUpdatedGrocery({ ...updatedGrocery, quantity: e.target.value })}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Price"
                  value={updatedGrocery.price}
                  onChange={(e) => setUpdatedGrocery({ ...updatedGrocery, price: e.target.value })}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Description"
                  value={updatedGrocery.description}
                  onChange={(e) => setUpdatedGrocery({ ...updatedGrocery, description: e.target.value })}
                />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <hr />
    </div>
  );
};

export default Grocerycad;
