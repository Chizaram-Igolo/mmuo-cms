import { ChangeEvent } from "react";

interface ITextInput {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onBlurFunc?: (e: React.FocusEvent<any, Element>) => void;
  onChangeFunc: (e: string | ChangeEvent<any>) => void;
}

const TextInput: React.FC<ITextInput> = ({
  type,
  name,
  placeholder,
  value,
  onBlurFunc,
  onChangeFunc,
  ...rest
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onBlur={onBlurFunc ? (e) => onBlurFunc(e) : () => {}}
      onChange={onChangeFunc}
      placeholder={placeholder}
      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-base shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    "
      {...rest}
    />
  );
};

export default TextInput;
