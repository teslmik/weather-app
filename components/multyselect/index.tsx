"use client";

import React from "react";
import { MultiValue } from "react-select";
import AsyncSelect from "react-select/async";
import { OptionType } from "@/types/options.type";

type Props = {
  placeholder: string;
  styles: {
    readonly [key: string]: string;
  };
  loadOptions: (inputValue: string) => Promise<OptionType[]>;
  onChange: (selectedOptions: OptionType[]) => void;
};

export const MultySelectInput: React.FC<Props> = ({
  placeholder,
  styles,
  loadOptions,
  onChange,
}) => {
  const handleChange = async (selected: MultiValue<OptionType> = []) => {
    const selectedOptions = selected as OptionType[];
    onChange(selectedOptions);
  };

  return (
    <AsyncSelect
      className={styles.multyselect}
      isMulti
      loadOptions={loadOptions}
      isSearchable
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};
