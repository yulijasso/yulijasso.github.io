'use client'

import { useState, useEffect } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

interface MinesweeperWindowProps {
  onClose: () => void;
  addPoints?: (points: number) => void;
}

interface Tile {
  revealed: boolean;
  bomb: boolean;
  adjacent: number;
}

export default function MinesweeperWindow({ onClose, addPoints }: MinesweeperWindowProps) {
  const rows = 9
  const cols = 9
  const bombsCount = 10

  const createEmptyBoard = () => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        revealed: false,
        bomb: false,
        adjacent: 0,
      }))
    )
  }

  const [board, setBoard] = useState(createEmptyBoard())
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const newBoard = createEmptyBoard()

    let bombsPlaced = 0
    while (bombsPlaced < bombsCount) {
      const r = Math.floor(Math.random() * rows)
      const c = Math.floor(Math.random() * cols)
      if (!newBoard[r][c].bomb) {
        newBoard[r][c].bomb = true
        bombsPlaced++
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newBoard[r][c].bomb) continue
        let count = 0
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr
            const nc = c + dc
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              if (newBoard[nr][nc].bomb) count++
            }
          }
        }
        newBoard[r][c].adjacent = count
      }
    }

    setBoard(newBoard)
    setGameOver(false)
    setWon(false)
  }

  const revealTile = (r: number, c: number) => {
    if (gameOver || board[r][c].revealed) return

    const newBoard = JSON.parse(JSON.stringify(board))
    const queue = [[r, c]]

    while (queue.length) {
      const [curR, curC] = queue.pop()!
      if (newBoard[curR][curC].revealed) continue

      newBoard[curR][curC].revealed = true
      if (addPoints) {
        addPoints(1)
      }

      if (newBoard[curR][curC].bomb) {
        setGameOver(true)
        revealAllBombs(newBoard)
        setBoard(newBoard)
        return
      }

      if (newBoard[curR][curC].adjacent === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = curR + dr
            const nc = curC + dc
            if (
              nr >= 0 &&
              nr < rows &&
              nc >= 0 &&
              nc < cols &&
              !newBoard[nr][nc].revealed
            ) {
              queue.push([nr, nc])
            }
          }
        }
      }
    }

    const allSafeRevealed = newBoard.every((row: Tile[]) =>
      row.every((tile: Tile) => tile.bomb || tile.revealed)
    )
    if (allSafeRevealed) {
      setGameOver(true)
      setWon(true)
      if (addPoints) {
        addPoints(100)
      }
    }

    setBoard(newBoard)
  }

  const revealAllBombs = (newBoard: Tile[][]) => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newBoard[r][c].bomb) {
          newBoard[r][c].revealed = true
        }
      }
    }
  }

  return (
    <Box position="absolute" top={{ base: '40%', md: '30%' }} left={{ base: '50%', md: '40%' }} transform="translate(-50%, -50%)" zIndex={30}>
      <motion.div drag dragConstraints={{ top: -1000, bottom: 1000, left: -1000, right: 1000 }}>
        <Box
          w="250px"
          bg="#C0C0C0"
          border="3px ridge #808080"
          boxShadow="4px 4px 0 #808080"
          fontFamily="'VT323', monospace"
        >
          <Flex
            bg="#1A3CA7"
            color="#fff"
            px={2}
            py={1}
            justify="space-between"
            align="center"
          >
            <Text fontSize="14px" color="#fff">
              Minesweeper
            </Text>
            <Box
              bg="#C0C0C0"
              border="2px outset #fff"
              color="#000"
              px={2}
              cursor="pointer"
              fontSize="12px"
              fontWeight="bold"
              onClick={onClose}
              _hover={{ bg: '#D0D0D0' }}
            >
              ✖
            </Box>
          </Flex>
          <Box p={3}>
            <Flex justify="space-between" mb={2}>
              <Box
                w="40px"
                h="24px"
                bg="black"
                color="red"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="12px"
              >
                {bombsCount}
              </Box>
              <Box
                w="24px"
                h="24px"
                bg="#C0C0C0"
                border="2px outset #fff"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="14px"
                cursor="pointer"
                onClick={startNewGame}
              >
                🙂
              </Box>
              <Box
                w="40px"
                h="24px"
                bg="black"
                color="red"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="12px"
              >
                {gameOver ? (won ? "WIN" : "BOOM") : "000"}
              </Box>
            </Flex>
            <Box
              mx="auto"
              display="grid"
              gridTemplateColumns={`repeat(${cols}, 24px)`}
              gap="2px"
            >
              {board.map((row, r) =>
                row.map((tile, c) => (
                  <Box
                    key={`${r}-${c}`}
                    w="24px"
                    h="24px"
                    bg={tile.revealed ? "#E0E0E0" : "#C0C0C0"}
                    border="2px outset #fff"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    fontSize="12px"
                    color={tile.bomb && tile.revealed ? "red" : "black"}
                    cursor="pointer"
                    _hover={{ bg: "#D0D0D0" }}
                    onClick={() => revealTile(r, c)}
                  >
                    {tile.revealed
                      ? tile.bomb
                        ? "💣"
                        : tile.adjacent > 0
                        ? tile.adjacent
                        : ""
                      : ""}
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  )
}