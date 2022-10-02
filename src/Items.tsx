// The top ten emoji used worldwide are 😂 ❤️ 🤣 👍 😭 🙏 😘 🥰 😍 😊
// https://home.unicode.org/emoji/emoji-frequency/
// https://emojitracker.com/
// TODO: implement bloom filter
const items: {emoji: string, synonyms: string[]}[] = [
  {emoji: '👋', synonyms: ['wave']},
  {emoji: '😂', synonyms: ['joy']},
  {emoji: '😭', synonyms: ['sob', 'crying']},
  {emoji: '❤️', synonyms: ['heart']},
  {emoji: '🙏️', synonyms: ['pray']},
  {emoji: '😘️', synonyms: ['kiss']},
  {emoji: '🥰️', synonyms: ['hearts']},
  {emoji: '😍️', synonyms: ['hearteyes']},
  {emoji: '🤔️', synonyms: ['thinking']},
  {emoji: '😊️', synonyms: ['smile']},
  {emoji: '😩️', synonyms: ['weary']},
  {emoji: '♻️', synonyms: ['recycle']},
  {emoji: '👍️', synonyms: ['thumbsup', 'thumb']},
  {emoji: '👀', synonyms: ['eyes']},
  {emoji: '👌', synonyms: ['ok_hand', 'ok']},
  {emoji: '🚀', synonyms: ['rocket']},
  {emoji: '⚡️', synonyms: ['zap']},
  {emoji: '🤗', synonyms: ['hug', 'hugging']},
  {emoji: '🤫', synonyms: ['hush', 'shushing']},
  {emoji: '💩', synonyms: ['poop']},
  {emoji: '🌮', synonyms: ['taco']},
  {emoji: '💡', synonyms: ['idea', 'light bulb']},
  /* {emoji: '💦', synonyms: ['sweat']},
   * {emoji: '👅', synonyms: ['tongue']},
   * {emoji: '🍆', synonyms: ['eggplant']},
   * {emoji: '🍑', synonyms: ['peach']}, */
  {emoji: '😈', synonyms: ['imp', 'devil', 'demon']},
  {emoji: '👹', synonyms: ['oni', 'demon', 'orge']},
  {emoji: '🗼', synonyms: ['tower', 'tokyo']},
  {emoji: '✨', synonyms: ['sparkles']},
  {emoji: '🔥', synonyms: ['fire', 'flame']},
]


export default items;
