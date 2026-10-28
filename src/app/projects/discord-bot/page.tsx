'use client';

import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';

import { FaGithub } from 'react-icons/fa';
import ResizableWindow from '../../components/ResizableWindow';

export default function DiscordBotPage() {


  return (
    <Box
      minH="100vh"
      bg="#E0218A"
      bgImage="url('/images/wallpaper.png')"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      fontFamily="'Microsoft Sans Serif', sans-serif"
      position="relative"
      pb="80px"
    >
      <ResizableWindow
        title="Discord Bot"
        onClose={() => window.location.href = '/'}
        initialWidth={600}
        initialHeight={450}
        initialTop={200}
        initialLeft={300}
        zIndex={10}
      >
        <Box p={4}>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontSize="16px" fontWeight="bold" mb={2}>
                    🤖 Real-time Chat Bot for Discord
                  </Text>
                  <Text fontSize="12px" color="#666" lineHeight="1.4">
                    I built a Discord bot that responds directly when users type in, #chat, followed by their message. This bot enhances interaction by providing instant replies within the same message thread, making communication seamless and engaging.
                  </Text>
                </Box>

                <HStack spacing={4} mt={4}>
                  <Button
                    size="sm"
                    bg="#E0E0E0"
                    color="#000"
                    border="2px outset #808080"
                    borderRadius="0"
                    fontFamily="'Microsoft Sans Serif', sans-serif"
                    fontSize="10px"
                    _hover={{ border: '2px inset #808080', bg: '#D0D0D0' }}
                    leftIcon={<FaGithub />}
                    onClick={() => window.open('https://github.com/yulijasso/discord-bot', '_blank')}
                  >
                    Source Code
                  </Button>
                </HStack>

                <Button
                  size="sm"
                  bg="#E0E0E0"
                  color="#000"
                  border="2px outset #808080"
                  borderRadius="0"
                  fontFamily="'Microsoft Sans Serif', sans-serif"
                  fontSize="10px"
                  _hover={{
                    border: '2px inset #808080',
                    bg: '#D0D0D0'
                  }}
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); window.location.href = '/'; }}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  Back to Portfolio
                </Button>
              </VStack>
        </Box>
      </ResizableWindow>
    </Box>
  );
} 