import { ChangeEvent } from "react";

const Input = ({type,onClick,placeholder,label,value}:{type:string,placeholder:string,value:string,onClick:(e:ChangeEvent<HTMLInputElement>)=>void,label:string}) => {
     

  return (
    <div>
      <label
        htmlFor={type}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}     </label>
      <input
        type={type.startsWith("confirm") ? "password" : type}
        name={type}
        id={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={onClick}
        value={value}
      />
    </div>
  );
};

export {Input};
