import React, { useEffect } from "react";
import CardPopup from "./CardPopup";
import * as MuiIcons from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Question, QuestionType, Quiz } from "../../types/Types";

interface QuizPopupProps {
  open: boolean;
  onClose: () => void;
  bgColour?: string;
  iconName?: keyof typeof MuiIcons;
  iconColour?: string;
  title?: string;
  quiz: Quiz;
}

const BUTTON_STATES = {
  CHECK_ANSWER: "Check Answer",
  NEXT: "Next!",
  FINISH: "Finish!",
};

const HELPER_TEXT = {
  INITIAL: "Choose wisely",
  CORRECT: "You got it!",
  WRONG: "Sorry, wrong answer!",
  NO_SELECT: "Please select an option!",
};

const BottomHalf = {
  height: "100%",
  maxWidth: "600px",
  minWidth: "600px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  color: "black",
};

const ContentContainer = {
  maxWidth: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  mt: 1,
  flexGrow: 1,
};

const ButtonContainer = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px 0",
};

const QuizPopup: React.FC<QuizPopupProps> = ({
  open,
  onClose,
  bgColour = "#365486",
  iconName = "HelpOutline" as keyof typeof MuiIcons,
  iconColour = "#0F1035",
  title = "Quiz!",
  quiz,
}) => {
  const [quizQuestions, setQuizQuestions] = React.useState<Quiz>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [helperText, setHelperText] = React.useState(HELPER_TEXT.INITIAL);
  const [buttonText, setButtonText] = React.useState<string>(
    BUTTON_STATES.CHECK_ANSWER
  );
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);

  useEffect(() => {
    if (quiz) {
      // Shuffle order of questions and options in each question
      const shuffledQuestions = shuffleArray(
        quiz.questions.map((question) => ({
          ...question,
          options: shuffleArray(question.options),
        }))
      );
      setQuizQuestions({ ...quiz, questions: shuffledQuestions });
    }
  }, [quiz]);

  useEffect(() => {
    if (!open) {
      resetQuiz();
    }
  }, [open]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setButtonText(BUTTON_STATES.CHECK_ANSWER);
    setHelperText(HELPER_TEXT.INITIAL);
    setIsDisabled(false);
  };

  const handleOptionChange = (optionId: string) => {
    if (
      quizQuestions?.questions[currentQuestionIndex].type ===
      QuestionType.SINGLE_SELECT
    ) {
      setSelectedOptions([optionId]);
    } else {
      const currentIndex = selectedOptions.indexOf(optionId);
      const newSelectedOptions = [...selectedOptions];

      if (currentIndex === -1) {
        newSelectedOptions.push(optionId);
      } else {
        newSelectedOptions.splice(currentIndex, 1);
      }

      setSelectedOptions(newSelectedOptions);
    }
  };

  const handleSubmit = () => {
    if (buttonText === BUTTON_STATES.FINISH) {
      onClose();
    } else {
      if (quizQuestions) {
        if (
          buttonText === BUTTON_STATES.NEXT &&
          currentQuestionIndex < quizQuestions.questions.length - 1
        ) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setIsDisabled(false);
          setHelperText(HELPER_TEXT.INITIAL);
          setButtonText(BUTTON_STATES.CHECK_ANSWER);
          setSelectedOptions([]);
        } else {
          const currentQuestion: Question =
            quizQuestions.questions[currentQuestionIndex];
          const correctAnswerIds: string[] = currentQuestion?.answerId;

          if (arraysEquivalent(selectedOptions, correctAnswerIds)) {
            setHelperText(HELPER_TEXT.CORRECT);
            setIsDisabled(true);
            if (currentQuestionIndex < quizQuestions.questions.length - 1) {
              setButtonText(BUTTON_STATES.NEXT);
            } else {
              setButtonText(BUTTON_STATES.FINISH);
            }
          } else if (selectedOptions.length > 0) {
            setHelperText(HELPER_TEXT.WRONG);
          } else {
            setHelperText(HELPER_TEXT.NO_SELECT);
          }
        }
      }
    }
  };

  // a and b are equivalent if they have same elements regardless of their elements
  const arraysEquivalent = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!b.includes(a[i])) return false;
    }

    return true;
  };

  // used to shuffle questions and each question's options
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <CardPopup
      open={open}
      onClose={onClose}
      bgColour={bgColour}
      iconName={iconName}
      iconColour={iconColour}
    >
      <Box sx={{ ...BottomHalf }}>
        <Box sx={ContentContainer}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography
            id="modal-description"
            variant="subtitle1"
            align="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            {quizQuestions?.questions[currentQuestionIndex].text}
          </Typography>
          {quizQuestions?.questions[currentQuestionIndex].type ===
          QuestionType.MULTI_SELECT ? (
            quizQuestions?.questions[currentQuestionIndex].options.map(
              (option, index: number) => (
                <FormControlLabel
                  key={option.id}
                  control={
                    <Checkbox
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleOptionChange(option.id)}
                    />
                  }
                  label={option.text}
                  disabled={isDisabled}
                  sx={{ mb: 1 }}
                />
              )
            )
          ) : (
            <RadioGroup
              value={selectedOptions[0] || ""}
              onChange={(event) => handleOptionChange(event.target.value)}
            >
              {quizQuestions?.questions[currentQuestionIndex].options.map(
                (option, index: number) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.text}
                    disabled={isDisabled}
                    sx={{ mb: 1 }}
                  />
                )
              )}
            </RadioGroup>
          )}
        </Box>
        <Box sx={ButtonContainer}>
          <Typography
            sx={{
              color:
                helperText === HELPER_TEXT.CORRECT
                  ? "green"
                  : helperText === HELPER_TEXT.WRONG
                  ? "red"
                  : helperText === HELPER_TEXT.INITIAL
                  ? "grey"
                  : helperText === HELPER_TEXT.NO_SELECT
                  ? "red"
                  : "black",
            }}
          >
            {helperText}
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 28,
              height: 40,
              width: 200,
              backgroundColor: bgColour,
              color: "black",
              mt: 1,
              mb: 1,
              "&.MuiButtonBase-root:hover": { bgcolor: bgColour },
            }}
            onClick={handleSubmit}
            disableElevation
          >
            {buttonText}
          </Button>
          <Typography>
            {`${currentQuestionIndex + 1}/${quizQuestions?.questions.length}`}
          </Typography>
        </Box>
      </Box>
    </CardPopup>
  );
};
export default QuizPopup;
