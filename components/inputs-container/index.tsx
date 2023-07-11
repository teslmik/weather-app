"use client";

import React from "react";
import useSWR from "swr";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MultySelectInput, TemperatureInput } from "@/components/components";
import { validateMinMax } from "@/helpers/validate-minmax";
import { fetchInitialData } from "@/services/fetch-initial-data";
import { fetchSearchByCountry } from "@/services/fetch-search-country";
import { FetchDataType, OptionType } from "@/types/types";

import styles from "./styles.module.css";

export const InputsContainer: React.FC = () => {
  const { data, mutate } = useSWR<FetchDataType | undefined>("weather");
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue
  } = useForm({ mode: "onChange" });

  const handleMultiSelectChange = async (
    selectedOptions: OptionType[] = []
  ) => {
    await mutate(
      fetchInitialData(
        selectedOptions.length === 0 ? undefined : selectedOptions
      )
    );
  };

  const handleOnChange: SubmitHandler<FieldValues> = (value) => {
    mutate(
      (prev) =>
      ({
        ...prev,
        filteredCities: prev?.cities.filter((city) => {
          const minTempCondition = !isNaN(value.min)
            ? city.minTemp >= value.min
            : true;
          const maxTempCondition = !isNaN(value.max)
            ? city.maxTemp <= value.max
            : true;
          return minTempCondition && maxTempCondition;
        }),
        activeIndex: 0
      } as FetchDataType)
    );
  };

  validateMinMax(watch(), setValue);

  React.useEffect(() => {
    if (data?.cities) {
      const minArr = data.cities.map((city) => Math.floor(city.minTemp));
      const maxArr = data.cities.map((city) => Math.ceil(city.maxTemp));
      const minTemp = Math.min(...minArr);
      const maxTemp = Math.max(...maxArr);

      setValue('min', minTemp);
      setValue('max', maxTemp);
    }
  }, [data?.cities, setValue]);

  return (
    <form
      className={styles.inputsContainer}
      onChange={handleSubmit(handleOnChange)}
    >
      <div className={styles.inputWrapper}>
        <label>Search by city</label>
        <MultySelectInput
          placeholder="City"
          styles={styles}
          loadOptions={fetchSearchByCountry}
          onChange={handleMultiSelectChange}
        />
      </div>
      <TemperatureInput
        label="Min"
        name="min"
        register={register}
      />
      <TemperatureInput
        label="Max"
        name="max"
        register={register}
      />
    </form>
  );
};
