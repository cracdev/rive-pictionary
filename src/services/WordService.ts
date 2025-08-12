export type WordDifficulty = 'easy' | 'medium' | 'hard';

export interface Word {
  text: string;
  difficulty: WordDifficulty;
}

class WordService {
  private static instance: WordService;
  
  private words: Word[] = [
    // Easy words
    { text: 'cat', difficulty: 'easy' },
    { text: 'dog', difficulty: 'easy' },
    { text: 'fish', difficulty: 'easy' },
    { text: 'bird', difficulty: 'easy' },
    { text: 'house', difficulty: 'easy' },
    { text: 'car', difficulty: 'easy' },
    { text: 'ball', difficulty: 'easy' },
    { text: 'book', difficulty: 'easy' },
    { text: 'apple', difficulty: 'easy' },
    { text: 'banana', difficulty: 'easy' },
    { text: 'pizza', difficulty: 'easy' },
    { text: 'cake', difficulty: 'easy' },
    { text: 'tree', difficulty: 'easy' },
    { text: 'sun', difficulty: 'easy' },
    { text: 'moon', difficulty: 'easy' },
    { text: 'star', difficulty: 'easy' },
    
    // Medium words
    { text: 'elephant', difficulty: 'medium' },
    { text: 'butterfly', difficulty: 'medium' },
    { text: 'giraffe', difficulty: 'medium' },
    { text: 'guitar', difficulty: 'medium' },
    { text: 'camera', difficulty: 'medium' },
    { text: 'sandwich', difficulty: 'medium' },
    { text: 'spaghetti', difficulty: 'medium' },
    { text: 'watermelon', difficulty: 'medium' },
    { text: 'rainbow', difficulty: 'medium' },
    { text: 'mountain', difficulty: 'medium' },
    { text: 'ocean', difficulty: 'medium' },
    { text: 'swimming', difficulty: 'medium' },
    { text: 'dancing', difficulty: 'medium' },
    { text: 'reading', difficulty: 'medium' },
    { text: 'cooking', difficulty: 'medium' },
    { text: 'teacher', difficulty: 'medium' },
    { text: 'doctor', difficulty: 'medium' },
    
    // Hard words
    { text: 'rhinoceros', difficulty: 'hard' },
    { text: 'microscope', difficulty: 'hard' },
    { text: 'telescope', difficulty: 'hard' },
    { text: 'pineapple', difficulty: 'hard' },
    { text: 'lightning', difficulty: 'hard' },
    { text: 'skateboard', difficulty: 'hard' },
    { text: 'graduation', difficulty: 'hard' },
    { text: 'photography', difficulty: 'hard' },
    { text: 'firefighter', difficulty: 'hard' },
    { text: 'astronaut', difficulty: 'hard' },
  ];

  static getInstance(): WordService {
    if (!WordService.instance) {
      WordService.instance = new WordService();
    }
    return WordService.instance;
  }

  // Get random word by difficulty
  getRandomWordByDifficulty(difficulty: WordDifficulty): Word | null {
    const words = this.words.filter(word => word.difficulty === difficulty);
    if (words.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  // Get random word (any difficulty)
  getRandomWord(): Word {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  // Get all words by difficulty (for testing/debugging)
  getWordsByDifficulty(difficulty: WordDifficulty): Word[] {
    return this.words.filter(word => word.difficulty === difficulty);
  }
}

export default WordService;
