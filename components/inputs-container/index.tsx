'use client';

import React from 'react'
import { MultySelectInput } from '../multyselect'
import { fetchSearchByCountry } from '@/services/fetch-search-country';

import styles from './styles.module.css';

export const InputsContainer = () => {
  return (
    <div className={styles.inputsContainer}>
      <MultySelectInput placeholder='Country' styles={styles} loadOptions={fetchSearchByCountry} />
      <MultySelectInput placeholder='Min' styles={styles} loadOptions={fetchSearchByCountry} />
      <MultySelectInput placeholder='Max' styles={styles} loadOptions={fetchSearchByCountry} />
    </div>
  )
}
