import React from "react";
import Label from "../auth/Label/Label";
import Select from "react-select";
import { customStyles } from "@/public/db";

type TOption = {
  id: any;
  value: string | number;
  label: string;
};

type TSelectBox = {
  title: string;
  register: any;
  errors: any;
  name: string;
  options: TOption[];
  dateName?: string;
  disable?: boolean;
  multiple?: boolean;
  selected?: any;
  onSelected?: any;
  placeholder?: string;
  defaultValue?: any; // ✅ اضافه شد
};

function SelectBox({
  title,
  register,
  errors,
  name,
  options,
  dateName,
  disable,
  multiple,
  selected,
  onSelected,
  placeholder = "placeholder",
  defaultValue, // ✅ اضافه شد
}: TSelectBox) {
  // ========== حالت غیر چندگانه (select معمولی) ==========
  if (!multiple) {
    // مقدار پیش‌فرض: اولویت با defaultValue، سپس selected
    const defaultVal = defaultValue || selected || "";

    return (
      <div className="flex w-full flex-col gap-y-3 text-white relative">
        <Label title={title} className="!text-base md:!text-lg min-h-[28px]" />
        <div
          className={`bg-[#121212] h-[52px] px-2.5 rounded-xl flex items-center justify-between gap-x-2`}
        >
          <select
            disabled={disable}
            className="bg-[#121212] outline-none w-full text-sm md:text-base"
            {...register(`${name}`)}
            name={name}
            defaultValue={defaultVal} // ✅ مقداردهی
          >
            {dateName ? (
              <option value="">{dateName}</option>
            ) : (
              <option value="">گزینه مورد نظر را انتخاب کنید</option>
            )}
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {errors[name] && (
          <span className="absolute top-24 text-xs md:text-sm text-red-600">
            {errors[name].message}
          </span>
        )}
      </div>
    );
  }

  // ========== حالت چندگانه (react-select) ==========
  const handleSelectChange = (e: any) => {
    if (onSelected) {
      onSelected(e);
    }
  };

  // پیدا کردن مقدار پیش‌فرض برای react-select
  const getDefaultValue = () => {
    if (selected) return selected;
    if (defaultValue) {
      if (Array.isArray(defaultValue)) {
        return options.filter((opt) => defaultValue.includes(opt.value));
      }
      return options.find((opt) => opt.value === defaultValue);
    }
    return null;
  };

  return (
    <div className="flex w-full flex-col gap-y-3 relative">
      <Label
        title={title}
        className="!text-base md:!text-lg min-h-[28px] text-white"
      />

      <Select
        defaultValue={getDefaultValue()}
        className="w-full"
        classNamePrefix="react-select"
        isMulti={multiple}
        noOptionsMessage={() => "موردی یافت نشد"}
        options={options}
        onChange={handleSelectChange}
        placeholder={placeholder}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 14,
          colors: {
            ...theme.colors,
            primary: "#121212",
            primary25: "#1a1a2e",
            primary50: "#121212",
            neutral0: "#000000",
            neutral5: "#1a1a2e",
            neutral10: "#2a2a4e",
            neutral20: "#333333",
            neutral30: "#444444",
            neutral40: "#888888",
            neutral50: "#aaaaaa",
            neutral80: "#ffffff",
          },
        })}
      />
    </div>
  );
}

export default SelectBox;