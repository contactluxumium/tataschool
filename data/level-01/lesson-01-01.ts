import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-01-01',
  title: {
    fr: "L'Addition",
    ar: 'الجمع',
  },
  questions: [
    // 8 Easy Questions
    {
      id: 'q-01-01-e1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien font 1 pomme plus 1 pomme ?',
        ar: 'كم يساوي تفاحة واحدة زائد تفاحة واحدة؟',
      },
      mathExpression: '1 + 1',
      options: [
        { fr: '1', ar: '١' },
        { fr: '2', ar: '٢' },
        { fr: '3', ar: '٣' },
      ],
      correctAnswer: { fr: '2', ar: '٢' },
      explanation: {
        fr: 'Quand on ajoute 1 et 1, on obtient 2.',
        ar: 'عندما نضيف ١ إلى ١، نحصل على ٢.',
      },
    },
    {
      id: 'q-01-01-e2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le résultat de 2 + 3 ?',
        ar: 'ما هو حاصل جمع ٢ + ٣؟',
      },
      mathExpression: '2 + 3',
      options: [
        { fr: '4', ar: '٤' },
        { fr: '5', ar: '٥' },
        { fr: '6', ar: '٦' },
      ],
      correctAnswer: { fr: '5', ar: '٥' },
      explanation: {
        fr: '2 plus 3 égale 5.',
        ar: '٢ زائد ٣ يساوي ٥.',
      },
    },
    {
      id: 'q-01-01-e3',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Ali a 3 billes. Son ami lui en donne 2. Combien de billes a Ali maintenant ?',
        ar: 'لدى علي ٣ كرات زجاجية. أعطاه صديقه كرتين. كم كرة زجاجية لدى علي الآن؟',
      },
      options: [
        { fr: '4', ar: '٤' },
        { fr: '5', ar: '٥' },
        { fr: '6', ar: '٦' },
      ],
      correctAnswer: { fr: '5', ar: '٥' },
      explanation: {
        fr: 'On calcule 3 + 2, ce qui donne 5 billes.',
        ar: 'نحسب ٣ + ٢، وهو ما يعطي ٥ كرات زجاجية.',
      },
    },
    {
      id: 'q-01-01-e4',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Calcule 4 + 1.',
        ar: 'احسب ٤ + ١.',
      },
      mathExpression: '4 + 1',
      options: [
        { fr: '5', ar: '٥' },
        { fr: '4', ar: '٤' },
        { fr: '3', ar: '٣' },
      ],
      correctAnswer: { fr: '5', ar: '٥' },
    },
    {
      id: 'q-01-01-e5',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Il y a 2 oiseaux sur un arbre. 2 autres oiseaux arrivent. Combien y a-t-il d’oiseaux en tout ?',
        ar: 'يوجد عصفوران على شجرة. وصل عصفوران آخران. كم عدد العصافير في المجموع؟',
      },
      options: [
        { fr: '3', ar: '٣' },
        { fr: '4', ar: '٤' },
        { fr: '5', ar: '٥' },
      ],
      correctAnswer: { fr: '4', ar: '٤' },
      explanation: {
        fr: "C'est une addition simple : 2 + 2 = 4.",
        ar: 'إنها عملية جمع بسيطة: ٢ + ٢ = ٤.',
      },
    },
    {
      id: 'q-01-01-e6',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le total de 5 + 0 ?',
        ar: 'ما هو مجموع ٥ + ٠؟',
      },
      mathExpression: '5 + 0',
      options: [
        { fr: '0', ar: '٠' },
        { fr: '5', ar: '٥' },
        { fr: '50', ar: '٥٠' },
      ],
      correctAnswer: { fr: '5', ar: '٥' },
      explanation: {
        fr: 'Ajouter zéro à un nombre ne change pas ce nombre.',
        ar: 'إضافة صفر إلى أي عدد لا يغير ذلك العدد.',
      },
    },
    {
      id: 'q-01-01-e7',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Combien font 3 + 3 ?',
        ar: 'كم يساوي ٣ + ٣؟',
      },
      mathExpression: '3 + 3',
      options: [
        { fr: '5', ar: '٥' },
        { fr: '6', ar: '٦' },
        { fr: '7', ar: '٧' },
      ],
      correctAnswer: { fr: '6', ar: '٦' },
    },
    {
      id: 'q-01-01-e8',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Dans un panier, il y a 4 bananes et 3 oranges. Combien de fruits y a-t-il en tout ?',
        ar: 'في سلة، يوجد ٤ موزات و ٣ برتقالات. كم عدد الفواكه في المجموع؟',
      },
      options: [
        { fr: '6', ar: '٦' },
        { fr: '7', ar: '٧' },
        { fr: '8', ar: '٨' },
      ],
      correctAnswer: { fr: '7', ar: '٧' },
      explanation: {
        fr: 'Le total des fruits est 4 + 3 = 7.',
        ar: 'مجموع الفواكه هو ٤ + ٣ = ٧.',
      },
    },
    // 6 Medium Questions
    {
      id: 'q-01-01-m1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Trouve la somme de 6 + 5.',
        ar: 'أوجد حاصل جمع ٦ + ٥.',
      },
      mathExpression: '6 + 5',
      options: [
        { fr: '10', ar: '١٠' },
        { fr: '11', ar: '١١' },
        { fr: '12', ar: '١٢' },
      ],
      correctAnswer: { fr: '11', ar: '١١' },
    },
    {
      id: 'q-01-01-m2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Fatima a 7 livres. Elle en achète 4 autres. Combien de livres a-t-elle au total ?',
        ar: 'لدى فاطمة ٧ كتب. اشترت ٤ كتب أخرى. كم عدد الكتب التي لديها في المجموع؟',
      },
      options: [
        { fr: '10', ar: '١٠' },
        { fr: '11', ar: '١١' },
        { fr: '12', ar: '١٢' },
      ],
      correctAnswer: { fr: '11', ar: '١١' },
      explanation: {
        fr: 'Pour trouver le total, on ajoute le nombre de livres qu\'elle avait au nombre de livres qu\'elle a achetés : 7 + 4 = 11.',
        ar: 'لإيجاد المجموع، نضيف عدد الكتب التي كانت لديها إلى عدد الكتب التي اشترتها: ٧ + ٤ = ١١.',
      },
    },
    {
      id: 'q-01-01-m3',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Quel est le résultat de 8 + 8 ?',
        ar: 'ما هو ناتج ٨ + ٨؟',
      },
      mathExpression: '8 + 8',
      options: [
        { fr: '15', ar: '١٥' },
        { fr: '16', ar: '١٦' },
        { fr: '17', ar: '١٧' },
      ],
      correctAnswer: { fr: '16', ar: '١٦' },
    },
    {
      id: 'q-01-01-m4',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Dans une classe, il y a 9 garçons et 7 filles. Combien y a-t-il d’élèves en tout ?',
        ar: 'في قسم، يوجد ٩ أولاد و ٧ بنات. كم عدد التلاميذ في المجموع؟',
      },
      options: [
        { fr: '15', ar: '١٥' },
        { fr: '16', ar: '١٦' },
        { fr: '17', ar: '١٧' },
      ],
      correctAnswer: { fr: '16', ar: '١٦' },
      explanation: {
        fr: 'Le nombre total d\'élèves est la somme des garçons et des filles : 9 + 7 = 16.',
        ar: 'العدد الإجمالي للتلاميذ هو مجموع الأولاد والبنات: ٩ + ٧ = ١٦.',
      },
    },
    {
      id: 'q-01-01-m5',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Calcule 2 + 4 + 3.',
        ar: 'احسب ٢ + ٤ + ٣.',
      },
      mathExpression: '2 + 4 + 3',
      options: [
        { fr: '8', ar: '٨' },
        { fr: '9', ar: '٩' },
        { fr: '10', ar: '١٠' },
      ],
      correctAnswer: { fr: '9', ar: '٩' },
      explanation: {
        fr: 'On peut ajouter les nombres dans l\'ordre : 2 + 4 = 6, puis 6 + 3 = 9.',
        ar: 'يمكننا جمع الأعداد بالترتيب: ٢ + ٤ = ٦، ثم ٦ + ٣ = ٩.',
      },
    },
    {
      id: 'q-01-01-m6',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Quel nombre faut-il ajouter à 7 pour obtenir 13 ?',
        ar: 'ما هو العدد الذي يجب إضافته إلى ٧ للحصول على ١٣؟',
      },
      mathExpression: '7 + ? = 13',
      options: [
        { fr: '5', ar: '٥' },
        { fr: '6', ar: '٦' },
        { fr: '7', ar: '٧' },
      ],
      correctAnswer: { fr: '6', ar: '٦' },
      explanation: {
        fr: 'Pour trouver le nombre manquant, on peut compter à partir de 7 jusqu\'à 13, ou faire la soustraction 13 - 7.',
        ar: 'لإيجاد العدد المفقود، يمكننا العد من ٧ إلى ١٣، أو القيام بعملية الطرح ١٣ - ٧.',
      },
    },
    // 4 Hard Questions
    {
      id: 'q-01-01-h1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: {
        fr: 'Quel est le total de 12 + 9 ?',
        ar: 'ما هو مجموع ١٢ + ٩؟',
      },
      mathExpression: '12 + 9',
      options: [
        { fr: '20', ar: '٢٠' },
        { fr: '21', ar: '٢١' },
        { fr: '22', ar: '٢٢' },
      ],
      correctAnswer: { fr: '21', ar: '٢١' },
      explanation: {
        fr: 'On peut calculer 12 + 8 = 20, puis ajouter le 1 restant, ce qui donne 21.',
        ar: 'يمكننا حساب ١٢ + ٨ = ٢٠، ثم إضافة ١ المتبقي، وهو ما يعطي ٢١.',
      },
    },
    {
      id: 'q-01-01-h2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: {
        fr: 'Un bus transporte 15 passagers. À l’arrêt suivant, 8 autres passagers montent. Combien y a-t-il de passagers dans le bus maintenant ?',
        ar: 'حافلة تنقل ١٥ راكباً. في المحطة التالية، صعد ٨ ركاب آخرين. كم عدد الركاب في الحافلة الآن؟',
      },
      options: [
        { fr: '22', ar: '٢٢' },
        { fr: '23', ar: '٢٣' },
        { fr: '24', ar: '٢٤' },
      ],
      correctAnswer: { fr: '23', ar: '٢٣' },
      explanation: {
        fr: 'On fait l\'addition 15 + 8. C\'est plus facile si on fait 15 + 5 = 20, puis on ajoute les 3 restants. Le total est 23.',
        ar: 'نقوم بعملية الجمع ١٥ + ٨. من الأسهل حساب ١٥ + ٥ = ٢٠، ثم نضيف ٣ المتبقية. المجموع هو ٢٣.',
      },
    },
    {
      id: 'q-01-01-h3',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: {
        fr: 'Calcule la somme : 17 + 6.',
        ar: 'احسب المجموع: ١٧ + ٦.',
      },
      mathExpression: '17 + 6',
      options: [
        { fr: '22', ar: '٢٢' },
        { fr: '23', ar: '٢٣' },
        { fr: '24', ar: '٢٤' },
      ],
      correctAnswer: { fr: '23', ar: '٢٣' },
    },
    {
      id: 'q-01-01-h4',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: {
        fr: 'Youssef a collectionné 14 timbres. Sa sœur en a 5 de plus que lui. Combien de timbres a sa sœur ?',
        ar: 'جمع يوسف ١٤ طابعاً بريدياً. أخته لديها ٥ طوابع أكثر منه. كم عدد الطوابع التي تملكها أخته؟',
      },
      options: [
        { fr: '18', ar: '١٨' },
        { fr: '19', ar: '١٩' },
        { fr: '20', ar: '٢٠' },
      ],
      correctAnswer: { fr: '19', ar: '١٩' },
      explanation: {
        fr: 'Pour trouver le nombre de timbres de sa sœur, on ajoute 5 au nombre de timbres de Youssef : 14 + 5 = 19.',
        ar: 'لإيجاد عدد طوابع أخته، نضيف ٥ إلى عدد طوابع يوسف: ١٤ + ٥ = ١٩.',
      },
    },
    // 2 Deep Questions
    {
      id: 'q-01-01-d1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Deep,
      text: {
        fr: 'Dans un verger, il y a 8 pommiers et 7 poiriers. Le fermier décide de planter 5 nouveaux pommiers. Combien d’arbres y a-t-il maintenant dans le verger ?',
        ar: 'في بستان، يوجد ٨ شجرات تفاح و ٧ شجرات إجاص. قرر المزارع أن يزرع ٥ شجرات تفاح جديدة. كم عدد الأشجار الموجودة الآن في البستان؟',
      },
      options: [
        { fr: '15', ar: '١٥' },
        { fr: '20', ar: '٢٠' },
        { fr: '13', ar: '١٣' },
      ],
      correctAnswer: { fr: '20', ar: '٢٠' },
      explanation: {
        fr: 'Il faut d\'abord trouver le nombre total d\'arbres au début (8 + 7 = 15). Ensuite, on ajoute les nouveaux arbres (15 + 5 = 20).',
        ar: 'يجب أولاً إيجاد العدد الإجمالي للأشجار في البداية (٨ + ٧ = ١٥). بعد ذلك، نضيف الأشجار الجديدة (١٥ + ٥ = ٢٠).',
      },
    },
    {
      id: 'q-01-01-d2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Deep,
      text: {
        fr: 'Amine a 6 Dirhams. Sa mère lui donne 5 Dirhams et son père lui donne 10 Dirhams. Il veut acheter un jouet qui coûte 25 Dirhams. Combien d’argent lui manque-t-il ?',
        ar: 'أمين لديه ٦ دراهم. أعطته أمه ٥ دراهم وأعطاه أبوه ١٠ دراهم. يريد شراء لعبة ثمنها ٢٥ درهماً. كم من المال ينقصه؟',
      },
      options: [
        { fr: '4 Dirhams', ar: '٤ دراهم' },
        { fr: '5 Dirhams', ar: '٥ دراهم' },
        { fr: '21 Dirhams', ar: '٢١ درهماً' },
      ],
      correctAnswer: { fr: '4 Dirhams', ar: '٤ دراهم' },
      explanation: {
        fr: 'D\'abord, on calcule combien d\'argent Amine a en tout : 6 + 5 + 10 = 21 Dirhams. Pour savoir combien il lui manque, on compare avec le prix du jouet. Il lui manque 4 Dirhams pour arriver à 25.',
        ar: 'أولاً، نحسب كم من المال يملك أمين في المجموع: ٦ + ٥ + ١٠ = ٢١ درهماً. لمعرفة كم ينقصه، نقارن مع ثمن اللعبة. ينقصه ٤ دراهم للوصول إلى ٢٥.',
      },
    },
  ],
};
