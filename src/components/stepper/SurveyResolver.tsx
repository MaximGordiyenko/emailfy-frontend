import { FC } from "react";
import { SurveyResolverProps } from './types';
import { AppSelect } from "../selects/AppSelect.jsx";
import { Checkbox, Radio } from "antd";

export const SurveyResolver: FC = ({question, answers, onAnswer}) => {
  switch (question.type) {
    case "select":
      return (
        <AppSelect
          key={question.id}
          placeholder={'Select Email Campaign'}
          options={question.options}
          onChange={onAnswer}
        />
      );
    
    case "radio":
      return (
        <div className="survey-resolver-container">
          {question.options.map((opt) => (
              <Radio
                key={opt.value}
                value={opt.value}
                onChange={(e) => {
                  const prev = (answers[question.id] || '').split(',').filter(Boolean);
                  const selected = new Set(prev);
                  e.target.checked ? selected.add(opt.value) : selected.delete(opt.value);
                  onAnswer([ ...selected ].join(","));
                }}>
                {opt.label}
              </Radio>
            )
          )}
        </div>
      );
    
    case "checkbox":
      return (
        <div className="survey-resolver-container">
          {question.options.map((opt) => (
            <Checkbox
              key={opt.value}
              value={opt.value}
              onChange={(e) => {
                const prev = (answers[question.id] || '').split(',').filter(Boolean);
                const selected = new Set(prev);
                e.target.checked ? selected.add(opt.value) : selected.delete(opt.value);
                onAnswer([ ...selected ].join(","));
              }}>
              {opt.label}
            </Checkbox>
          ))}
        </div>
      );
  }
};
