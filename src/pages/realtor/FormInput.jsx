import React from "react";

export const FormInput = React.forwardRef(
  (
    { id, type = "text", defaultValue, placeholder, disabled, ...rest },
    ref
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        defaultValue={defaultValue}
        className="italic border-2 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:border-transparent transition-all duration-300 rounded-full h-20 px-10 placeholder:text-slate-500 text-slate-800 w-full"
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
    );
  }
);

FormInput.displayName = "FormInput";
