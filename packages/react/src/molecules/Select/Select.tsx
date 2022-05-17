import React, { createRef, useEffect, useState } from "react";

import Text from "../../atoms/Text";

interface SelectOption {
  label: string;
  value: string;
}

export interface RenderOptionProps {
  isSelected: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

export interface SelectProps {
  options?: SelectOption[];
  placeHolder?: string;
  onSelect?: (option: SelectOption, optionIndex: number) => void;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

export const KEY_CODES = {
  ENTER: 13,
  SPACE: 32,
  DOWN_ARROW: 40,
  ESC: 27,
  UP_ARROW: 38,
};

const getPreviousOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === 0) {
    return options.length - 1;
  }

  return currentIndex - 1;
};

const getNextOptionIndex = (
  currentIndex: number | null,
  options: Array<SelectOption>
) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === options.length - 1) {
    return 0;
  }

  return currentIndex + 1;
};

const Select: React.FC<SelectProps> = ({
  options = [],
  placeHolder = "Please select an option",
  onSelect,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<undefined | number>();
  const [highlightedIndex, setHighlightedIndex] = useState<null | number>(null);
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);

  const handleSelect = (option: SelectOption, optionIndex: number) => {
    if (onSelect) onSelect(option, optionIndex);

    setSelected(optionIndex);
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const highlightOption = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  const onButtonKeyDown: React.KeyboardEventHandler = (event) => {
    event.preventDefault();

    if (
      [KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(
        event.keyCode
      )
    ) {
      setIsOpen(true);

      // set focus on the list item
      highlightOption(0);
    }
  };

  const onOptionKeyDown: React.KeyboardEventHandler = (event) => {
    if (event.keyCode === KEY_CODES.ESC) {
      setIsOpen(false);

      return;
    }

    if (event.keyCode === KEY_CODES.DOWN_ARROW) {
      highlightOption(getNextOptionIndex(highlightedIndex, options));
    }

    if (event.keyCode === KEY_CODES.UP_ARROW) {
      highlightOption(getPreviousOptionIndex(highlightedIndex, options));
    }

    if (event.keyCode === KEY_CODES.ENTER) {
      handleSelect(options[highlightedIndex!], highlightedIndex!);
    }
  };

  useEffect(() => {
    setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
  }, [options.length]);

  useEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];

      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightedIndex]);

  return (
    <div className="dse-select">
      <button
        data-testid="DseSelectButton"
        aria-controls="dse-select-list"
        aria-haspopup
        aria-expanded={isOpen || undefined}
        className="dse-select__label"
        onClick={handleButtonClick}
        onKeyDown={onButtonKeyDown}
      >
        <Text>
          {selected !== undefined ? options[selected].label : placeHolder}
        </Text>
        <svg
          className={`dse-select__caret ${
            isOpen ? "dse-select__caret--open" : "dse-select__caret--closed"
          }`}
          width="1rem"
          height="1rem"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen ? (
        <ul className="dse-select__overlay" id="dse-select-list" role="menu">
          {options.map((option, optionIndex) => {
            const isSelected = optionIndex === selected;
            const isHighlighted = highlightedIndex === optionIndex;

            const ref = optionRefs[optionIndex];

            const renderOptionProps = {
              ref,
              option,
              isSelected,
              getOptionRecommendedProps: (overrideProps = {}) => {
                return {
                  ref,
                  role: "menuitemradio",
                  "aria-label": option.label,
                  "aria-checked": isSelected || undefined,
                  onKeyDown: onOptionKeyDown,
                  tabIndex: isHighlighted ? -1 : 0,
                  onMouseEnter: () => highlightOption(optionIndex),
                  onMouseLeave: () => highlightOption(null),
                  className: `dse-select__option
                      ${isSelected ? "dse-select__option--selected" : ""}
                      ${isHighlighted ? "dse-select__option--highlighted" : ""}
                  `,
                  key: option.value,
                  onClick: () => handleSelect(option, optionIndex),
                  ...overrideProps,
                };
              },
            };

            if (renderOption) {
              return renderOption(renderOptionProps);
            }

            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>

                {isSelected ? (
                  <svg
                    width="1rem"
                    height="1rem"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Select;
