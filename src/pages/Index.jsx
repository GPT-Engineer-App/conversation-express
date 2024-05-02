import { useState } from "react";
import { Box, Button, Container, Flex, Input, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Cannot send empty message.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex height="100vh" flexDirection="column" justifyContent="space-between">
        <VStack spacing={4} overflowY="auto" p={4} flex="1">
          {messages.map((message) => (
            <Box key={message.id} bg="teal.500" color="white" p={3} borderRadius="lg" alignSelf="flex-end" maxWidth="80%">
              <Text fontSize="sm">{message.text}</Text>
              <Text fontSize="xs" opacity={0.7}>
                {message.timestamp}
              </Text>
            </Box>
          ))}
        </VStack>
        <Stack direction="row" p={4}>
          <Input placeholder="Type a message..." value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} flex="1" />
          <Button colorScheme="teal" onClick={handleSendMessage}>
            <FaPaperPlane />
          </Button>
        </Stack>
      </Flex>
    </Container>
  );
};

export default Index;
