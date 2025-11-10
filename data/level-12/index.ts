import { Level } from '../../types';
import { lesson as lesson1 } from './lesson-12-01';
import { lesson as lesson2 } from './lesson-12-02';
import { lesson as lesson3 } from './lesson-12-03';
import { lesson as lesson4 } from './lesson-12-04';
import { lesson as lesson5 } from './lesson-12-05';

export const level12: Level = {
  id: 'level-12',
  title: { fr: 'levelTitles.level_12_main_title', ar: 'levelTitles.level_12_main_title' },
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
};
