import { Level } from '../../types';
import { lesson as lesson1 } from './lesson-04-01';
import { lesson as lesson2 } from './lesson-04-02';
import { lesson as lesson3 } from './lesson-04-03';
import { lesson as lesson4 } from './lesson-04-04';
import { lesson as lesson5 } from './lesson-04-05';

export const level04: Level = {
  id: 'level-04',
  title: { fr: 'levelTitles.level_04_main_title', ar: 'levelTitles.level_04_main_title' },
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
};
