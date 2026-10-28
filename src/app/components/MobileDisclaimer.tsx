'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
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
      bg="rgba(0, 0, 0, 0.4)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box w="100%" maxW="340px">
        <RetroWindow title="⚠️ Heads up!" onClose={dismiss}>
          <VStack spacing={4} fontFamily="'Microsoft Sans Serif', sans-serif" textAlign="center">
            <Text fontSize="32px" lineHeight="1">🖥️</Text>
            <Text fontSize="14px" fontWeight="bold" color="#000">
              Best experienced on desktop
            </Text>
            <Text fontSize="12px" color="#333">
              This portfolio is a 2000s-style desktop with draggable windows. You can browse it on mobile, but
              visit on a computer for the full experience.
            </Text>
            <Button
              size="md"
              bg="#E0E0E0"
              color="#000"
              border="2px outset #808080"
              borderRadius="0"
              fontFamily="'Microsoft Sans Serif', sans-serif"
              fontSize="12px"
              _hover={{ border: '2px inset #808080', bg: '#D0D0D0' }}
              onClick={dismiss}
            >
              Continue anyway
            </Button>
          </VStack>
        </RetroWindow>
      </Box>
    </Box>
  );
}
