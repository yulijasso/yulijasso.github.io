'use client';

import { useEffect, useRef, useState } from 'react';
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

const MIN_WIDTH = 240;
const MIN_HEIGHT = 140;

type Edge = 'e' | 's' | 'se';

const HANDLES: { edge: Edge; cursor: string; style: React.CSSProperties }[] = [
  { edge: 'e', cursor: 'ew-resize', style: { top: 0, right: -4, width: 8, bottom: 12 } },
  { edge: 's', cursor: 'ns-resize', style: { left: 0, bottom: -4, height: 8, right: 12 } },
  { edge: 'se', cursor: 'nwse-resize', style: { right: -4, bottom: -4, width: 16, height: 16 } },
];

// Draggable, resizable window on desktop; on mobile, a fixed window that fits the screen above the taskbar.
export default function WindowFrame({ top, left, width, height, zIndex = 20, children }: WindowFrameProps) {
  const isMobile = useIsMobile();
  const boxRef = useRef<HTMLDivElement>(null);
  // Null until the first resize, so windows open at their declared size.
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const [resizing, setResizing] = useState(false);

  // Framer Motion starts dragging from a native pointerdown on the window, so the
  // handles need a native listener on this inner box (which fires first) to stop it.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    const onPointerDown = (e: PointerEvent) => {
      const edge = (e.target as HTMLElement).dataset.resizeEdge as Edge | undefined;
      if (!edge) return;
      e.preventDefault();
      e.stopPropagation();
      const start = { x: e.clientX, y: e.clientY, width: box.offsetWidth, height: box.offsetHeight };
      const previousUserSelect = document.body.style.userSelect;
      document.body.style.userSelect = 'none';
      setResizing(true);

      const onMove = (ev: PointerEvent) => {
        setSize({
          width: edge === 's' ? start.width : Math.max(MIN_WIDTH, start.width + ev.clientX - start.x),
          height: edge === 'e' ? start.height : Math.max(MIN_HEIGHT, start.height + ev.clientY - start.y),
        });
      };
      const onUp = () => {
        document.body.style.userSelect = previousUserSelect;
        setResizing(false);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
      };
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    };

    box.addEventListener('pointerdown', onPointerDown);
    return () => box.removeEventListener('pointerdown', onPointerDown);
  }, [isMobile]);

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
      <Box
        ref={boxRef}
        position="relative"
        w={size ? `${size.width}px` : width}
        h={size ? `${size.height}px` : height}
      >
        {children}
        {/* Covers iframes (the resume PDF) so they don't swallow pointer moves mid-resize. */}
        {resizing && <Box position="absolute" inset={0} zIndex={1} />}
        {HANDLES.map(({ edge, cursor, style }) => (
          <Box
            key={edge}
            position="absolute"
            cursor={cursor}
            style={style}
            zIndex={2}
            data-resize-edge={edge}
          />
        ))}
      </Box>
    </motion.div>
  );
}
