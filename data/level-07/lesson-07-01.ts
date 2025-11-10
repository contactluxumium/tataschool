import { Lesson, QuestionType, Difficulty } from '../../types';

export const lesson: Lesson = {
  id: 'lesson-07-01',
  title: {
    fr: 'Opérations sur les Nombres Décimaux',
    ar: 'العمليات على الأعداد العشرية',
  },
  questions: [
    // 8 Easy Questions
    {
      id: 'q-07-01-e1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le résultat de 3,5 + 2,1 ?',
        ar: 'ما هو ناتج 3,5 + 2,1 ؟',
      },
      mathExpression: '3.5 + 2.1',
      options: [
        { fr: '5,5', ar: '٥,٥' },
        { fr: '5,6', ar: '٥,٦' },
        { fr: '4,6', ar: '٤,٦' },
      ],
      correctAnswer: { fr: '5,6', ar: '٥,٦' },
      explanation: {
        fr: 'On additionne les parties entières (3+2=5) et les parties décimales (5+1=6).',
        ar: 'نجمع الأجزاء الصحيحة (٣+٢=٥) والأجزاء العشرية (٥+١=٦).',
      },
    },
    {
      id: 'q-07-01-e2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Calcule 8,7 - 4,3.',
        ar: 'احسب 8,7 - 4,3.',
      },
      mathExpression: '8.7 - 4.3',
      options: [
        { fr: '4,4', ar: '٤,٤' },
        { fr: '4,5', ar: '٤,٥' },
        { fr: '3,4', ar: '٣,٤' },
      ],
      correctAnswer: { fr: '4,4', ar: '٤,٤' },
    },
    {
      id: 'q-07-01-e3',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le produit de 4,25 × 10 ?',
        ar: 'ما هو ناتج ضرب 4,25 × 10 ؟',
      },
      mathExpression: '4.25 × 10',
      options: [
        { fr: '42,5', ar: '٤٢,٥' },
        { fr: '0,425', ar: '٠,٤٢٥' },
        { fr: '425', ar: '٤٢٥' },
      ],
      correctAnswer: { fr: '42,5', ar: '٤٢,٥' },
      explanation: {
        fr: 'Pour multiplier par 10, on déplace la virgule d\'un rang vers la droite.',
        ar: 'للضرب في ١٠، نحرك الفاصلة مرتبة واحدة إلى اليمين.',
      },
    },
    {
      id: 'q-07-01-e4',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le quotient de 36,9 ÷ 100 ?',
        ar: 'ما هو خارج قسمة 36,9 ÷ 100 ؟',
      },
      mathExpression: '36.9 ÷ 100',
      options: [
        { fr: '3,69', ar: '٣,٦٩' },
        { fr: '3690', ar: '٣٦٩٠' },
        { fr: '0,369', ar: '٠,٣٦٩' },
      ],
      correctAnswer: { fr: '0,369', ar: '٠,٣٦٩' },
      explanation: {
        fr: 'Pour diviser par 100, on déplace la virgule de deux rangs vers la gauche.',
        ar: 'للقسمة على ١٠٠، نحرك الفاصلة مرتبتين إلى اليسار.',
      },
    },
    {
      id: 'q-07-01-e5',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Compare les nombres : 7,45 et 7,5.',
        ar: 'قارن العددين : 7,45 و 7,5.',
      },
      options: [
        { fr: '7,45 > 7,5', ar: '٧,٤٥ > ٧,٥' },
        { fr: '7,45 < 7,5', ar: '٧,٤٥ < ٧,٥' },
        { fr: '7,45 = 7,5', ar: '٧,٤٥ = ٧,٥' },
      ],
      correctAnswer: { fr: '7,45 < 7,5', ar: '٧,٤٥ < ٧,٥' },
      explanation: {
        fr: 'On compare les chiffres après la virgule. 5 est plus grand que 4, donc 7,5 (ou 7,50) est plus grand que 7,45.',
        ar: 'نقارن الأرقام بعد الفاصلة. ٥ أكبر من ٤، إذن ٧,٥ (أو ٧,٥٠) أكبر من ٧,٤٥.',
      },
    },
    {
      id: 'q-07-01-e6',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Calcule 15,2 + 0,5.',
        ar: 'احسب 15,2 + 0,5.',
      },
      mathExpression: '15.2 + 0.5',
      options: [
        { fr: '15,7', ar: '١٥,٧' },
        { fr: '15,25', ar: '١٥,٢٥' },
        { fr: '16,0', ar: '١٦,٠' },
      ],
      correctAnswer: { fr: '15,7', ar: '١٥,٧' },
    },
    {
      id: 'q-07-01-e7',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Effectue la soustraction : 10 - 2,5.',
        ar: 'أنجز عملية الطرح : 10 - 2,5.',
      },
      mathExpression: '10 - 2.5',
      options: [
        { fr: '8,5', ar: '٨,٥' },
        { fr: '7,5', ar: '٧,٥' },
        { fr: '8', ar: '٨' },
      ],
      correctAnswer: { fr: '7,5', ar: '٧,٥' },
      explanation: {
        fr: 'On peut considérer 10 comme 10,0 pour faciliter le calcul.',
        ar: 'يمكننا اعتبار ١٠ بمثابة ١٠,٠ لتسهيل الحساب.',
      },
    },
    {
      id: 'q-07-01-e8',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Easy,
      text: {
        fr: 'Quel est le résultat de 0,5 x 2 ?',
        ar: 'ما هو ناتج 0,5 x 2 ؟',
      },
      mathExpression: '0.5 × 2',
      options: [
        { fr: '1', ar: '١' },
        { fr: '0,10', ar: '٠,١٠' },
        { fr: '2,5', ar: '٢,٥' },
      ],
      correctAnswer: { fr: '1', ar: '١' },
    },
    // 6 Medium Questions
    {
      id: 'q-07-01-m1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Calcule : 12,75 + 3,8.',
        ar: 'احسب : 12,75 + 3,8.',
      },
      mathExpression: '12.75 + 3.8',
      options: [
        { fr: '15,83', ar: '١٥,٨٣' },
        { fr: '16,55', ar: '١٦,٥٥' },
        { fr: '15,55', ar: '١٥,٥٥' },
      ],
      correctAnswer: { fr: '16,55', ar: '١٦,٥٥' },
      explanation: {
        fr: 'Pour additionner, il faut bien aligner les virgules. 12,75 + 3,80 = 16,55.',
        ar: 'لإجراء عملية الجمع، يجب وضع الفواصل بشكل صحيح. ١٢,٧٥ + ٣,٨٠ = ١٦,٥٥.',
      },
    },
    {
      id: 'q-07-01-m2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Quel est le résultat de 2,5 x 4,2 ?',
        ar: 'ما هو ناتج 2,5 x 4,2 ؟',
      },
      mathExpression: '2.5 × 4.2',
      options: [
        { fr: '10,5', ar: '١٠,٥' },
        { fr: '1,05', ar: '١,٠٥' },
        { fr: '8,5', ar: '٨,٥' },
      ],
      correctAnswer: { fr: '10,5', ar: '١٠,٥' },
      explanation: {
        fr: 'On multiplie 25 par 42 (ce qui donne 1050). Comme il y a deux chiffres après la virgule au total, le résultat est 10,50.',
        ar: 'نضرب ٢٥ في ٤٢ (مما يعطي ١٠٥٠). بما أن هناك رقمين بعد الفاصلة في المجموع، فإن النتيجة هي ١٠,٥٠.',
      },
    },
    {
      id: 'q-07-01-m3',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Effectue la division : 15,3 ÷ 3.',
        ar: 'أنجز القسمة : 15,3 ÷ 3.',
      },
      mathExpression: '15.3 ÷ 3',
      options: [
        { fr: '5,1', ar: '٥,١' },
        { fr: '0,51', ar: '٠,٥١' },
        { fr: '51', ar: '٥١' },
      ],
      correctAnswer: { fr: '5,1', ar: '٥,١' },
    },
    {
      id: 'q-07-01-m4',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Calcule sans parenthèses : 10 + 4 x 2,5.',
        ar: 'احسب بدون أقواس : 10 + 4 x 2,5.',
      },
      mathExpression: '10 + 4 × 2.5',
      options: [
        { fr: '35', ar: '٣٥' },
        { fr: '20', ar: '٢٠' },
        { fr: '16,5', ar: '١٦,٥' },
      ],
      correctAnswer: { fr: '20', ar: '٢٠' },
      explanation: {
        fr: 'La multiplication est prioritaire. On calcule d\'abord 4 x 2,5 = 10, puis on ajoute 10 + 10 = 20.',
        ar: 'للضرب الأولوية. نحسب أولاً ٤ × ٢,٥ = ١٠، ثم نضيف ١٠ + ١٠ = ٢٠.',
      },
    },
    {
      id: 'q-07-01-m5',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Ahmed a 50 DH. Il achète un livre à 25,5 DH et un stylo à 8,75 DH. Combien lui reste-t-il ?',
        ar: 'لدى أحمد ٥٠ درهماً. اشترى كتاباً بـ ٢٥,٥ درهماً وقلماً بـ ٨,٧٥ درهماً. كم بقي لديه؟',
      },
      options: [
        { fr: '15,75 DH', ar: '١٥,٧٥ د.م.' },
        { fr: '16,25 DH', ar: '١٦,٢٥ د.م.' },
        { fr: '24,5 DH', ar: '٢٤,٥ د.م.' },
      ],
      correctAnswer: { fr: '15,75 DH', ar: '١٥,٧٥ د.م.' },
      explanation: {
        fr: 'On calcule d\'abord le total des achats : 25,5 + 8,75 = 34,25 DH. Ensuite, on soustrait ce montant de 50 DH : 50 - 34,25 = 15,75 DH.',
        ar: 'نحسب أولاً مجموع المشتريات: ٢٥,٥ + ٨,٧٥ = ٣٤,٢٥ د.م. ثم نطرح هذا المبلغ من ٥٠ د.م: ٥٠ - ٣٤,٢٥ = ١٥,٧٥ د.م.',
      },
    },
    {
      id: 'q-07-01-m6',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Medium,
      text: {
        fr: 'Quel est le résultat de (18 - 3,5) × 0,1 ?',
        ar: 'ما هو ناتج (18 - 3,5) × 0,1 ؟',
      },
      mathExpression: '(18 - 3.5) × 0.1',
      options: [
        { fr: '14,5', ar: '١٤,٥' },
        { fr: '1,45', ar: '١,٤٥' },
        { fr: '1,835', ar: '١,٨٣٥' },
      ],
      correctAnswer: { fr: '1,45', ar: '١,٤٥' },
    },
    // 4 Hard Questions
    {
      id: 'q-07-01-h1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: {
        fr: 'Calcule le résultat de : 20 - (3,2 + 1,8) x 3.',
        ar: 'احسب ناتج : 20 - (3,2 + 1,8) x 3.',
      },
      mathExpression: '20 - (3.2 + 1.8) × 3',
      options: [
        { fr: '5', ar: '٥' },
        { fr: '51', ar: '٥١' },
        { fr: '15', ar: '١٥' },
      ],
      correctAnswer: { fr: '5', ar: '٥' },
      explanation: {
        fr: 'Priorité aux parenthèses : 3,2 + 1,8 = 5. Ensuite, la multiplication : 5 x 3 = 15. Enfin, la soustraction : 20 - 15 = 5.',
        ar: 'الأولوية للأقواس: ٣,٢ + ١,٨ = ٥. ثم الضرب: ٥ × ٣ = ١٥. وأخيراً، الطرح: ٢٠ - ١٥ = ٥.',
      },
    },
    {
      id: 'q-07-01-h2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: {
        fr: 'Une voiture consomme 6,5 litres de carburant pour 100 km. Combien consommera-t-elle pour un trajet de 350 km ?',
        ar: 'سيارة تستهلك ٦,٥ لترًا من الوقود لكل ١٠٠ كلم. كم ستستهلك في رحلة طولها ٣٥٠ كلم؟',
      },
      options: [
        { fr: '21,75 litres', ar: '٢١,٧٥ لترًا' },
        { fr: '22,75 litres', ar: '٢٢,٧٥ لترًا' },
        { fr: '19,5 litres', ar: '١٩,٥ لترًا' },
      ],
      correctAnswer: { fr: '22,75 litres', ar: '٢٢,٧٥ لترًا' },
      explanation: {
        fr: 'La consommation pour 350 km est 3,5 fois la consommation pour 100 km. Donc on calcule 6,5 x 3,5 = 22,75.',
        ar: 'الاستهلاك لـ ٣٥٠ كلم هو ٣,٥ أضعاف الاستهلاك لـ ١٠٠ كلم. إذن نحسب ٦,٥ × ٣,٥ = ٢٢,٧٥.',
      },
    },
    {
      id: 'q-07-01-h3',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: {
        fr: 'Quel est le résultat de 7,2 ÷ 0,9 ?',
        ar: 'ما هو ناتج 7,2 ÷ 0,9 ؟',
      },
      mathExpression: '7.2 ÷ 0.9',
      options: [
        { fr: '8', ar: '٨' },
        { fr: '0,8', ar: '٠,٨' },
        { fr: '80', ar: '٨٠' },
      ],
      correctAnswer: { fr: '8', ar: '٨' },
      explanation: {
        fr: 'Diviser par 0,9 revient à multiplier par 10/9. Ou plus simple, 7,2 ÷ 0,9 = 72 ÷ 9 = 8.',
        ar: 'القسمة على ٠,٩ تعادل الضرب في ١٠/٩. أو ببساطة، ٧,٢ ÷ ٠,٩ = ٧٢ ÷ ٩ = ٨.',
      },
    },
    {
      id: 'q-07-01-h4',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Hard,
      text: {
        fr: 'Le périmètre d\'un rectangle est de 25,6 cm. Sa largeur est de 4,5 cm. Quelle est sa longueur ?',
        ar: 'محيط مستطيل هو ٢٥,٦ سم. عرضه ٤,٥ سم. ما هو طوله؟',
      },
      options: [
        { fr: '8,3 cm', ar: '٨,٣ سم' },
        { fr: '12,8 cm', ar: '١٢,٨ سم' },
        { fr: '21,1 cm', ar: '٢١,١ سم' },
      ],
      correctAnswer: { fr: '8,3 cm', ar: '٨,٣ سم' },
      explanation: {
        fr: 'Le demi-périmètre (Longueur + largeur) est 25,6 ÷ 2 = 12,8 cm. La longueur est donc 12,8 - 4,5 = 8,3 cm.',
        ar: 'نصف المحيط (الطول + العرض) هو ٢٥,٦ ÷ ٢ = ١٢,٨ سم. إذن الطول هو ١٢,٨ - ٤,٥ = ٨,٣ سم.',
      },
    },
    // 2 Deep Questions
    {
      id: 'q-07-01-d1',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Deep,
      text: {
        fr: 'Nadia achète 3 cahiers à 4,50 DH l\'unité et 5 stylos à 2,25 DH l\'unité. Elle paie avec un billet de 50 DH. Combien d\'argent le caissier doit-il lui rendre ?',
        ar: 'اشترت نادية ٣ دفاتر بسعر ٤,٥٠ دراهم للوحدة و ٥ أقلام بسعر ٢,٢٥ درهم للوحدة. دفعت بورقة نقدية من فئة ٥٠ درهماً. كم من المال يجب أن يعيد لها الصراف؟',
      },
      options: [
        { fr: '25,25 DH', ar: '٢٥,٢٥ د.م.' },
        { fr: '24,75 DH', ar: '٢٤,٧٥ د.م.' },
        { fr: '26,25 DH', ar: '٢٦,٢٥ د.م.' },
      ],
      correctAnswer: { fr: '25,25 DH', ar: '٢٥,٢٥ د.م.' },
      explanation: {
        fr: 'Coût des cahiers : 3 x 4,50 = 13,50 DH. Coût des stylos : 5 x 2,25 = 11,25 DH. Coût total : 13,50 + 11,25 = 24,75 DH. Rendu : 50 - 24,75 = 25,25 DH.',
        ar: 'ثمن الدفاتر: ٣ × ٤,٥٠ = ١٣,٥٠ د.م. ثمن الأقلام: ٥ × ٢,٢٥ = ١١,٢٥ د.م. الثمن الإجمالي: ١٣,٥٠ + ١١,٢٥ = ٢٤,٧٥ د.م. الباقي: ٥٠ - ٢٤,٧٥ = ٢٥,٢٥ د.م.',
      },
    },
    {
      id: 'q-07-01-d2',
      type: QuestionType.MultipleChoice,
      difficulty: Difficulty.Deep,
      text: {
        fr: 'Un terrain rectangulaire a une longueur de 20,5 m et une largeur de 12,8 m. On veut l\'entourer d\'une clôture qui coûte 45,50 DH le mètre. Quel est le coût total de la clôture ?',
        ar: 'قطعة أرض مستطيلة طولها ٢٠,٥ م وعرضها ١٢,٨ م. نريد إحاطتها بسياج ثمن المتر الواحد منه ٤٥,٥٠ د.م. ما هو الثمن الإجمالي للسياج؟',
      },
      options: [
        { fr: '2920,90 DH', ar: '٢٩٢٠,٩٠ د.م.' },
        { fr: '3029,80 DH', ar: '٣٠٢٩,٨٠ د.م.' },
        { fr: '11943,20 DH', ar: '١١٩٤٣,٢٠ د.م.' },
      ],
      correctAnswer: { fr: '3029,80 DH', ar: '٣٠٢٩,٨٠ د.م.' },
      explanation: {
        fr: 'D\'abord, on calcule le périmètre du terrain : (20,5 + 12,8) x 2 = 33,3 x 2 = 66,6 m. Ensuite, on calcule le coût total : 66,6 x 45,50 = 3029,80 DH.',
        ar: 'أولاً، نحسب محيط الأرض: (٢٠,٥ + ١٢,٨) × ٢ = ٣٣,٣ × ٢ = ٦٦,٦ م. بعد ذلك، نحسب التكلفة الإجمالية: ٦٦,٦ × ٤٥,٥٠ = ٣٠٢٩,٨٠ د.م.',
      },
    },
  ],
};
