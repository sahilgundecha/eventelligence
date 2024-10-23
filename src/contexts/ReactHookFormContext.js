import { createContext } from 'react';
import { useForm } from 'react-hook-form';

export const ReactHookForm = createContext();

export const HookFormProvider = ({ children }) => {
  const formMethods = useForm();

  return (
    <ReactHookForm.Provider value={{ formMethods }}>
      {children}
    </ReactHookForm.Provider>
  );
};
