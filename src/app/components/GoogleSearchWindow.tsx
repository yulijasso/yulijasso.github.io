'use client'

import { useState } from 'react'
import { Box, Flex, HStack, Input, Text, VStack } from '@chakra-ui/react'
import RetroWindow from './RetroWindow'
import WindowFrame from './WindowFrame'
import { CATEGORIES, CATEGORY_ALIASES, Category, projects, projectHref, Project } from '../data/projects'

interface GoogleSearchWindowProps {
  onClose: () => void;
}

const LOGO_COLORS = ['#1A3CA7', '#D62408', '#F2B50F', '#1A3CA7', '#069E2D', '#D62408']

const GoogleLogo = ({ size }: { size: string }) => (
  <Text
    as="span"
    fontFamily="'Times New Roman', Georgia, serif"
    fontSize={size}
    fontWeight="bold"
    letterSpacing="-1px"
    lineHeight="1"
    userSelect="none"
    textShadow="2px 2px 1px #999"
  >
    {'Google'.split('').map((ch, i) => (
      <span key={i} style={{ color: LOGO_COLORS[i] }}>{ch}</span>
    ))}
  </Text>
)

const RetroButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <Box
    as="button"
    bg="#E0E0E0"
    color="#000"
    border="2px outset #808080"
    fontFamily="Arial, sans-serif"
    fontSize="12px"
    px={3}
    py={1}
    _hover={{ bg: '#D0D0D0' }}
    _active={{ border: '2px inset #808080' }}
    onClick={onClick}
  >
    {children}
  </Box>
)

const tokenize = (s: string) => s.toLowerCase().split(/\W+/).filter(Boolean)

// Terms match at the start of a word, so "rag" finds "RAG" but not "leveraging".
const termPattern = (terms: string[]) => new RegExp(`\\b(${terms.join('|')})`, 'gi')

// Rank projects by how many query terms hit the name, technologies, and description.
function searchProjects(query: string, pool: Project[] = projects): Project[] {
  const terms = tokenize(query)
  if (terms.length === 0) return pool
  const patterns = terms.map((term) => new RegExp(`\\b${term}`, 'i'))
  return pool
    .map((project) => {
      const tech = project.technologies.join(' ')
      const categories = project.categories.flatMap((c) => [c, ...CATEGORY_ALIASES[c]]).join(' ')
      let score = 0
      for (const re of patterns) {
        if (re.test(project.name)) score += 3
        if (re.test(tech)) score += 2
        if (re.test(categories)) score += 2
        if (re.test(project.description)) score += 1
      }
      return { project, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.project)
}

// Bold every occurrence of a query term, like the old results snippets.
function highlight(text: string, query: string) {
  const terms = tokenize(query)
  if (terms.length === 0) return text
  return text.split(termPattern(terms)).map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part))
}

// A query that is exactly a category name or alias ("ml", "swe", ...) opens that category.
const categoryFor = (query: string): Category | undefined =>
  CATEGORIES.find((c) => CATEGORY_ALIASES[c].includes(query.trim().toLowerCase()))

