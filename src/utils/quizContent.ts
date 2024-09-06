import { QuestionType, Quiz } from "../types/Types";



// Raw data for multiple choice question
export class McqQuestion
{
  question_text : string;
  wrong_answer_options : string[];
  correct_answer : string;

  constructor(question_text: string, correct_answer : string, wrong_answer_options : string[])
  {
    this.question_text = question_text;
    this.wrong_answer_options = wrong_answer_options;
    this.correct_answer = correct_answer;
  }
}

// Generated for displaying a quiz question,
// has randomly shuffle answers
export class McqQuestionPresent
{
    question_text : string;
    answer_options : string[];
    correct_answer_index : number;

    constructor(mcqQuestion : McqQuestion)
    {
        this.question_text = mcqQuestion.question_text;
        this.answer_options = new Array(mcqQuestion.wrong_answer_options.length + 1)
        this.correct_answer_index = Math.floor(Math.random() * this.answer_options.length);

        // Fill answer options with randomly shuffle answer options
        let possibleWrongAnswers : string[] = mcqQuestion.wrong_answer_options
        for (let i : number = 0; i < this.answer_options.length; i++ )
            {
                if (i === this.correct_answer_index)
                {
                    this.answer_options[i] = mcqQuestion.correct_answer;
                }
                else
                {
                    // Get random wrong answer
                    let wrongAnswerIndex = Math.floor(Math.random() * possibleWrongAnswers.length);
                    this.answer_options[i] = possibleWrongAnswers[wrongAnswerIndex];
                    possibleWrongAnswers.splice(i, 1);
                }
            }
    }
}


// Each quiz will use a question bank
export class QuestionBank
{
  questions : McqQuestion[];


  constructor() {
    this.questions = [];
  }


  add_question(question : McqQuestion)
  {
    this.questions.push(question);
  }

  get_presentation_questions() : McqQuestionPresent[]
  {
    let inProgressQuestions : McqQuestion[] = this.questions;
    let toReturn : McqQuestionPresent[] = new Array(this.questions.length);

    while(inProgressQuestions.length > 0)
    {
        // Get next question
        let randomIndex : number = Math.floor(Math.random() * inProgressQuestions.length);
        toReturn.push(new McqQuestionPresent(inProgressQuestions[randomIndex]));
        // Remove used quesiton
        inProgressQuestions.splice(randomIndex, 1);
    }

    return toReturn;
  }

  //test for now
    get_questions(): McqQuestionPresent[] {
        let toReturn: McqQuestionPresent[] = [];
        if (this.questions !== undefined){
            for (let i = 0; i < this.questions.length; i++) {
                console.log(i);
                toReturn.push(new McqQuestionPresent(this.questions[i]));
            }
        }
        return toReturn;
    }
    }

// const AxialTiltQuestions : QuestionBank = new QuestionBank();
// const SolsticeActivityQuestions : QuestionBank = new QuestionBank();

// AxialTiltQuestions.add_question(new McqQuestion(
// "What most likely gave Earth its axial tilt:",
// "Being hit by a large asteroid",
// [
//     "Dinosaurs running around really fast",
//     "The heaviest part of Earth rolled towards the bottom",
//     "Aliens"
// ]));

// AxialTiltQuestions.add_question(new McqQuestion(
// "If the Northern Hemisphere is experiencing Winter, what season would it be in the Southern Hemisphere:",
// "Summer",
// [
//     "Autumn",
//     "Winter",
//     "Spring"
// ]));

// AxialTiltQuestions.add_question(new McqQuestion(
// "Which of the following statements is true:",
// "Axial tilt causes seasons by causing different parts of the Earth to be more exposed to sunlight",
// [
//     "Axial tilt causes seasons by making parts of the Earth closer to the sun",
//     "Axial tilt causes the seasons by switching the direction it tilts between Winter and Summer",
//     "Axial tilt causes the seasons by causing the moon to block more or less sunlight at different parts of the year"
// ]));

