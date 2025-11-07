# TATASCHOOL - Aperçu du Projet & Journal de Développement

## À propos de TATASCHOOL

**TATASCHOOL** est une plateforme d'apprentissage en ligne (LMS) interactive et de pointe, conçue spécifiquement pour le programme scolaire marocain. S'adressant aux élèves du primaire jusqu'au baccalauréat, la plateforme offre une expérience éducative riche, bilingue (Arabe/Français) et entièrement responsive, accessible sur n'importe quel appareil.

### Caractéristiques Clés

*   **Parcours d'Apprentissage Structuré :** Le contenu est organisé par niveaux scolaires et par leçons, permettant une progression logique et un suivi clair des acquis.
*   **Interface Bilingue Complète :** L'ensemble de la plateforme, y compris le contenu des cours et les exercices, bascule instantanément entre le français et l'arabe, avec une prise en charge complète des mises en page de droite à gauche (RTL).
*   **Portail Élève Engageant :**
    *   Tableau de bord personnalisé pour suivre les progrès.
    *   Système de progression flexible permettant d'explorer les leçons dans n'importe quel ordre au sein d'un niveau.
    *   Quiz interactifs avec randomisation des choix pour des évaluations équitables.
    *   Messages de félicitations pour motiver les élèves lorsqu'ils montent de niveau.
*   **Tuteur IA Innovant :**
    *   Une fonctionnalité d'aide intégrée, propulsée par l'API Gemini de Google.
    *   Agit comme un "professeur virtuel", fournissant des indices et des explications sans donner la réponse.
    *   **Unique :** Le tuteur IA communique en **Darija marocaine** pour une expérience plus proche et plus compréhensible.
*   **Portail Enseignant Puissant :**
    *   **Accès Sécurisé :** Protégé par un code secret avec un mécanisme de verrouillage robuste contre les tentatives d'accès multiples.
    *   **Gestion des Comptes :** Outils complets pour visualiser, modifier et gérer les informations des élèves.
    *   **Gestionnaire de Contenu Complet :** Permet aux enseignants d'ajouter, modifier et supprimer des niveaux, des leçons et des questions, avec une règle de validation (20 questions par leçon) pour garantir la qualité.
    *   **Analyses de Performance :** Des graphiques et des indicateurs de performance clés (KPI) pour suivre les progrès des élèves, avec des filtres avancés par niveau, genre, type d'école, etc.
*   **Gestion Robuste des Données :**
    *   Fonctionnalités d'importation et d'exportation des données des élèves et du contenu pédagogique (formats CSV et JSON), garantissant la portabilité et la sauvegarde des données.

---

## Journal de Développement

Ce fichier documente l'historique des requêtes (prompts) et les actions de développement entreprises pour construire et affiner la plateforme TATASCHOOL.

