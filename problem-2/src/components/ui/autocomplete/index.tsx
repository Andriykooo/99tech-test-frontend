import { ChangeEvent, ReactElement, useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { ArrowIcon } from "../icons/arrow.icon";

type AutocompleteProps<T> = {
  value: string;
  selectedOption: T;
  onChange?: (value: string) => void;
  onSelect: (option: T) => void;
  label?: string;
  options: (T & { id: string })[];
  renderOption: (option: T) => ReactElement | string;
  disabled?: boolean;
  className?: string;
};

const regex = /^\d*\.?\d*$/;

export const Autocomplete = <T,>({
  label,
  options,
  value,
  disabled,
  selectedOption,
  className,
  onChange,
  onSelect,
  renderOption,
}: AutocompleteProps<T>) => {
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (option: T) => {
    handleClose();
    onSelect?.(option);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (regex.test(value) && onChange) {
      onChange(value);
    }
  };

  const handleToggle = () => {
    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  useClickOutside(autocompleteRef, handleClose);

  return (
    <div ref={autocompleteRef} className={className}>
      {label && (
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          id="price"
          name="price"
          type="text"
          placeholder="0.00"
          disabled={disabled}
          onChange={handleChange}
          value={value}
          className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div
          className="absolute inset-y-0 right-0 my-2 px-4 flex gap-2 items-center border-l cursor-pointer"
          onClick={handleToggle}
        >
          {renderOption(selectedOption)}
          <ArrowIcon className={open ? "rotate-180" : "rotate-0"} />
        </div>
        {open && (
          <ul className="absolute inset-x-0 z-10 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm">
            {options.map((option) => {
              return (
                <li
                  className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                  key={option.id}
                  onClick={() => {
                    handleSelect(option);
                  }}
                >
                  {renderOption(option)}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
