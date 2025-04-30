import React, { createContext, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
export const ContainerContext = createContext();
const Container = ({ children, items, pagesizeProp, type }) => {
  const [pageSize, setPageSize] = useState(pagesizeProp);
  const [page, setPage] = useState(1);
  const [filterdValue, setFilterdValue] = useState("");
  const handleFilter = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setFilterdValue(value);
    setPage(1);
  };
  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    setPageSize(selectedValue);
  };
  const IncreasePageNumbering = () => {
    if (canIncreasePageNumbering) setPage(page + 1);
  };
  const decresePageNumbering = () => {
    if (page > 1) setPage(page - 1);
  };

  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  const filterdItems = items?.filter((it) =>
    it.name.trim().toLowerCase().includes(filterdValue)
  );
  const targetItems = filterdItems?.filter((p, index) => {
    return index >= start && index < end;
  });
  const canIncreasePageNumbering =
    Number.parseInt((filterdItems?.length - 1) / pageSize) + 1 !== page;
  const value = { targetItems, filterdValue, handleFilter, type };
  return (
    <ContainerContext.Provider value={value}>
      <div>
        {children}
        <div>
          <div>
            <label htmlFor="pagesize:">Page Size :</label>
            <select
              id="pagesize"
              className="form-select form-select-lg mt-1 mb-3 w-25"
              aria-label=".form-select-lg example"
              name="totalItems"
              onChange={handleSelect}
              value={pageSize}
            >
              <option value={pagesizeProp}>{pagesizeProp}</option>
              <option value={pagesizeProp * 2}>{pagesizeProp * 2}</option>
              <option value={pagesizeProp * 3}>{pagesizeProp * 3}</option>
            </select>
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={decresePageNumbering} disabled={page === 1}>
              <ArrowBackIosNewIcon />
            </button>
            <span style={{ margin: "10px" }}>{page}</span>
            <button
              onClick={IncreasePageNumbering}
              disabled={!canIncreasePageNumbering}
            >
              <ArrowForwardIosIcon />
            </button>
          </div>
        </div>
      </div>
    </ContainerContext.Provider>
  );
};

export default Container;
