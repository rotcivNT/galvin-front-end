import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { UserSignUpInfo } from '~/types';

interface Props {
  id: any;
  placeholder?: string;
  type?: string;
  register: UseFormRegister<any>;
  options?: RegisterOptions;
  error?: boolean;
  errMsg?: string;
  disabled?: boolean;
}
function Input({ placeholder, id, type, register, options, error, errMsg, disabled }: Props) {
  return (
    <div className="mb-4">
      <input
        disabled={disabled}
        id={id}
        {...register(id, options)}
        className={`${
          error && 'border-red-500'
        } outline-none block px-5 py-1 border border-[#d9d9d9] font-bold font-mono placeholder:font-normal 
      placeholder:font-sans rounded-2xl w-full mb-1 h-10 focus:border-[#2f5acf] transition-all duration-200 text-[#231F20]`}
        type={type || 'text'}
        placeholder={placeholder}
      />
      {error && <p className="text-[#ff2459] font-medium text-sm mx-4">{errMsg}</p>}
    </div>
  );
}

export default Input;
