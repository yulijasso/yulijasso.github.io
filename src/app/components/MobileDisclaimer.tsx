'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import RetroWindow from './RetroWindow';
import useIsMobile from '../hooks/useIsMobile';

const DISMISSED_KEY = 'mobile-disclaimer-dismissed';

// Tells phone visitors the desktop interface is the intended experience. Shown once per session.
export default function MobileDisclaimer() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) return;
    try {
      if (sessionStorage.getItem(DISMISSED_KEY)) return;
    } catch {}
    setOpen(true);
  }, [isMobile]);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, '1');
    } catch {}
  };

  if (!isMobile || !open) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={100}
      bg="rgba(224, 33, 138, 0.35)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box w="100%" maxW="340px" boxShadow="4px 4px 0 #808080">
        <RetroWindow title="System Message" onClose={dismiss}>
          <VStack spacing={4} fontFamily="'Microsoft Sans Serif', sans-serif" color="#000">
            <HStack spacing={3} align="flex-start">
              <Box flexShrink={0} pt={1}>
                <Image src="/images/other/pixel-heart.png" alt="Pixel Heart" width={36} height={36} />
              </Box>
              <VStack spacing={2} align="flex-start">
                <Text fontSize="13px" fontWeight="bold">
                  This desktop was made for a bigger screen!
                </Text>
                <Text fontSize="12px" lineHeight="1.4">
                  You can look around on your phone, but the draggable windows and games work best on a computer.
                </Text>
              </VStack>
            </HStack>

            <Flex
              bg="#000"
              color="#FFB3D6"
              border="2px inset #808080"
              px={2}
              py={1}
              fontSize="10px"
              fontWeight="bold"
              letterSpacing="1px"
              userSelect="none"
            >
              ★ BEST VIEWED AT 1024×768 ★
            </Flex>

            <Button
              size="md"
              bg="#E0E0E0"
              color="#000"
              border="2px outset #808080"
              borderRadius="0"
              fontFamily="'Microsoft Sans Serif', sans-serif"
              fontSize="12px"
              minW="80px"
              px={4}
              py={2}
              _hover={{ border: '2px inset #808080', bg: '#D0D0D0' }}
              onClick={dismiss}
            >
              OK
            </Button>
          </VStack>
        </RetroWindow>
      </Box>
    </Box>
  );
}
