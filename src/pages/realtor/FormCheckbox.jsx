import React from "react";

export const FormCheckbox = React.forwardRef(({ label, id, ...props }, ref) => {
  return (
    <div className="flex gap-5">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="cursor-pointer w-8 h-8 focus:accent-blue-500"
        {...props}
      />
      <label
        htmlFor={id}
        className="text-2xl cursor-pointer font-semibold text-slate-500"
      >
        {label}
      </label>
    </div>
  );
});

FormCheckbox.displayName = "FormCheckbox";
