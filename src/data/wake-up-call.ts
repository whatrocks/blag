/**
 * Wake-Up Call, as the clay band plays it: the song's real layout, one
 * chord per bar, and the vocal melody transcribed from the V3 demo
 * (10-14-26). Melodies are flat lists of [start, length, MIDI note]
 * triples in sixteenth notes from the start of the section; a negative
 * start is a pickup into it.
 */

export type Feel = 'sparse' | 'full' | 'half';

export interface Section {
  name: string;
  /** One chord per bar. */
  chords: string;
  /** sparse: single strums, no backbeat. full: the band. half: half-time. */
  feel: Feel;
  /** What the mics sing, and how far to shift it in semitones. */
  vocal?: { melody: number[]; shift?: number; from?: number; to?: number };
  /** A lead line for the harmonica when nobody is singing. */
  solo?: { melody: number[]; shift?: number; from?: number; to?: number };
}

export const bpm = 160;

export const verse = [
  3, 1, 62, 4, 1, 62, 5, 2, 64, 7, 1, 65, 8, 2, 64, 11, 1, 64, 12, 1, 64, 13, 3, 64,
  16, 1, 64, 17, 2, 64, 19, 4, 62, 23, 1, 60, 24, 3, 60, 27, 1, 59, 28, 2, 57, 31, 3, 62,
  34, 1, 60, 67, 1, 59, 68, 1, 62, 69, 3, 64, 72, 2, 64, 74, 2, 64, 76, 2, 64, 78, 2, 62,
  80, 3, 64, 83, 1, 64, 84, 3, 62, 87, 1, 60, 88, 3, 60, 91, 1, 59, 92, 1, 57, 95, 1, 62,
  96, 4, 62, 107, 3, 64, 110, 1, 62, 111, 3, 62, 114, 1, 59, 131, 1, 62, 132, 3, 64, 135, 3, 64,
  138, 5, 64, 143, 4, 64, 147, 3, 62, 150, 1, 62, 151, 1, 60, 152, 1, 62, 153, 2, 60, 155, 1, 59,
  156, 1, 60, 164, 1, 65, 165, 3, 67, 168, 3, 67, 171, 1, 67, 172, 1, 69, 173, 1, 62, 174, 1, 55,
  175, 3, 55, 178, 3, 53, 181, 1, 52, 182, 5, 52, 195, 1, 64, 196, 2, 64, 199, 1, 64, 200, 2, 64,
  202, 2, 64, 204, 2, 64, 207, 6, 64, 213, 2, 62, 215, 4, 60, 219, 4, 57, 223, 1, 60, 224, 3, 62,
  227, 1, 59,
];

export const chorus = [
  3, 1, 64, 4, 1, 64, 5, 1, 64, 7, 1, 64, 8, 2, 64, 10, 1, 64, 11, 3, 64, 14, 2, 64,
  16, 1, 64, 17, 2, 62, 19, 3, 62, 22, 3, 62, 25, 2, 60, 30, 2, 59, 32, 4, 67, 36, 2, 67,
  38, 1, 67, 39, 2, 67, 41, 1, 65, 42, 2, 64, 44, 1, 60, 45, 2, 60, 47, 3, 59, 50, 1, 57,
  67, 1, 64, 68, 2, 64, 70, 2, 64, 72, 2, 64, 74, 1, 62, 75, 1, 64, 76, 2, 64, 78, 4, 64,
  82, 1, 64, 83, 1, 64, 84, 2, 62, 86, 4, 62, 90, 1, 60, 91, 1, 59, 100, 2, 62, 104, 1, 62,
  105, 1, 62, 107, 1, 62, 108, 3, 62, 111, 1, 64, 112, 3, 62, 115, 1, 60, 116, 4, 60, 120, 1, 60,
  121, 1, 59, 122, 2, 57, 131, 1, 64, 132, 2, 64, 134, 1, 62, 135, 1, 64, 136, 2, 64, 138, 2, 64,
  140, 2, 64, 142, 1, 62, 143, 2, 64, 145, 3, 62, 151, 1, 62, 152, 3, 62, 155, 1, 62, 157, 1, 60,
  158, 2, 60, 160, 6, 60, 166, 1, 59,
];

export const bridge = [
  -4, 2, 60, -1, 1, 67, 0, 2, 67, 2, 3, 67, 27, 4, 60, 31, 1, 64, 32, 3, 62, 35, 2, 62,
  37, 4, 64, 53, 1, 60, 54, 2, 60, 58, 4, 60, 62, 1, 60, 63, 1, 60, 64, 2, 59, 67, 1, 60,
  68, 1, 59, 69, 3, 60, 72, 5, 60, 77, 3, 60, 80, 1, 59, 91, 1, 64, 92, 2, 64, 94, 1, 64,
  95, 1, 65, 96, 1, 65, 101, 1, 64, 102, 5, 62, 107, 1, 60, 109, 2, 60, 123, 2, 59, 125, 1, 60,
  126, 1, 60, 127, 1, 62, 128, 4, 62, 132, 5, 62, 137, 1, 62, 138, 4, 60, 142, 1, 60, 143, 4, 60,
  147, 1, 59, 148, 2, 60, 153, 1, 62, 154, 6, 62, 160, 1, 60, 161, 1, 60, 162, 1, 60, 163, 1, 62,
  164, 4, 62, 168, 1, 62, 169, 4, 64, 174, 2, 62, 177, 1, 62, 178, 2, 62, 181, 2, 59, 183, 3, 59,
  189, 1, 60, 190, 2, 60, 192, 2, 60, 194, 1, 59, 195, 1, 60, 196, 2, 60, 198, 1, 59, 199, 1, 57,
  200, 4, 60, 204, 4, 60, 209, 1, 62, 210, 2, 60, 212, 1, 60, 213, 2, 60, 215, 3, 60, 219, 1, 64,
  220, 3, 64, 223, 2, 64, 225, 3, 64, 228, 5, 64, 233, 8, 62, 241, 9, 62,
];

const CHORUS = 'Am G C F  Am G Emaj7 F  Am G C C';

export const sections: Section[] = [
  { name: 'Intro', chords: 'C F G G  C F G G', feel: 'sparse' },
  { name: 'Verse 1', chords: 'C F G G  C F G G  C F G G  C F G G', feel: 'sparse', vocal: { melody: verse, shift: -12 } },
  { name: 'Verse 2', chords: 'C F G G  C F G G  C F G G  C F G G', feel: 'full', vocal: { melody: verse } },
  { name: 'Chorus', chords: CHORUS, feel: 'full', vocal: { melody: chorus } },
  { name: 'Turnaround', chords: 'G G', feel: 'full' },
  { name: 'Interlude', chords: 'C F G G', feel: 'full', solo: { melody: verse, from: 0, to: 64 } },
  { name: 'Verse 3', chords: 'C F G G  C F G G  C F G G  C F G G', feel: 'full', vocal: { melody: verse } },
  { name: 'Chorus', chords: CHORUS, feel: 'full', vocal: { melody: chorus } },
  { name: 'Bridge', chords: 'C C Emaj7 Emaj7  Am Am G G  C C Emaj7 Emaj7  Am Am G G', feel: 'half', vocal: { melody: bridge } },
  { name: 'Last Chorus', chords: CHORUS, feel: 'full', vocal: { melody: chorus } },
  { name: 'Last Chorus', chords: 'Am G C C', feel: 'full', vocal: { melody: chorus, from: 128, to: 192 } },
  { name: 'Outro', chords: 'C C', feel: 'sparse' },
];
