import React from "react";

export const FormInput = React.forwardRef(
  (
    {
      id,
      icon,
      type = "text",
      selectOption = false,
      textarea = false,
      placeholder,
      disabled,
      defaultValue,
      optionData,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        {textarea ? (
          <div
            className={`bg-gradient-to-tr from-slate-50 to-slate-100 h-60 rounded-3xl flex gap-3 px-6 py-4 transition-all duration-300 ease-linear focus-within:ring-4 focus:ring-offset-2 focus-within:ring-blue-500 ring-2`}
          >
            {icon}
            <textarea
              id={id}
              ref={ref}
              className="bg-transparent h-full flex-1 outline-none text-slate-500 resize-none"
              placeholder={placeholder}
              disabled={disabled}
              defaultValue={defaultValue}
              {...rest}
            ></textarea>
          </div>
        ) : (
          <div
            className={`bg-gradient-to-tr from-slate-50 to-slate-100 h-24 rounded-full flex items-center gap-3 px-6 py-2 transition-all duration-300 ease-linear focus-within:ring-4 focus:ring-offset-2 focus-within:ring-blue-500 ring-2 justify-start`}
          >
            {icon}
            {selectOption ? (
              <select
                id={id}
                ref={ref}
                className="bg-transparent h-full capitalize flex-1 outline-none text-slate-500"
                disabled={disabled}
                {...rest}
              >
                {optionData}
              </select>
            ) : (
              <input
                id={id}
                ref={ref}
                type={type}
                className="bg-transparent h-full flex-1 outline-none text-slate-500"
                placeholder={placeholder}
                disabled={disabled}
                defaultValue={defaultValue}
                {...rest}
              />
            )}
          </div>
        )}
      </>
    );
  }
);

FormInput.displayName = "FormInput";
