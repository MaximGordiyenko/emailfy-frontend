type QuestionOption = { label: string; value: string };

type Question = {
  id: string;
  text: string;
  type?: "select" | "radio" | "buttons" | "c<SurveyResolverProps>heckbox";
  options: QuestionOption[];
};

export type SurveyResolverProps = {
  answers: Record<string, string>;
  question: Question;
  onAnswer: (value: string) => void;
};
