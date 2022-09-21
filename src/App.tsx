import { createTheme, Input, Spacer, useTheme } from '@nextui-org/react';
import React, { useState } from 'react';
import './App.css';
import Twemoji from './Twemoji';
import keywords from 'emoji-synonyms';
type Synonyms = { [key: string]: string[] };
const synonyms = keywords as Synonyms;

const darkTheme = createTheme({
  type: 'dark',
  // theme: {
  //   colors: {...},
  // }
})

const item: {emoji: string, keywords: string[], synonyms: string[]}[] = [
  {emoji: '👋', synonyms: ['wave'], keywords: synonyms['wave']},
  {emoji: '😂', synonyms: ['joy'], keywords: synonyms['joy']},
  {emoji: '❤️', synonyms: ['heart'], keywords: synonyms['heart']},
]


function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [runningFailures, setRunningFailures] = useState(0);
  const { theme } = useTheme();
  if (!theme) return null;
  return (
    <div className="App">
      <header className="App-header">
        <Twemoji emoji={item[index].emoji} />
        <Spacer y={4} />
        <Input
          bordered
          size="xl"
          style={{
            color: theme.colors.primary.value,
            fontSize: theme.fontSizes.xl.value,
            padding: `${theme.space[2].value} ${theme.space[4].value}`
          }}
          onBlur={function(e) {
            if (item[index].synonyms.find(i => i ===e.target.value)) {
              setIndex(index + 1);
              setScore(score + 1);
              setRunningFailures(0);
              if (index > item.length) {
                // end
                setIndex(0);
              }
            } else {

            }
          }}
          labelPlaceholder="emoji name"
          color="default" />
        <Spacer y={4} />
      </header>
    </div>
  );
}

export default App;