### 1. Intégration du Tuteur IA (Initiative de l'Ingénieur)
> **Requête :** (Initié par l'ingénieur) Améliorer l'expérience d'apprentissage en intégrant une aide intelligente dans les quiz.

#### Réponse
*   Intégration de l'API Google Gemini dans la vue du quiz.
*   Ajout d'un bouton "Aide" qui envoie la question actuelle à l'IA.
*   Mise en place d'une instruction système pour que l'IA agisse comme un tuteur encourageant.
*   Ajout d'états de chargement et d'affichage pour la réponse de l'IA.

### 2. Augmentation du Temps de Quiz
> **Requête :** "اجعل التوقيق التنازلي خلال التقييم يساوي 20 دقيقة بدل 10"

#### Réponse
*   Modification de la durée du minuteur de quiz de 10 minutes (600 secondes) à 20 minutes (1200 secondes) dans le composant `QuizView`.

### 3. Implémentation du Bilinguisme
> **Requête :** "اجعل التطبيق مزدوج اللغة بشكل آني، يوضع زر تحويل اللغة من العربية الى الفرنسية او العكس بشكل يمكن الوصول اليه دائما في كل نافذة بشكل سلس"

#### Réponse
*   Création d'un système d'internationalisation (i18n) avec un `TranslationContext`.
*   Ajout de fichiers de traduction pour l'arabe (`ar.ts`) et le français (`fr.ts`).
*   Intégration d'un bouton de changement de langue dans l'en-tête.
*   Remplacement de tout le texte statique par des clés de traduction.
*   Mise en place de la gestion dynamique de la direction du texte (LTR/RTL).

### 4. Mise à Jour du Nom de la Marque
> **Requête :** "remplace 'Plateforme de Mathématiques préparée par le professeur : Ouarrab Oussama' par 'TATASCHOOL' بالعربية 'طاطاسكول'"

#### Réponse
*   Mise à jour des clés de traduction correspondantes dans les fichiers `ar.ts` et `fr.ts`.

### 5. Complétion de la Traduction
> **Requête :** "الترجمة غير شاملة لكل شيء، المرجو تدارك الخطأ لترجمة كل شيء بالمنصة"

#### Réponse
*   Internationalisation complète du contenu éducatif (titres de leçons, questions, options, explications).
*   Refactorisation de la structure des données pour utiliser des clés de traduction au lieu de chaînes de caractères en dur.
*   Mise à jour de tous les composants pour afficher le contenu traduit dynamiquement.

### 6. Assouplissement du Système de Progression
> **Requête :** "لقد قمت بتغيير القيود التي كانت سابقا بخصوص نظام اجتياز التقييم وفتح الدروس والمستويات، صحح الخطأ"

#### Réponse
*   Modification de la logique `isLessonUnlocked` pour permettre aux élèves d'accéder à n'importe quelle leçon au sein de leur niveau actuel (ou des niveaux précédents), au lieu d'imposer un ordre séquentiel strict.

### 7. Gestion de Contenu par l'Enseignant
> **Requête :** "يمكن لحساب الأستاذ أن يقوم بإضافة أو تعديل أو حذف الدروس الخاصة بكل niveau... شريطة أن يكون بنك الاسئلة الخاص بكل درس هو 20 سؤالا"

#### Réponse
*   Amélioration du `ContentManager` pour permettre l'ajout de nouvelles leçons et questions.
*   Mise en place de la règle des 20 questions : une leçon n'est visible pour les élèves que si elle contient exactement 20 questions.
*   Ajout d'un indicateur visuel (ex: `15/20`) pour les enseignants.

### 8. Visibilité et Correction des Boutons de Suppression
> **Requêtes successives :** "يجب ان يكون حذف سؤال أو درس ممكنا بحساب الاستاذ" -> "زر الحذف لا يعمل" -> "زر حذف السؤال لا يشتغل..."

#### Réponse
*   **Visibilité :** Rendu les boutons "Modifier" et "Supprimer" toujours visibles dans le `ContentManager` pour une meilleure accessibilité.
*   **Correction :** Correction d'un bug critique dans le `lmsService` où les opérations de suppression n'étaient pas correctement sauvegardées. La logique a été refactorisée pour utiliser une copie profonde des données (`JSON.parse(JSON.stringify(...))`) avant toute modification, garantissant la fiabilité.

### 9. Amélioration de l'Expérience de Connexion
> **Requête :** "عند تسجيل حساب جديد أو تسجيل الدخول... قم دائما بشكل أوطوماتيكي بحفظ الحساب... وعند الضغط على تغيير الحساب قم مباشرة بإضهار الحسابات المسجلة"

#### Réponse
*   Suppression de la case à cocher "Se souvenir de moi" et automatisation de la sauvegarde des comptes après une connexion ou une inscription réussie.

### 10. Modification du Flux de Navigation
> **Requêtes successives :** "وعند الضغط على تغيير الحساب قم مباشرة بإضهار الواجهة الرئيسية للمنصة" -> "استبدل زر الانتقال الى حساب الاستاذ بكلمة تظهر في جميع الحسابات : 'تغيير الحساب'" -> "عند الضغط على تغيير الحساب او الخروج قم مباشرة بإظهار الواجهة الرئيسية"

#### Réponse
*   Modification du bouton "Changer de compte" pour qu'il redirige vers l'écran d'accueil principal (sélection du rôle).
*   Uniformisation du texte du bouton en "Changer de compte" pour tous les rôles.
*   Assuré que le bouton de déconnexion redirige également vers l'écran d'accueil.

### 11. Randomisation des Choix de Quiz
> **Requête :** "عند اضهار الاسئلة من نوع MCQ خلال تقييم الدرس المرجو وضع ترتيب الاختيارات بشكل عشوائي"

#### Réponse
*   Implémentation d'une fonction de mélange aléatoire pour les options des questions à choix multiples (QCM) au début de chaque quiz.

### 12. Améliorations de l'Interface Utilisateur (UI/UX)
> **Requêtes successives :** "قم بإضافة زر اختيار اللغة في الواجهة الرئيسية" -> "editer >> Bienvenue sur la plateforme : TATASCHOOL" -> "Met : 'TATASCHOOL' avec un Font Innovant agreable avec un chapeau de graduations" -> "fait la meme chose dans la page d'accueil" -> "the Header is not optimized for mobile app..." -> "header must be sticky to top all the time"

#### Réponse
*   Ajout du sélecteur de langue sur l'écran d'accueil.
*   Mise à jour du message d'accueil et du logo de l'en-tête avec une nouvelle police et une icône de toque de diplômé.
*   Assuré la cohérence de la marque sur la page d'accueil et dans l'en-tête.
*   Optimisation de l'en-tête pour les appareils mobiles et harmonisation des couleurs.
*   Rendu l'en-tête "collant" (sticky) pour qu'il reste visible en permanence.

### 13. Ajustements Terminologiques
> **Requêtes successives :** "استبدل الطالب بالتلميذ" -> "استبدل كلمة مساعدة من الذكاء الاصطناعي بالكلمة التالية : مساعدة من الأستاذ"

#### Réponse
*   Remplacement du terme "Étudiant" par "Élève" (et "الطالب" par "التلميذ") dans toute l'application.
*   Modification du titre de l'aide IA en "Aide du professeur" pour une expérience plus personnalisée.

### 14. Inscription Bilingue
> **Requête :** "عند انشاء الحساب كتلميذ اطلب ادخال المعلومات الحالية باللغة العربية والفرنسية معا"

#### Réponse
*   Modification du formulaire d'inscription pour recueillir le nom, le prénom et le nom de l'école en arabe et en français.
*   Mise à jour de la structure de données des élèves (`Student`) pour stocker ces informations bilingues.
*   Mise à jour de tous les composants pour afficher dynamiquement les informations dans la langue sélectionnée.

### 15. Motivation et Personnalisation
> **Requêtes successives :** "عند اكمال كل مستوى قم بتهنئة التلميذ على تقدمه" -> "عند طلب مساعدة باللغة العربية يجب ان تكون الاجابة باللهجة الدارجة المغربية فقط"

#### Réponse
*   Ajout d'un message de félicitations qui apparaît lorsqu'un élève termine toutes les leçons d'un niveau.
*   Mise à jour de l'instruction système de l'API Gemini pour exiger des réponses en **Darija marocaine** lorsque la langue de l'interface est l'arabe.

### 16. Sécurisation de l'Accès Enseignant
> **Requêtes successives :** "اجعل الدخول لحساب الأستاذ محمي برمز سري : 14584135" -> "في حالة ادخال الرقم السري 3 مرات بشكل خاطئ، يتم منع ادخال الرقم السري لمدة 30 ثانية..."

#### Réponse
*   Mise en place d'un écran de saisie de code secret pour l'accès au portail enseignant.
*   Implémentation d'un mécanisme de verrouillage de 30 secondes après 3 tentatives infructueuses.
*   Utilisation de `sessionStorage` pour rendre le verrouillage persistant et non contournable par un simple rafraîchissement de la page.

### 17. Revue Finale et Documentation
> **Requête :** "قم بمراجعة التطبيق كليا... وقم بإضافة ملف يحتوي على كل Prompts التي طلبتها منك إضافة الى ماذا فعلته كإستجابة..."

#### Réponse
*   Révision de l'ensemble du code, en particulier du `lmsService`, pour assurer la cohérence et la robustesse.
*   Ajout de contenu complet (20 questions) à une deuxième leçon pour mieux illustrer le fonctionnement de la plateforme.
*   Création de ce fichier `PROMPTS.md` pour servir de résumé marketing et de journal de développement.

### 18. Renforcement de la Sécurité du Verrouillage
> **Requête :** "لتخزين حالة الحظر (عدد المحاولات الفاشلة ووقت انتهاء الحظر) ( Utiliser LocalStorage au lieu du sessionStorage"

#### Réponse
*   Mise à jour du mécanisme de verrouillage de l'accès enseignant pour utiliser `localStorage` au lieu de `sessionStorage`.
*   Ce changement rend le verrouillage persistant même après la fermeture et la réouverture du navigateur, renforçant ainsi la sécurité et rendant le système de temporisation impossible à contourner, conformément à la demande d'un système "très strict".
