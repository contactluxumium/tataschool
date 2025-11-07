import { Level } from '../../types';
import { lesson as lesson1 } from './lesson-02-01';
import { lesson as lesson2 } from './lesson-02-02';
import { lesson as lesson3 } from './lesson-02-03';
import { lesson as lesson4 } from './lesson-02-04';
import { lesson as lesson5 } from './lesson-02-05';

export const level02: Level = {
  id: 'level-02',
  title: 'levelTitles.level_02_main_title',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
};
