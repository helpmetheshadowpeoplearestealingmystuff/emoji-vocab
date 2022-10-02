import { createTheme, Spacer, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState } from 'react';
import './App.css';
import Test from './Test';
import items from './Items';
/* import keywords from 'emoji-synonyms';
 * type Synonyms = { [key: string]: string[] };
 * const synonyms = keywords as Synonyms; */

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      background: "282c34",
  }}
});

function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [ended, setEnded] = useState(false);
  if (ended) {
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
      score: {score}
        <Spacer y={1} />
          save: {btoa(answers.join(" "))}
        </div>
      </div>
        </NextUIProvider>
      </NextThemesProvider>
)} else {
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
          <Test
            index={index}
            setIndex={setIndex}
            score={score}
            setScore={setScore}
            setAnswers={setAnswers}
            isEnded={setEnded}
          />
        </div>
      </NextUIProvider>
    </NextThemesProvider>
  )
}
}

      export default App;