// AxialTiltQuestions.add_question(new McqQuestion(
// "A larger axial tilt would result in:",
// "More extreme seasonal changes",
// [
//     "Less extreme seasonal changes",
//     "No seasons at all",
//     "No change to the seasons"
// ]));

// AxialTiltQuestions.add_question(new McqQuestion(
// "If there was no axial tilt:",
// "There would be no seasons",
// [
//     "There would still be the same seasons, but the entire Earth would experience the same season at the same time",
//     "There would be more than four seasons",
//     "There would only be two seasons"
// ]))

// SolsticeActivityQuestions.add_question(new McqQuestion(
// "What combination of day/night length combinations between hemispheres is possible:",
// "Same day length in both hemispheres",
// [
//     "Longest day in one hemisphere, shortest night in other ",
//     "Longest day in both hemispheres",
//     "Shortest day in both hemispheres"
// ]));

// SolsticeActivityQuestions.add_question(new McqQuestion(
// "Which of the following statements is true:",
// "Both the Northern and Southern hemisphere have equinoxes at the same time",
// [
//     "Equinoxes occur four times a year, while solstices only occur twice a year",
//     "Solstices only occur some years, equinoxes occur every year",
//     "Only the Northern Hemisphere has equinoxes, and only the Southern Hemisphere has Solstices"
// ]));

// SolsticeActivityQuestions.add_question(new McqQuestion(
// "If the Southern Hemisphere is experiencing a Winter Solstice, what would the Northern Hemisphere be experiencing:",
// "Its longest day of the year",
// [
//     "Its longest night of the year",
//     "Its day and night lengths would be the same",
//     "It’s impossible to say what the Northern Hemisphere would be experiencing"
// ]));

// SolsticeActivityQuestions.add_question(new McqQuestion(
// "What order of events could happen throughout the year in a hemisphere:",
// "Equal day/night → longest night → equal day/night → longest day",
// [
//     "Equal day/night → longest night → longest day → equal day/night",
//     "Longest day → equal day/night → equal day/night → longest night",
//     "Longest day → equal day/night → longest day → equal day/night"
// ]));

// SolsticeActivityQuestions.add_question(new McqQuestion(
// "If the Southern Hemisphere has experienced its longest night, and now its day/night lengths are equal, what season is the Northern Hemisphere experiencing:",
// "Autumn ",
// [
//     "Winter",
//     "Spring",
//     "Summer"
// ]));



export const AxialTiltQuestions: Quiz = {
    questions: [
      {
        id: "q1",
        text: "What most likely gave Earth its axial tilt:",
        options: [
          { id: "o1", text: "Dinosaurs running around really fast" },
          { id: "o2", text: "Being hit by a large asteroid" },
          { id: "o3", text: "The heaviest part of Earth rolled towards the bottom" },
          { id: "o4", text: "Aliens" }
        ],
        answerId: ["o2"],
        type: QuestionType.SINGLE_SELECT
      },
      {
        id: "q2",
        text: "If the Northern Hemisphere is experiencing Winter, what season would it be in the Southern Hemisphere:",
        options: [
          { id: "o1", text: "Autumn" },
          { id: "o2", text: "Winter" },
          { id: "o3", text: "Spring" },
          { id: "o4", text: "Summer" }
        ],
        answerId: ["o4"],
        type: QuestionType.SINGLE_SELECT
      },
      {
        id: "q3",
        text: "Which of the following statements is true:",
        options: [
          { id: "o1", text: "Axial tilt causes seasons by making parts of the Earth closer to the sun" },
          { id: "o2", text: "Axial tilt causes seasons by causing the moon to block more or less sunlight at different parts of the year" },
          { id: "o3", text: "Axial tilt causes seasons by switching the direction it tilts between Winter and Summer" },
          { id: "o4", text: "Axial tilt causes seasons by causing different parts of the Earth to be more exposed to sunlight" }
        ],
        answerId: ["o4"],
        type: QuestionType.SINGLE_SELECT
      },
      {
        id: "q4",
        text: "A larger axial tilt would result in:",
        options: [
          { id: "o1", text: "Less extreme seasonal changes" },
          { id: "o2", text: "No seasons at all" },
          { id: "o3", text: "No change to the seasons" },
          { id: "o4", text: "More extreme seasonal changes" }
        ],
        answerId: ["o4"],
        type: QuestionType.SINGLE_SELECT
      },
      {
        id: "q5",
        text: "If there was no axial tilt:",
        options: [
          { id: "o1", text: "There would still be the same seasons, but the entire Earth would experience the same season at the same time" },
          { id: "o2", text: "There would be more than four seasons" },
          { id: "o3", text: "There would only be two seasons" },
          { id: "o4", text: "There would be no seasons" }
        ],
        answerId: ["o4"],
        type: QuestionType.SINGLE_SELECT
      },
      // example multi select
      {
        id: "q6",
        text: "Select all factors that contribute to Earth's axial tilt:",
        options: [
          { id: "o1", text: "Gravitational pull of the moon" },
          { id: "o2", text: "Collision with other celestial bodies" },
          { id: "o3", text: "Angular momentum from the solar nebula" },
          { id: "o4", text: "Alien technology" }
        ],
        answerId: ["o1", "o2", "o3"], 
        type: QuestionType.MULTI_SELECT
      }
    ]
  };
  
