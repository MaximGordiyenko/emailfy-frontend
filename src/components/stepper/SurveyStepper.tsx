import { FC, useState } from 'react';
import { Flex, Typography } from 'antd';
import { steps } from '../../pages/home-page/steps.constant.js';
import { questions } from '../../pages/home-page/questions.constant.js';
import { SurveyResolver } from './SurveyResolver.tsx';
import { AppButton } from '../button/AppButton.jsx';
import './styles.css';

const {Title} = Typography;

export const SurveyStepper: FC = () => {
  const [ pendingAnswer, setPendingAnswer ] = useState<string | null>(null);
  const [ currentStepId, setCurrentStepId ] = useState("step0");
  const [ answers, setAnswers ] = useState<Record<string, string>>({});
  
  const currentStep = steps.find((s) => s.id === currentStepId);
  const question = questions.find((q) => q.id === currentStep?.questionId);
  
  const handleAnswer = (value: string) => {
    if (!question || !currentStep) return;
    setPendingAnswer(value);
  };
  
  const goToNextStep = () => {
    if (!question || !currentStep || pendingAnswer === null) return;
    setAnswers((prev) => ({...prev, [question.id]: pendingAnswer}));
    
    let nextStepId = "done";
    
    if (question.type === "checkbox") {
      const selected = pendingAnswer.split(",");
      for (const val of selected) {
        if (currentStep.transitions[val]) {
          nextStepId = currentStep.transitions[val];
          break;
        }
      }
    } else {
      nextStepId = currentStep.transitions[pendingAnswer] || "done";
    }
    
    setPendingAnswer(null);
    setCurrentStepId(nextStepId);
  };
  
  if (currentStepId === "done") {
    return (
      <div className="p-4 border rounded shadow max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Дякуємо за проходження!</h2>
        <pre className="text-sm bg-gray-100 p-2 rounded">
          {JSON.stringify(answers, null, 2)}
        </pre>
      </div>
    );
  }
  
  if (!question) return <div>Questin is not find 😢</div>;
  
  return (
    <Flex gap="small" align="center" justify="flex-start" vertical className="survey-stepper-container">
      <Title level={2}>{question.text}</Title>
      
      <SurveyResolver question={question} answers={answers} onAnswer={handleAnswer}/>
      
      {(question.type === "checkbox"
          || question.type === "select"
          || question.type === "radio")
        && (
          <AppButton
            onClick={goToNextStep}
            disabled={!pendingAnswer}
            className="survey-stepper-button-next">
            Далі
          </AppButton>
        )}
    </Flex>
  );
};
