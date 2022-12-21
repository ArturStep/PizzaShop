import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { MdClose, MdSearch } from "react-icons/md";
import debounce from "lodash.debounce";

import { setSearchValue } from "../../redux/Filter/slice";

import s from "./Search.module.scss";

const Search: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 350),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={s.root}>
      <MdSearch className={s.search} />
      <input
        className={s.input}
        placeholder={"Введите название..."}
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
      />
      <MdClose className={s.clear} onClick={onClickClear} />
    </div>
  );
};

export default Search;
