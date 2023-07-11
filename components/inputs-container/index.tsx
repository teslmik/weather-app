"use client";

import { validateMinMax } from "@/helpers/validate-minmax";
import { fetchInitialData } from "@/services/fetch-initial-data";
import { fetchSearchByCountry } from "@/services/fetch-search-country";
import { FetchDataType } from "@/types/fetch-data.type";
import { OptionType } from "@/types/options.type";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { TemperatureInput } from "../input";
import { MultySelectInput } from "../multyselect";

import styles from "./styles.module.css";

export const InputsContainer = () => {
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

  const formValues = watch();


  validateMinMax(formValues, setValue);

  React.useEffect(() => {
    if (data?.cities) {
      const minTemp = Math.min(
        ...data.cities.map((city) => Math.floor(city.minTemp))
      );
      const maxTemp = Math.max(
        ...data.cities.map((city) => Math.ceil(city.maxTemp))
      );

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
        errors={errors}
        formValues={formValues}
      />
      <TemperatureInput
        label="Max"
        name="max"
        register={register}
        errors={errors}
        formValues={formValues}
      />
      {/* <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="number"
          {...register("min", {
            valueAsNumber: true,
            min: -80,
            max: 80,
          })}
          placeholder="Min"
        />
        <div className={styles.inputError}>
          {errors?.min?.type === "min" && <p>Min temperature -80!</p>}
          {errors?.min?.type === "max" && <p>Max temperature +80</p>}
          {!!formValues.min && !isInputValid && <p>Error! Min {">"} Max</p>}
        </div>
      </div>

      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="number"
          {...register("max", {
            valueAsNumber: true,
            min: -80,
            max: 80,
          })}
          placeholder="Max"
        />
        <div className={styles.inputError}>
          {errors?.max?.type === "min" && <p>Min temperature -80!</p>}
          {errors?.max?.type === "max" && <p>Max temperature +80</p>}
          {!!formValues.max && !isInputValid && <p>Error! Min {">"} Max</p>}
        </div>
      </div> */}
    </form>
  );
};
