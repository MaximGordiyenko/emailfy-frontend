import { FC } from 'react';
import { Checkbox, Space } from 'antd';
import { CheckboxOptionType } from 'antd/es/checkbox/Group';

interface CustomCheckboxProps {
  options: CheckboxOptionType[];
  onAnswer: (values: string) => void;
  questionId: string;
  initialValues?: string;
}

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
                                                          options,
                                                          onAnswer,
                                                          answers,
                                                        }) => {
  
  return (
    <Space direction="vertical">
      {options.map((opt) => (
        <Checkbox
          key={opt.value}
          onChange={(e) => {
            const prev = (answers[question.id] || '').split(',').filter(Boolean);
            const selected = new Set(prev);
            e.target.checked ? selected.add(opt.value) : selected.delete(opt.value);
            onAnswer([...selected].join(","));
          }}>
          {opt.label}
        </Checkbox>
      ))}
    </Space>
  );
};
