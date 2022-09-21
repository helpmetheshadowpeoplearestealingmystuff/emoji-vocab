import { createTheme, Input, Spacer, useTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState, createContext } from 'react';
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

// implement bloom filter
const items: {emoji: string, keywords: string[], synonyms: string[]}[] = [
  {emoji: '👋', synonyms: ['wave'], keywords: synonyms['wave']},
  {emoji: '😂', synonyms: ['joy'], keywords: synonyms['joy']},
  {emoji: '❤️', synonyms: ['heart'], keywords: synonyms['heart']},
]

function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [runningFailures, setRunningFailures] = useState(0);
  const [answer, setAnswer] = useState('');
  /* const handleChange = (e) => {
   *   setAnswer(value);
   * }; */
  const submitAnswer = () => {
    setAnswers(answers => [...answers, answer]);
    setAnswer("");
    if (items[index].synonyms.find(synonym => synonym === answer.toLowerCase())) {
      setIndex(index + 1);
      setScore(score + 1);
      setRunningFailures(0);
    } else {
      setIndex(index + 1);
      setRunningFailures(runningFailures + 1);
      if (runningFailures >= 3) {
        /* console.log(btoa(answers.join())); */
        // TODO: Navigate to score screen
      }
    }
    if (index >= items.length - 1) {
      /* console.log(answers);
       * console.log(btoa(answers.join(":")));
       * console.log(atob(btoa(answers.join(":")))); */
      // TODO: Navigate to score screen
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
          <div className="App-content">
            <Twemoji emoji={items[index].emoji} />
            <Spacer y={4} />
            <Input
              value={answer}
              clearable
              bordered
              pattern="\w+"
              size="xl"
              style={{
                background: "$background",
                color: "$primary",
                fontSize: "$xl",
              }}
              onChange={(e) => {
                if (!e.target.value.match(/\W/)) {
                  setAnswer(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.code === "Enter" || e.code === "NumpadEnter") {
                  submitAnswer();
                }
                if (!e.key.match(/[a-zA-Z]/)) {
                  e.preventDefault();
                }
              }}
              labelPlaceholder="emoji name"
              color="default" />
            <Spacer y={4} />
          </div>
        </div>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default App;
