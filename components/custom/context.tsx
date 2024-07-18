import { createContext, ReactNode, useContext, useState } from "react";

interface IFormContext {
    handleClick: (direction: string) => void;
    step: number;
}
const FormContext = createContext<IFormContext>({
    handleClick: () => {},
    step: 0
});

const steps = [
  "identity",
  "responsibles",
  "salvation",
  "engagement",
  "complete",
];

export function FormProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<number>(0);

  const handleClick = (direction: string) => {
    let newStep = step;
    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep >= 0 && newStep <= steps.length && setStep(newStep);
  };

  return <FormContext.Provider value={{handleClick, step}}>{children}</FormContext.Provider>;
}

export function useFormState() {
    return useContext(FormContext)
}
