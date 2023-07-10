'use client';

import React from "react";
import { MultySelectInput } from "../multyselect";
import { fetchSearchByCountry } from "@/services/fetch-search-country";

import styles from "./styles.module.css";
import { OptionType } from "@/types/options.type";
import useSWR from "swr";
import { fetchInitialData } from "@/services/fetch-initial-data";

export const InputsContainer = () => {
  const { mutate } = useSWR('weather');

  const handleMultiSelectChange = async (selectedOptions: OptionType[]) => {
    await mutate(fetchInitialData(selectedOptions));
  };

  return (
    <div className={styles.inputsContainer}>
      <MultySelectInput
        placeholder="Country"
        styles={styles}
        loadOptions={fetchSearchByCountry}
        onChange={handleMultiSelectChange}
      />
      <MultySelectInput
        placeholder="Min"
        styles={styles}
        loadOptions={fetchSearchByCountry}
        onChange={handleMultiSelectChange}
      />
      <MultySelectInput
        placeholder="Max"
        styles={styles}
        loadOptions={fetchSearchByCountry}
        onChange={handleMultiSelectChange}
      />
    </div>
  );
};
