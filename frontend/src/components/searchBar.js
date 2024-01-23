import React from "react";
import { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import useAutocomplete from "@mui/material/useAutocomplete";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import Suggestion from "./suggestion";

const Search = styled("div")(() => ({
  borderRadius: "5px",
  backgroundColor: "#fefefe",
  position: "relative",
  "&:hover": {
    backgroundColor: alpha("#fefefe", 0.85),
  },
}));

const CloseIconWrapper = styled("div")(() => ({
  position: "absolute",
  height: "100%",
  right: 0,
  top: 0,
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    cursor: "pointer",
  },
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: "inherit",
  width: "100%",
  paddingLeft: "0px",
  paddingRight: "40px",
  height: "100%",
}));

const StyledSubInputBase = styled(InputBase)(() => ({
  color: "inherit",
  width: "100%",
  height: "100%",
}));

const Listbox = styled("ul")(() => ({
  width: "100%",
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: "#f1f1f1",
  overflow: "auto",
  maxHeight: 200,
  borderRadius: "0 0 10px 10px",
  border: "1px solid rgba(0,0,0,.25)",
  "& li": { textAlign: "left", paddingLeft: "10px" },
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

const SearchBar = ({
  value,
  onChange,
  placeholder,
  onCancelResearch,
  onClick,
  onSearch,
  className,
  disabled,
  options,
}) => {
  const [internalValue, setInternalValue] = useState(value || "");

  const { getRootProps, getInputProps, getListboxProps, groupedOptions } =
    useAutocomplete({
      id: "use-autocomplete",
      freeSolo: true,
      options: options || [],
    });

  const handleChange = (e) => {
    setInternalValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleCancel = () => {
    setInternalValue("");
    if (onCancelResearch) {
      onCancelResearch(internalValue);
    }
  };

  const handleClickOption = (e) => {
    setInternalValue(e.target.textContent);
    if (onChange) {
      onChange(e.target.textContent);
    }
    if (onSearch) return onSearch(e.target.textContent);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13 || (e.code === "Enter" && onSearch)) {
      onSearch();
    } else if (e.keyCode === 27 || e.code === "Escape") {
      handleCancel();
    }
  };

  const handleClick = (e) => {
    onClick();
  };

  return (
    <>
      <Search
        {...getRootProps()}
        key={"SearchBarComponent-root"}
        className={`SearchBarComponent-root ${className ? className : null}`}
      >
        {!disabled ? (
          <StyledInputBase
            key={"StyledInputBase"}
            className="outline-none focus:border-none focus:outline-none"
            inputProps={{
              ...getInputProps(),
              onChange: handleChange,
              value: internalValue,
            }}
            placeholder={placeholder || "Search"}
            onKeyUp={handleKeyUp}
            disabled={disabled}
            autoFocus
          />
        ) : (
          <StyledSubInputBase
            key={"StyledSubInputBase"}
            className="outline-none focus:border-none focus:outline-none"
            inputProps={{
              ...getInputProps(),
              onChange: handleChange,
              onClick: handleClick,
              value: internalValue,
            }}
            placeholder={placeholder || "Search"}
            onKeyUp={handleKeyUp}
            disabled={disabled}
          />
        )}

        {internalValue && !disabled ? (
          <CloseIconWrapper key={"CloseIconWrapper"} onClick={handleCancel}>
            <CloseIcon />
          </CloseIconWrapper>
        ) : null}

        {!disabled && groupedOptions.length > 0 && internalValue.length ? (
          <Listbox {...getListboxProps()} key={"ListboxOptions"}>
            {groupedOptions.map((option, index) => (
              <Suggestion
                key={index}
                threadId={option.threadId}
                linkImg={option.avatarUrl}
                name={option.author}
                title={option.title}
                onClick={handleClickOption}
              />
            ))}
          </Listbox>
        ) : null}
      </Search>
    </>
  );
};

SearchBar.propTypes = {
  // custom top-level class
  className: PropTypes.string,
  // changes the default width of component
  width: PropTypes.node,
  // changes the default height of component
  height: PropTypes.node,
  // override the placeholder
  placeholder: PropTypes.string,
  // value of input text field
  value: PropTypes.string,
  // fired when input value changes
  onChange: PropTypes.func,
  // fired when the search is canceled
  onCancelResearch: PropTypes.func,
  // fired when press enter
  onSearch: PropTypes.func,
  // override styles of the root element
  onClick: PropTypes.func,
  style: PropTypes.object,
  // disable text field
  disabled: PropTypes.bool,
  //options of autocomplete suggests
  options: PropTypes.array,
};

export default SearchBar;
