'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Flex,
  VStack,
  HStack,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import TamagotchiGif from './components/TamagotchiGif';
import MinesweeperWindow from './components/MinesweeperWindow';
import { motion } from 'framer-motion';
import { db } from '../../firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import RetroWindow from './components/RetroWindow';
import GoogleSearchWindow from './components/GoogleSearchWindow';
import WindowFrame from './components/WindowFrame';
import useIsMobile from './hooks/useIsMobile';
import { desktopProjects, projectHref } from './data/projects';

interface Question {
  id: number;
  title: string;
  difficulty: string;
  link: string;
}

const blind75Questions: Question[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
  {
    id: 3,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
  },
];

const RESUMES = [
  { label: 'SWE', file: '/Yuliana_Jasso_SWE_December_2027.pdf' },
  { label: 'AI / ML', file: '/Yuliana_Jasso_Resume_AI_ML_December_2027.pdf' },
];

const DesktopIcon = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = iconRef.current;
    if (!element) return;

    const handleClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Desktop icon clicked:', label);
      onClick();
    };

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Desktop icon touched:', label);
      onClick();
    };

    element.addEventListener('click', handleClick);
    element.addEventListener('touchstart', handleTouch);

    return () => {
      element.removeEventListener('click', handleClick);
      element.removeEventListener('touchstart', handleTouch);
    };
  }, [label, onClick]);

  return (
    <Box
      ref={iconRef}
      display="inline-block"
      cursor="pointer"
      userSelect="none"
      _hover={{ bg: '#FFB3D6', borderRadius: '6px' }}
      p={1}
      bg="transparent"
      border="none"
      outline="none"
      fontSize="inherit"
      fontFamily="inherit"
      lineHeight="inherit"
      _focus={{
        outline: '2px solid #1A3CA7',
        outlineOffset: '2px'
      }}
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      <VStack spacing={1} w="60px">
      {icon}
      <Text
        fontFamily="'Microsoft Sans Serif', sans-serif"
        fontSize="10px"
        color="#FFFFFF"
        textAlign="center"
      >
        {label}
      </Text>
    </VStack>
    </Box>
);
};

