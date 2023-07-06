import React from 'react';
import AsyncSelect from 'react-select/async';

type OptionType = {
  value: string;
  label: string;
};

type Props =  {
  placeholder: string;
  styles: {
    readonly [key: string]: string;
  };
  loadOptions: (inputValue: string) => Promise<OptionType[]>;
}


export const MultiSelectInput: React.FC<Props> = ({ placeholder, styles, loadOptions }) => {
  return (
    <AsyncSelect
      className={styles.multyselect}
      isMulti
      loadOptions={loadOptions}
      isSearchable
      placeholder={placeholder}
    />
  );
};