export const SolsticeActivityQuestions: Quiz = {
questions: [
    {
    id: "q1",
    text: "What combination of day/night length combinations between hemispheres is possible:",
    options: [
        { id: "o1", text: "Longest day in one hemisphere, shortest night in other" },
        { id: "o2", text: "Longest day in both hemispheres" },
        { id: "o3", text: "Shortest day in both hemispheres" },
        { id: "o4", text: "Same day length in both hemispheres" }
    ],
    answerId: ["o4"],
    type: QuestionType.SINGLE_SELECT
    },
    {
    id: "q2",
    text: "Which of the following statements is true:",
    options: [
        { id: "o1", text: "Equinoxes occur four times a year, while solstices only occur twice a year" },
        { id: "o2", text: "Solstices only occur some years, equinoxes occur every year" },
        { id: "o3", text: "Only the Northern Hemisphere has equinoxes, and only the Southern Hemisphere has Solstices" },
        { id: "o4", text: "Both the Northern and Southern hemisphere have equinoxes at the same time" }
    ],
    answerId: ["o4"],
    type: QuestionType.SINGLE_SELECT
    },
    {
    id: "q3",
    text: "If the Southern Hemisphere is experiencing a Winter Solstice, what would the Northern Hemisphere be experiencing:",
    options: [
        { id: "o1", text: "Its longest night of the year" },
        { id: "o2", text: "Its day and night lengths would be the same" },
        { id: "o3", text: "It’s impossible to say what the Northern Hemisphere would be experiencing" },
        { id: "o4", text: "Its longest day of the year" }
    ],
    answerId: ["o4"],
    type: QuestionType.SINGLE_SELECT
    },
    {
    id: "q4",
    text: "What order of events could happen throughout the year in a hemisphere:",
    options: [
        { id: "o1", text: "Equal day/night → longest night → longest day → equal day/night" },
        { id: "o2", text: "Longest day → equal day/night → longest day → equal day/night" },
        { id: "o3", text: "Longest day → equal day/night → equal day/night → longest night" },
        { id: "o4", text: "Equal day/night → longest night → equal day/night → longest day" }
    ],
    answerId: ["o4"],
    type: QuestionType.SINGLE_SELECT
    },
    {
    id: "q5",
    text: "If the Southern Hemisphere has experienced its longest night, and now its day/night lengths are equal, what season is the Northern Hemisphere experiencing:",
    options: [
        { id: "o1", text: "Winter" },
        { id: "o2", text: "Spring" },
        { id: "o3", text: "Summer" },
        { id: "o4", text: "Autumn" }
    ],
    answerId: ["o4"],
    type: QuestionType.SINGLE_SELECT
    }
]
};
