'use client';

import React from 'react'
import { MultiSelectInput } from '../multiselect'

import styles from './styles.module.css';

type OptionType = {
  value: string;
  label: string;
};

const searchUrl = (value: string) => (
  `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=10&language=en&format=json`
);

export const InputsContainer = () => {
  const loadOptions = async (inputValue: string): Promise<OptionType[]> => {
    const response = await fetch(searchUrl(inputValue));
    const data = await response.json();
    console.log('data: ', data);
    const options = data.results.map((item: any) => ({ value: item.name, label: `${item.name}, ${item.country}` }));
    console.log('options: ', options);

    return options;
  };

  return (
    <div className={styles.inputsContainer}>
      <MultiSelectInput placeholder='Country' styles={styles} loadOptions={loadOptions} />
      <MultiSelectInput placeholder='Min' styles={styles} loadOptions={loadOptions} />
      <MultiSelectInput placeholder='Max' styles={styles} loadOptions={loadOptions} />
    </div>
  )
}