const GrayTaskbar = ({ toggleStart }: { toggleStart: () => void }) => (
  <Flex
    position="fixed"
    bottom={0}
    left={0}
    right={0}
    h="40px"
    bg="#C0C0C0"
    borderTop="2px solid #FFFFFF"
    borderBottom="2px solid #808080"
    boxShadow="inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #808080"
    align="center"
    px={4}
    fontFamily="'Microsoft Sans Serif', sans-serif"
    color="#000"
    userSelect="none"
    zIndex={20}
  >
    <Box
      bg="#E0E0E0"
      px={3}
      py={1}
      border="2px outset #808080"
      fontWeight="bold"
      fontSize="10px"
      cursor="pointer"
      _hover={{
        bg: '#D0D0D0'
      }}
      onClick={toggleStart}
    >
      START
    </Box>
  </Flex>
);

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showTamagotchi, setShowTamagotchi] = useState(false);
  const [showMinesweeper, setShowMinesweeper] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);
  const [resume, setResume] = useState(RESUMES[0]);

  const [petHappiness, setPetHappiness] = useState(100);
  const [happinessLoading, setHappinessLoading] = useState(true);
  const [typed, setTyped] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [completedQuestions] = useState<number[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [recentItems, setRecentItems] = useState<Array<{ label: string; action: () => void }>>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const typewriterText = `Welcome to My Portfolio\n\nI’m Yuli — AI Software Engineer & Creative Coder\n\nI'm a passionate software engineer who loves building innovative web applications. This portfolio showcases my journey through a unique 2000s-style desktop interface.`;

  useEffect(() => {
    let i = 0;
    const type = () => {
      if (i <= typewriterText.length) {
        setTyped(typewriterText.slice(0, i));
        i++;
        setTimeout(type, 20);
      } else {
        setTypingDone(true);
      }
    };
    if (showIntro) type();
  }, [showIntro]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    async function fetchHappiness() {
      setHappinessLoading(true);
      try {
        const docRef = doc(db, 'tamagotchi', 'pet');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPetHappiness(docSnap.data().happiness ?? 100);
        } else {
          setPetHappiness(100);
        }
      } catch {
        setPetHappiness(100);
      }
      setHappinessLoading(false);
    }
    if (showTamagotchi) fetchHappiness();
  }, [showTamagotchi]);

  useEffect(() => {
    const decay = setInterval(() => {
      setPetHappiness((h) => Math.max(0, h - 1));
    }, 30000);
    return () => clearInterval(decay);
  }, []);

  useEffect(() => {
    if (!currentQuestion) {
      const unanswered = blind75Questions.filter(q => !completedQuestions.includes(q.id));
      const random = unanswered[Math.floor(Math.random() * unanswered.length)];
      setCurrentQuestion(random || null);
    }
  }, [currentQuestion, completedQuestions]);

  const handleFeed = async () => {
    const newHappiness = Math.min(100, petHappiness + 25);
    setPetHappiness(newHappiness);
    await setDoc(doc(db, 'tamagotchi', 'pet'), { happiness: newHappiness });
  };

  const renderHearts = () => {
    const maxHearts = 4;
    const heartsToShow = Math.ceil(petHappiness / 25);
    return (
      <HStack spacing={2} mt={4} justify="center">
        {[...Array(maxHearts)].map((_, i) => (
          <Image
            key={i}
            src="/images/other/pixel-heart.png"
            alt="Heart"
            width={48}
            height={48}
            style={{ opacity: i < heartsToShow ? 1 : 0.2, transition: 'opacity 0.3s' }}
          />
        ))}
      </HStack>
    );
  };

  const renderIntro = () => (
    <RetroWindow title="Welcome to Nostalgia" onClose={() => setShowIntro(false)}>
      <VStack spacing={6} maxW="400px" mx="auto">
        <Image src="/images/other/pixel-heart.png" alt="Pixel Heart" width={48} height={48} style={{ margin: '0 auto' }} />
        <Box
          whiteSpace="pre-line"
          fontSize="14px"
          color="#000"
          fontFamily="'Microsoft Sans Serif', sans-serif"
          textAlign="center"
        >
          {typed}
        </Box>
        {typingDone && (
          <Button
            size="md"
            bg="#E0E0E0"
            color="#000"
            border="2px outset #808080"
            borderRadius="0"
            fontFamily="'Microsoft Sans Serif', sans-serif"
            fontSize="12px"
            px={4}
            py={2}
            _hover={{ border: '2px inset #808080', bg: '#D0D0D0' }}
            onClick={() => setShowIntro(false)}
          >
            ENTER 2000s
          </Button>
        )}
      </VStack>
    </RetroWindow>
  );

  const addRecentItem = (label: string, action: () => void) => {
    setRecentItems(prev => [
      { label, action },
      ...prev.filter(item => item.label !== label)
    ]);
  };

  // Mobile windows fill the screen, so only one is open at a time.
  const closeWindowsOnMobile = () => {
    if (!isMobile) return;
    setShowIntro(false);
    setShowTamagotchi(false);
    setShowMinesweeper(false);
    setShowResume(false);
    setShowContact(false);
    setShowPortfolio(false);
    setShowGoogle(false);
  };

  const openResume = () => {
    closeWindowsOnMobile();
    console.log('openResume called');
    setShowResume(true);
    addRecentItem('Resume.pdf', openResume);
  };

  const openContact = () => {
    closeWindowsOnMobile();
    console.log('openContact called');
    setShowContact(true);
    addRecentItem('Contact', openContact);
  };

  const openTamagotchi = () => {
    closeWindowsOnMobile();
    console.log('openTamagotchi called');
    setShowTamagotchi(true);
    addRecentItem('Tamagotchi', openTamagotchi);
  };

  const openMinesweeper = () => {
    closeWindowsOnMobile();
    console.log('openMinesweeper called');
    setShowMinesweeper(true);
    addRecentItem('Minesweeper', openMinesweeper);
  };

  const openPortfolio = () => {
    closeWindowsOnMobile();
    console.log('openPortfolio called');
    setShowPortfolio(true);
    addRecentItem('Portfolio', openPortfolio);
  };

  const openGoogle = () => {
    closeWindowsOnMobile();
    setShowGoogle(true);
    addRecentItem('Google', openGoogle);
  };

  const desktopIcons = [
    { icon: <Image src="/images/tamagotchi-icon.png" alt="Tamagotchi Icon" width={40} height={40} />, label: 'Tamagotchi', onClick: openTamagotchi },
    { icon: <Image src="/images/resume-pdf.png" alt="Resume PDF Icon" width={40} height={40} />, label: 'Resume.pdf', onClick: openResume },
    { icon: <Image src="/images/portfolio-icon.png" alt="Projects Icon" width={40} height={40} />, label: 'Projects', onClick: openPortfolio },
    { icon: <Image src="/images/contact-icon.png" alt="Contact Icon" width={40} height={40} />, label: 'Contact', onClick: openContact },
    { icon: <Image src="/images/minesweeper-icon.png" alt="Minesweeper Icon" width={40} height={40} />, label: 'Minesweeper', onClick: openMinesweeper },
    { icon: <Image src="/images/google-chrome.png" alt="Google Chrome Icon" width={40} height={40} />, label: 'Google', onClick: openGoogle },
  ];

  const getScreen = () => {
    if (happinessLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <VStack spacing={2}>
        <Box mt={2} mb={2}>{renderHearts()}</Box>
        <Box mt={0} mb={2} display="inline-block">
          <TamagotchiGif postId="24127301" width="200px" height="200px" />
        </Box>
        <Button
          size="md"
          bg="#E0E0E0"
          color="#000"
          border="2px outset #808080"
          borderRadius="0"
          fontFamily="'Microsoft Sans Serif', sans-serif"
          fontSize="12px"
          px={4}
          py={2}
          _hover={{ border: '2px inset #808080', bg: '#D0D0D0' }}
          onClick={handleFeed}
          isDisabled={petHappiness >= 100}
        >
          Feed
        </Button>
      </VStack>
    );
  };

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
      {isMobile ? (
        <VStack spacing={4} p={4} position="relative" zIndex={15} align="flex-start">
          {desktopIcons.map((item) => (
            <DesktopIcon key={item.label} {...item} />
          ))}
        </VStack>
      ) : (
        <Box position="relative" width="100vw" height="100vh" zIndex={15}>
          {desktopIcons.map((item, i) => (
            <motion.div key={item.label} drag dragMomentum={false} dragElastic={0} style={{ position: 'absolute', top: 40 + i * 80, left: 20 }}>
              <DesktopIcon {...item} />
            </motion.div>
          ))}
        </Box>
      )}

      {showIntro && (
        <WindowFrame top={60} left={320} width="420px">
          {renderIntro()}
        </WindowFrame>
      )}

      {showTamagotchi && (
        <WindowFrame top={260} left={440} width="420px">
          <RetroWindow title="Tamagotchi" onClose={() => setShowTamagotchi(false)}>
            {getScreen()}
          </RetroWindow>
        </WindowFrame>
      )}

      {showResume && (
        <WindowFrame top={220} left={400} width="900px" height="700px">
          <RetroWindow title="Resume.pdf" onClose={() => setShowResume(false)}>
            <Flex direction="column" h="100%">
              <HStack spacing={2} mb={2} flexWrap="wrap">
                {RESUMES.map((r) => (
                  <Button key={r.file} size="sm" bg={resume.file === r.file ? '#D0D0D0' : '#E0E0E0'} color="#000" border={resume.file === r.file ? '2px inset #808080' : '2px outset #808080'} borderRadius="0" fontFamily="'Microsoft Sans Serif', sans-serif" fontSize="10px" _hover={{ border: '2px inset #808080', bg: '#D0D0D0' }} onClick={() => setResume(r)}>{r.label}</Button>
                ))}
                <Button size="sm" bg="#E0E0E0" color="#000" border="2px outset #808080" borderRadius="0" fontFamily="'Microsoft Sans Serif', sans-serif" fontSize="10px" _hover={{ border: '2px inset #808080', bg: '#D0D0D0' }} onClick={() => window.open(resume.file, '_blank')}>View in New Tab</Button>
              </HStack>
              <iframe key={resume.file} src={resume.file} width="100%" style={{ border: "none", flex: 1 }} />
            </Flex>
          </RetroWindow>
        </WindowFrame>
      )}

      {showContact && (
        <WindowFrame top={180} left={360} width="400px" height="300px">
          <Box h="100%">
            <Box w="100%" h="100%" bg="#C0C0C0" border="2px solid #808080" boxShadow="inset -2px -2px 0 #808080, inset 2px 2px 0 #FFFFFF" display="flex" flexDirection="column">
              <Flex bg="#1A3CA7" color="#fff" px={3} py={1} justify="space-between" align="center" borderBottom="2px solid #808080" boxShadow="inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #B84878">
                <Text fontSize="14px" fontWeight="bold" textShadow="1px 1px #000">💌 Contact</Text>
                <Box
                  bg="#C0C0C0"
                  border="2px outset #fff"
                  color="#000"
                  px={2}
                  cursor="pointer"
                  fontSize="12px"
                  fontWeight="bold"
                  onClick={() => setShowContact(false)}
                  _hover={{ bg: '#D0D0D0' }}
                >
                  ✖
                </Box>
              </Flex>
              <Box flex="1" bg="#FFF0FB" border="2px inset #808080" p={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={4}>
                <Button size="md" bg="#E0E0E0" color="#000" border="2px outset #808080" borderRadius="0" fontFamily="'Microsoft Sans Serif', sans-serif" fontSize="12px" _hover={{ border: '2px inset #808080', bg: '#D0D0D0' }} onClick={() => window.location.href = "mailto:yulianadenissejasso@gmail.com"}>Email me!</Button>
                <Button size="md" bg="#E0E0E0" color="#000" border="2px outset #808080" borderRadius="0" fontFamily="'Microsoft Sans Serif', sans-serif" fontSize="12px" _hover={{ border: '2px inset #808080', bg: '#D0D0D0' }} onClick={() => window.open("https://www.linkedin.com/in/yuliana-jasso/", "_blank")}>Connect on LinkedIn</Button>
              </Box>
            </Box>
          </Box>
        </WindowFrame>
      )}

      {showPortfolio && (
        <WindowFrame top={120} left={320} width="800px" height="600px">
          <Box h="100%">
            <Box w="100%" h="100%" bg="#C0C0C0" border="2px solid #808080" boxShadow="inset -2px -2px 0 #808080, inset 2px 2px 0 #FFFFFF" display="flex" flexDirection="column">
              <Flex bg="#1A3CA7" color="#fff" px={3} py={1} justify="space-between" align="center" borderBottom="2px solid #808080" boxShadow="inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #B84878">
                <Text fontSize="14px" fontWeight="bold" textShadow="1px 1px #000">🗂️ Projects</Text>
                <Box
                  bg="#C0C0C0"
                  border="2px outset #fff"
                  color="#000"
                  px={2}
                  cursor="pointer"
                  fontSize="12px"
                  fontWeight="bold"
                  onClick={() => setShowPortfolio(false)}
                  _hover={{ bg: '#D0D0D0' }}
                >
                  ✖
                </Box>
              </Flex>
              <Box flex="1" bg="#FFF0FB" border="2px inset #808080" p={4} overflowY="auto">
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="16px" fontWeight="bold" mb={2}>
                      Welcome to My Projects Desktop
                    </Text>
                    <Text fontSize="12px" color="#666" mb={4}>
                      Click on any project icon to view details
                    </Text>
                  </Box>
                  
                  <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                    {desktopProjects.map((project) => (
                      <VStack
                        key={project.name}
                        spacing={2}
                        cursor="pointer"
                        onClick={() => window.open(projectHref(project), '_blank')}
                        _hover={{ transform: 'scale(1.05)' }}
                        transition="transform 0.2s"
                      >
                        <Flex h="48px" align="center">
                          <Image src={project.icon!} alt={`${project.name} Icon`} width={project.iconSize?.width ?? 48} height={project.iconSize?.height ?? 48} />
                        </Flex>
                        <Text fontSize="12px" fontWeight="bold" textAlign="center" color="#000">
                          {project.name}
                        </Text>
                      </VStack>
                    ))}
                  </SimpleGrid>
                </VStack>
              </Box>
            </Box>
          </Box>
        </WindowFrame>
      )}




      {showGoogle && (
        <GoogleSearchWindow onClose={() => setShowGoogle(false)} />
      )}

      {showMinesweeper && (
        <MinesweeperWindow onClose={() => setShowMinesweeper(false)} />
      )}

      <GrayTaskbar toggleStart={() => setStartMenuOpen(!startMenuOpen)} />

      {startMenuOpen && (
        <Box
          position="fixed"
          bottom="40px"
          left="0"
          bg="#C0C0C0"
          w="200px"
          border="2px solid #808080"
          boxShadow="inset -2px -2px 0 #808080, inset 2px 2px 0 #FFFFFF"
          zIndex={50}
        >
          <VStack align="stretch" spacing={0}>
            {recentItems.length === 0 ? (
              <Box
                px={3}
                py={2}
                fontSize="10px"
                borderBottom="1px solid #808080"
                color="#000"
              >
                No recent items
              </Box>
            ) : recentItems.map(item => (
              <Box
                key={item.label}
                px={3}
                py={2}
                fontSize="10px"
                color="#000"
                cursor="pointer"
                _hover={{ bg: '#FFB3D6' }}
                onClick={() => {
                  item.action();
                  setStartMenuOpen(false);
                }}
              >
                {item.label}
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
}
