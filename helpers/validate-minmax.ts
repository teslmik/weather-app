import { FieldValues, UseFormSetValue } from "react-hook-form";

export const validateMinMax = (formValues: FieldValues, setValue: UseFormSetValue<FieldValues>) => {
  if (formValues.min < -80) setValue('min', -80);
  else if (formValues.max > 80) setValue('max', 80);
  else if (formValues.min > formValues.max) setValue('min', formValues.max);
};
