import React from 'react';
import Switch from 'react-switch';
import { StyledWrapper } from './styles';

type ToogleProps = {
  onChange: () => void;
  checked: boolean;
  left?: any;
  right?: any;
};

const Toggle = ({ onChange, checked, left, right }: ToogleProps) => {
  return (
    <StyledWrapper>
      <div>{left}</div>
      <Switch
        onChange={onChange}
        checked={checked}
        onColor="#888"
        checkedIcon={false}
        uncheckedIcon={false}
      />
      <div>{right}</div>
    </StyledWrapper>
  );
};

// export default Toggle;
export default React.memo(Toggle);
