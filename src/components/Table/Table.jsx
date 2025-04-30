import { useTheme } from "@emotion/react";
import React, { useContext } from "react";
import { ContainerContext } from "../Containerr/Container";
import Row from "../Row/Row";
import { Box } from "@mui/material";

const Table = ({
  setShowModal,
  setIsUpdateForm,
  setUpdatedItemId,
  dispatch,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { targetItems, type } = useContext(ContainerContext);
  const displayProducts = () => {
    return targetItems.map((p, index) => (
      <Row
        key={p._id}
        item={p}
        index={index}
        type={type}
        setShowModal={setShowModal}
        setIsUpdateForm={setIsUpdateForm}
        setUpdatedItemId={setUpdatedItemId}
        dispatch={dispatch}
      />
    ));
  };
  return (
    <Box
      sx={{
        m: 1,
        p: 1,
        boxShadow: 3,
        width: "100%",
        overflow: "auto",
      }}
    >
      <table
        className="table"
        style={isDark ? { color: "white" } : { color: "black" }}
      >
        {targetItems && (
          <>
            <thead>
              <tr key={Math.random()}>
                <th>#</th>
                {targetItems[0] &&
                  Object.keys(targetItems[0]).map(
                    (key, i) =>
                      key !== "_id" &&
                      key !== "__v" && <th key={Math.random()}>{key}</th>
                  )}
                <th>update</th>
                <th>remove</th>
              </tr>
            </thead>
            <tbody>{displayProducts()}</tbody>
          </>
        )}
      </table>
    </Box>
  );
};

export default Table;
