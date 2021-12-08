interface QuranParts {
  text: string;
  translation: string;
}

export interface Quran {
  id: string;
  title: string;
  part: number;
  revelation_place: string;
  counts: {
    part: number;
    words: number;
    letter: number;
  };
  parts: QuranParts[];
}
