import { Level } from '../../types';
import { lesson as lesson1 } from './lesson-01-01';
import { lesson as lesson2 } from './lesson-01-02';
import { lesson as lesson3 } from './lesson-01-03';
import { lesson as lesson4 } from './lesson-01-04';
import { lesson as lesson5 } from './lesson-01-05';

export const level01: Level = {
  id: 'level-01',
  title: 'levelTitles.level_01_main_title',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
};
