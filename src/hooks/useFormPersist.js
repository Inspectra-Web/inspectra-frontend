import { useEffect } from "react";

export function useFormPersist(key, watch, setValue) {
  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      Object.keys(parsed).forEach((field) => setValue(field, parsed[field]));
    }
  }, [key, setValue]);

  useEffect(() => {
    const subscription = watch((value) =>
      localStorage.setItem(key, JSON.stringify(value))
    );
    return () => subscription.unsubscribe();
  }, [key, watch]);
}
