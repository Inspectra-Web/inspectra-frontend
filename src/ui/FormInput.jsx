import React from "react";

export const FormInput = React.forwardRef(
  (
    {
      id,
      icon,
      type = "text",
      selectOption = false,
      textarea = false,
      isRadio = false,
      placeholder,
      disabled,
      defaultValue,
      radioDefault = "true",
      optionData,
      ...rest
    },
    ref
  ) => {
    if (textarea)
      return (
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
      );

    if (isRadio)
      return (
        <div className="bg-gradient-to-tr from-slate-50 to-slate-100 rounded-3xl flex gap-3 px-6 py-4 transition-all duration-300 ease-linear focus-within:ring-4 focus:ring-offset-2 focus-within:ring-blue-500 ring-2">
          {icon && <div className="flex items-center gap-2">{icon}</div>}
          <div className="flex gap-6">
            {optionData?.map((opt) => (
              <label
                key={opt.value}
                htmlFor={opt.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  id={opt.value}
                  type="radio"
                  value={String(opt.value)}
                  ref={ref}
                  name={id}
                  disabled={disabled}
                  defaultChecked={String(opt.value) === String(radioDefault)}
                  {...rest}
                />
                <span className="capitalize text-slate-500">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      );

    return (
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
    );
  }
);

FormInput.displayName = "FormInput";
