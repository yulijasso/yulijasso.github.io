'use client';

import { useState, useRef, useCallback } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

interface ResizableWindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  initialTop?: number;
  initialLeft?: number;
  zIndex?: number;
  headerBg?: string;
}

interface ResizeHandle {
  position: string;
  cursor: string;
  style: React.CSSProperties;
}

const ResizableWindow: React.FC<ResizableWindowProps> = ({
  title,
  onClose,
  children,
  initialWidth = 800,
  initialHeight = 600,
  initialTop = 80,
  initialLeft = 80,
  zIndex = 10,
  headerBg = "#1A3CA7"
}) => {
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isResizing, setIsResizing] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const isMobile = useIsMobile();

  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    };
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startPosRef.current.x;
      const deltaY = e.clientY - startPosRef.current.y;
      let newWidth = startPosRef.current.width;
      let newHeight = startPosRef.current.height;
      if (direction.includes('e')) newWidth = Math.max(300, startPosRef.current.width + deltaX);
      if (direction.includes('w')) newWidth = Math.max(300, startPosRef.current.width - deltaX);
      if (direction.includes('s')) newHeight = Math.max(200, startPosRef.current.height + deltaY);
      if (direction.includes('n')) newHeight = Math.max(200, startPosRef.current.height - deltaY);
      setSize({ width: newWidth, height: newHeight });
    };
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [size]);

  const resizeHandles: ResizeHandle[] = [
    { position: 'nw', cursor: 'nw-resize', style: { top: -3, left: -3, width: 8, height: 8 } },
    { position: 'ne', cursor: 'ne-resize', style: { top: -3, right: -3, width: 8, height: 8 } },
    { position: 'sw', cursor: 'sw-resize', style: { bottom: -3, left: -3, width: 8, height: 8 } },
    { position: 'se', cursor: 'se-resize', style: { bottom: -3, right: -3, width: 8, height: 8 } }
  ];

  // On mobile, windows stack full-width in page order instead of floating at desktop coordinates.
  const frameStyle: React.CSSProperties = isMobile
    ? { position: 'relative', margin: '8px', zIndex, width: 'calc(100% - 16px)', height: Math.min(size.height, 520) }
    : { position: 'absolute', top: initialTop, left: initialLeft, zIndex, width: size.width, height: size.height };

  return (
    <motion.div
      drag={!isResizing && !isMobile}
      dragMomentum={false}
      dragElastic={0}
      style={frameStyle}
    >
      <Box
        width="100%"
        height="100%"
        bg="#C0C0C0"
        border="2px solid #808080"
        boxShadow="inset -2px -2px 0 #808080, inset 2px 2px 0 #FFFFFF"
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        {/* Title Bar */}
        <Flex
          bg={headerBg}
          color="#fff"
          px={3}
          py={1}
          justify="space-between"
          align="center"
          borderBottom="2px solid #808080"
          boxShadow="inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #B84878"
        >
          <Text fontSize="14px" fontWeight="bold" textShadow="1px 1px #000">
            {title}
          </Text>
          <Box
            bg="#C0C0C0"
            border="2px outset #808080"
            color="#000"
            px={2}
            cursor="pointer"
            fontSize="12px"
            fontWeight="bold"
            _hover={{ bg: '#D0D0D0' }}
            onClick={onClose}
            onPointerDown={e => e.stopPropagation()}
          >
            ✖
          </Box>
        </Flex>
        {/* Window Content */}
        <Box
          flex="1"
          bg="#FFF0FB"
          border="2px inset #808080"
          overflow="auto"
          position="relative"
          pointerEvents="auto"
          className="retro-scrollbar"
          sx={{
            '&.retro-scrollbar': { scrollbarWidth: 'thin' },
            '&.retro-scrollbar::-webkit-scrollbar': { width: '16px', height: '16px' },
            '&.retro-scrollbar::-webkit-scrollbar-track': { background: '#C0C0C0', border: '1px inset #C0C0C0' },
            '&.retro-scrollbar::-webkit-scrollbar-thumb': { background: 'linear-gradient(90deg, #DFDFDF 0%, #C0C0C0 50%, #808080 100%)', border: '1px outset #C0C0C0', borderRadius: '0' },
            '&.retro-scrollbar::-webkit-scrollbar-thumb:hover': { background: 'linear-gradient(90deg, #E8E8E8 0%, #D0D0D0 50%, #909090 100%)' },
            '&.retro-scrollbar::-webkit-scrollbar-thumb:active': { background: 'linear-gradient(90deg, #B0B0B0 0%, #A0A0A0 50%, #707070 100%)', border: '1px inset #C0C0C0' },
            '&.retro-scrollbar::-webkit-scrollbar-corner': { background: '#C0C0C0' },
            '&.retro-scrollbar::-webkit-scrollbar-button': { background: 'linear-gradient(45deg, #DFDFDF 0%, #C0C0C0 50%, #808080 100%)', border: '1px outset #C0C0C0', width: '16px', height: '16px' },
            '&.retro-scrollbar::-webkit-scrollbar-button:hover': { background: 'linear-gradient(45deg, #E8E8E8 0%, #D0D0D0 50%, #909090 100%)' },
            '&.retro-scrollbar::-webkit-scrollbar-button:active': { background: 'linear-gradient(45deg, #B0B0B0 0%, #A0A0A0 50%, #707070 100%)', border: '1px inset #C0C0C0' },
            '&.retro-scrollbar::-webkit-scrollbar-button:single-button:vertical:decrement': { borderTop: '1px outset #C0C0C0' },
            '&.retro-scrollbar::-webkit-scrollbar-button:single-button:vertical:increment': { borderBottom: '1px outset #C0C0C0' },
            '&.retro-scrollbar::-webkit-scrollbar-button:single-button:horizontal:decrement': { borderLeft: '1px outset #C0C0C0' },
            '&.retro-scrollbar::-webkit-scrollbar-button:single-button:horizontal:increment': { borderRight: '1px outset #C0C0C0' }
          }}
        >
          {children}
        </Box>
        {/* Resize Handles - Invisible corner handles */}
        {!isMobile && resizeHandles.map((handle) => (
          <Box
            key={handle.position}
            position="absolute"
            cursor={handle.cursor}
            style={handle.style}
            bg="transparent"
            onMouseDown={(e) => handleResizeStart(e, handle.position)}
            zIndex={1000}
          />
        ))}
      </Box>
    </motion.div>
  );
};

export default ResizableWindow;