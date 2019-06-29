import React from 'react';
import Select from 'react-select';

const SelectList = ({ values, onChange, value }) => {
  const options = values.map(e => ({
    value: e.id,
    label: e.name
  }));
  

  return (
    <div className="select">
      <Select
        options={options}
        // isClearable={true}
        defaultValue={options.find(e => e.value === value)}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectList;
