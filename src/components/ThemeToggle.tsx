import React, { useContext } from 'react';
import Switch from 'react-switch';
import { AppContext } from '../context/AppContext';
import { CHANGE_THEME } from '../context/types';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div>
      <Switch
        onColor={'#707cf2'}
        offColor={'#707cf2'}
        aria-label="toggle between dark and light theme"
        aria-checked={checked}
        width={64}
        height={32}
        uncheckedIcon={
          <div style={{ ...styles }}>
            <span role="img" aria-label="sun">
              🌞
            </span>
          </div>
        }
        checkedIcon={
          <div style={{ ...styles }}>
            <span role="img" aria-label="moon">
              🌜
            </span>
          </div>
        }
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

function ThemeToggle() {
  const { theme, dispatch } = useContext(AppContext);
  const handleChange = () => {
    dispatch({
      type: CHANGE_THEME,
      payload: null,
    });
  };
  return <Toggle checked={theme === 'dark'} onChange={handleChange} />;
}

export default ThemeToggle;
