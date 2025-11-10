import { Level } from '../../types';
import { lesson as lesson1 } from './lesson-11-01';
import { lesson as lesson2 } from './lesson-11-02';
import { lesson as lesson3 } from './lesson-11-03';
import { lesson as lesson4 } from './lesson-11-04';
import { lesson as lesson5 } from './lesson-11-05';

export const level11: Level = {
  id: 'level-11',
  title: { fr: 'levelTitles.level_11_main_title', ar: 'levelTitles.level_11_main_title' },
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
};
