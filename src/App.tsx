import { createTheme, Input, Spacer, useTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { useState } from 'react';
import './App.css';
import Twemoji from './Twemoji';
import keywords from 'emoji-synonyms';
type Synonyms = { [key: string]: string[] };
const synonyms = keywords as Synonyms;

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      background: "282c34"
  }}
});

const item: {emoji: string, keywords: string[], synonyms: string[]}[] = [
  {emoji: '👋', synonyms: ['wave'], keywords: synonyms['wave']},
  {emoji: '😂', synonyms: ['joy'], keywords: synonyms['joy']},
  {emoji: '❤️', synonyms: ['heart'], keywords: synonyms['heart']},
]

function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [runningFailures, setRunningFailures] = useState(0);
  const [answer, setAnswer] = useState('');
  /* const handleChange = (e) => {
   *   setAnswer(value);
   * }; */
  const submitAnswer = (value: string) => {
    if (item[index].synonyms.find(synonym => synonym === answer.toLowerCase())) {
      setIndex(index + 1);
      setScore(score + 1);
      setRunningFailures(0);
    } else {
      setIndex(index + 1);
      setRunningFailures(runningFailures + 1);
      if (runningFailures > 3) {
        // TODO: Navigaet to score screen
      }
    }
    if (index > item.length) {
      setIndex(0);
    }
  };
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <div className="App"
             style={{
               background: "$background",
             }}
        >
          <header className="App-header">
            <Twemoji emoji={item[index].emoji} />
            <Spacer y={4} />
            <Input
              value={answer}
              clearable
              bordered
              size="xl"
              style={{
                background: "$background",
                color: "$primary",
                fontSize: "$xl",
              }}
              onChange={(e) => {
                setAnswer(e.target.value);}
              }
              onBlur={(e) => {
                submitAnswer(e.target.value);}
              }
              labelPlaceholder="emoji name"
              color="default" />
            <Spacer y={4} />
          </header>
        </div>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default App;
