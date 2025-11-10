import { Level } from '../../types';
import { lesson as lesson1 } from './lesson-03-01';
import { lesson as lesson2 } from './lesson-03-02';
import { lesson as lesson3 } from './lesson-03-03';
import { lesson as lesson4 } from './lesson-03-04';
import { lesson as lesson5 } from './lesson-03-05';

export const level03: Level = {
  id: 'level-03',
  title: { fr: 'levelTitles.level_03_main_title', ar: 'levelTitles.level_03_main_title' },
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
};
