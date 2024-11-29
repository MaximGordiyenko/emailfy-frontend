import { Switch } from 'antd';
import { useTheme } from '../../context/ThemeContext';
import './styles.css';

export const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return <Switch onChange={toggleTheme} checkedChildren="Light" unCheckedChildren="Dark" />;
};
