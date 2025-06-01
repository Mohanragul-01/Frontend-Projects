// List of words for the game
const words = [
  // Easy words (3-5 letters)
  "cat", "dog", "sun", "moon", "star", "cake", "fish", "bird", "frog", "tree",
  "book", "lamp", "desk", "game", "play", "jump", "swim", "ride", "sing", "draw",
  
  // Medium words (6-8 letters)
  "laptop", "dragon", "castle", "flower", "planet", "pirate", "garden", "soccer", 
  "puzzle", "rocket", "monkey", "forest", "school", "orange", "banana", "doctor",
  "hammer", "window", "guitar", "jacket",
  
  // Hard words (9+ letters)
  "telescope", "butterfly", "alligator", "california", "chocolate", "dinosaur",
  "education", "strawberry", "president", "adventure", "restaurant", "technology",
  "volleyball", "friendship", "university", "helicopter", "generation", "pollution",
  "celebration", "electricity"
];

// Categories for future expansion
const wordCategories = {
  animals: ["cat", "dog", "frog", "bird", "monkey", "alligator", "butterfly"],
  food: ["cake", "orange", "banana", "chocolate", "strawberry"],
  nature: ["sun", "moon", "star", "tree", "flower", "planet", "forest"],
  places: ["castle", "school", "california", "restaurant", "university"],
  objects: ["book", "lamp", "desk", "laptop", "hammer", "window", "guitar", "jacket", "telescope"]
};

/**
 * Get a random word from the word list
 */
export const getRandomWord = (category = null, difficulty = null) => {
  let wordPool = [...words];
  
  // Filter by category if provided
  if (category && wordCategories[category]) {
    wordPool = wordCategories[category];
  }
  
  // Filter by difficulty if provided
  if (difficulty) {
    switch (difficulty) {
      case 'easy':
        wordPool = wordPool.filter(word => word.length <= 5);
        break;
      case 'medium':
        wordPool = wordPool.filter(word => word.length > 5 && word.length <= 8);
        break;
      case 'hard':
        wordPool = wordPool.filter(word => word.length > 8);
        break;
      default:
        break;
    }
  }
  
  // Get random word from filtered pool
  const randomIndex = Math.floor(Math.random() * wordPool.length);
  return wordPool[randomIndex];
};

/**
 * Check if a word is completely guessed
 */
export const isWordComplete = (word, guessedLetters) => {
  const uniqueLetters = [...new Set(word.toLowerCase().split(''))];
  return uniqueLetters.every(letter => guessedLetters.includes(letter));
};

/**
 * Calculate the percentage of the word that has been guessed
 */
export const getWordProgress = (word, guessedLetters) => {
  const uniqueLetters = [...new Set(word.toLowerCase().split(''))];
  const correctGuesses = uniqueLetters.filter(letter => guessedLetters.includes(letter));
  
  return Math.floor((correctGuesses.length / uniqueLetters.length) * 100);
};

/**
 * Get a hint for the current word (returns a letter that hasn't been guessed yet)
 */
export const getHint = (word, guessedLetters) => {
  const letters = word.toLowerCase().split('');
  const unguessedLetters = letters.filter(letter => !guessedLetters.includes(letter));
  
  if (unguessedLetters.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * unguessedLetters.length);
  return unguessedLetters[randomIndex];
};