'use client';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

interface WindowFrameProps {
  top: number;
  left: number;
  width: string;
  height?: string;
  zIndex?: number;
  children: React.ReactNode;
}

// Draggable window on desktop; on mobile, a fixed window that fits the screen above the taskbar.
export default function WindowFrame({ top, left, width, height, zIndex = 20, children }: WindowFrameProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Box
        position="fixed"
        left="8px"
        right="8px"
        zIndex={zIndex}
        display="flex"
        flexDirection="column"
        {...(height
          ? { top: '8px', bottom: '48px' }
          : { top: '50%', transform: 'translateY(-50%)', maxH: 'calc(100dvh - 56px)', overflowY: 'auto' })}
      >
        {children}
      </Box>
    );
  }

  return (
    <motion.div drag dragMomentum={false} dragElastic={0} style={{ position: 'absolute', top, left, zIndex }}>
      <Box w={width} h={height}>
        {children}
      </Box>
    </motion.div>
  );
}