const displayUrl = (project: Project) =>
  project.route ? `www.yulijasso.com${project.route}/` : project.demo_link.replace(/^https?:\/\//, '')

export default function GoogleSearchWindow({ onClose }: GoogleSearchWindowProps) {
  const [input, setInput] = useState('')
  // null query = the Google home page; '' = browsing a category with no search terms.
  const [query, setQuery] = useState<string | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [elapsed, setElapsed] = useState('0.00')

  const pool = category ? projects.filter((p) => p.categories.includes(category)) : projects
  const results = query === null ? [] : searchProjects(query, pool)

  const tick = () => setElapsed((Math.random() * 0.2 + 0.03).toFixed(2))

  const runSearch = (q: string) => {
    if (!q.trim()) return
    tick()
    const matched = categoryFor(q)
    if (matched) {
      setCategory(matched)
      setQuery('')
    } else {
      // A typed search starts over across all categories; tabs narrow it afterwards.
      setCategory(null)
      setQuery(q.trim())
    }
  }

  const pickCategory = (c: Category | null) => {
    tick()
    setCategory(c)
    if (query === null) setQuery('')
  }

  const feelingLucky = () => {
    const top = input.trim() && !categoryFor(input) ? searchProjects(input)[0] : undefined
    if (top) window.open(projectHref(top), '_blank')
    else runSearch(input)
  }

  const goHome = () => {
    setQuery(null)
    setCategory(null)
    setInput('')
  }

  const categoryTabs = (
    <HStack spacing={3} fontSize="12px" flexWrap="wrap" justify="center">
      {[null, ...CATEGORIES].map((c) => {
        const active = query !== null && category === c
        return (
          <Text
            key={c ?? 'all'}
            as="span"
            cursor="pointer"
            fontWeight={active ? 'bold' : 'normal'}
            color={active ? '#000' : '#00c'}
            textDecoration={active ? 'none' : 'underline'}
            onClick={() => pickCategory(c)}
          >
            {c ?? 'All'}
          </Text>
        )
      })}
    </HStack>
  )

  const searchLabel = query ? (category ? `${query} in ${category}` : query) : category ?? 'all projects'

  const searchBox = (width: string) => (
    <Input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && runSearch(input)}
      w={width}
      maxW="100%"
      h="26px"
      bg="#fff"
      color="#000"
      border="2px inset #808080"
      borderRadius="0"
      fontFamily="Arial, sans-serif"
      fontSize="13px"
      px={2}
      autoFocus
    />
  )

  return (
    <WindowFrame top={100} left={360} width="640px" height="480px">
        <RetroWindow title="Google - Microsoft Internet Explorer" onClose={onClose}>
          <Box bg="#fff" m={-4} minH="calc(100% + 32px)" fontFamily="Arial, sans-serif" color="#000">
            <Flex bg="#C0C0C0" px={2} py={1} align="center" gap={2} borderBottom="1px solid #808080" fontSize="11px">
              <Text>Address</Text>
              <Box flex="1" bg="#fff" border="2px inset #808080" px={1} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {query === null
                  ? 'http://www.google.com/'
                  : `http://www.google.com/search?q=${encodeURIComponent(query).replace(/%20/g, '+')}${category ? `&cat=${encodeURIComponent(category)}` : ''}`}
              </Box>
            </Flex>

            {query === null ? (
              <VStack spacing={4} pt={12} pb={8}>
                <GoogleLogo size="72px" />
                {categoryTabs}
                <Text fontSize="12px" color="#555">Searching Yuli&apos;s {projects.length} projects</Text>
                {searchBox('360px')}
                <HStack spacing={2}>
                  <RetroButton onClick={() => runSearch(input)}>Google Search</RetroButton>
                  <RetroButton onClick={feelingLucky}>I&apos;m Feeling Lucky</RetroButton>
                </HStack>
                <Text fontSize="11px" color="#555" pt={6}>
                  Try: <Text as="span" color="#00c" textDecoration="underline" cursor="pointer" onClick={() => { setInput('RAG'); runSearch('RAG') }}>RAG</Text>
                  {' · '}
                  <Text as="span" color="#00c" textDecoration="underline" cursor="pointer" onClick={() => { setInput('hackathon'); runSearch('hackathon') }}>hackathon</Text>
                  {' · '}
                  <Text as="span" color="#00c" textDecoration="underline" cursor="pointer" onClick={() => { setInput('chrome extension'); runSearch('chrome extension') }}>chrome extension</Text>
                </Text>
                <Text fontSize="10px" color="#777" pt={4}>©2001 Google</Text>
              </VStack>
            ) : (
              <Box px={3} py={3}>
                <HStack spacing={3} align="center" mb={3} flexWrap="wrap">
                  <Box cursor="pointer" onClick={goHome}>
                    <GoogleLogo size="32px" />
                  </Box>
                  {searchBox('260px')}
                  <RetroButton onClick={() => runSearch(input)}>Google Search</RetroButton>
                </HStack>

                <Box mb={2}>{categoryTabs}</Box>

                <Flex bg="#E5ECF9" borderTop="1px solid #3366CC" px={2} py={1} justify="space-between" flexWrap="wrap" gap={1} fontSize="12px" mb={3}>
                  <Text fontWeight="bold">{category ?? 'Web'}</Text>
                  {results.length > 0 && (
                    <Text>
                      Results <b>1</b> - <b>{results.length}</b> of about <b>{results.length}</b> for <b>{searchLabel}</b>. ({elapsed} seconds)
                    </Text>
                  )}
                </Flex>

                {results.length === 0 ? (
                  <Box fontSize="13px" px={2}>
                    <Text mb={2}>Your search - <b>{searchLabel}</b> - did not match any projects.</Text>
                    <Text>Suggestions:</Text>
                    <Box as="ul" pl={6}>
                      <li>Make sure all words are spelled correctly.</li>
                      <li>Try different keywords, like &quot;RAG&quot;, &quot;CNN&quot;, or &quot;Next.js&quot;.</li>
                      {category && <li>Search in <Text as="span" color="#00c" textDecoration="underline" cursor="pointer" onClick={() => pickCategory(null)}>All</Text> categories.</li>}
                    </Box>
                  </Box>
                ) : (
                  <VStack align="stretch" spacing={4} px={2}>
                    {results.map((project) => (
                      <Box key={project.source_code_link + project.name} fontSize="13px">
                        <Text
                          as="a"
                          href={projectHref(project)}
                          target="_blank"
                          color="#00c"
                          textDecoration="underline"
                          fontSize="15px"
                        >
                          {highlight(project.name, query)}
                        </Text>
                        <Text color="#000" noOfLines={2}>{highlight(project.description, query)}</Text>
                        <Text color="#008000" fontSize="12px">
                          {project.categories.join(' / ')} - {displayUrl(project)} - {project.technologies.join(', ')}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                )}

                {results.length > 0 && (
                  <Flex direction="column" align="center" mt={6} userSelect="none">
                    <Text fontFamily="'Times New Roman', Georgia, serif" fontSize="28px" fontWeight="bold" lineHeight="1">
                      <span style={{ color: '#1A3CA7' }}>G</span>
                      <span style={{ color: '#D62408' }}>o</span>
                      <span style={{ color: '#F2B50F' }}>o</span>
                      <span style={{ color: '#1A3CA7' }}>g</span>
                      <span style={{ color: '#069E2D' }}>l</span>
                      <span style={{ color: '#D62408' }}>e</span>
                    </Text>
                    <Text fontSize="12px" color="#D62408" fontWeight="bold">1</Text>
                  </Flex>
                )}
              </Box>
            )}
          </Box>
        </RetroWindow>
    </WindowFrame>
  )
}
