import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="toggle-wrapper">
      <label className="switch">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <span className="slider" />
      </label>
      <span className="label-text">{theme === 'dark' ? '' : ''}</span>
    </div>
  );
};

export default ThemeToggle;
