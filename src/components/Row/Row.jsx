import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import LazyLoadImagee from "../LazyLoadImage/LazyLoadImage";
import { Button } from "@mui/material";
import { removeCategory, retriveCategory } from "../../redux/categorySlice";
import { removeProduct, retriveProduct } from "../../redux/productSlice";
import { removeUnit, retriveUnit } from "../../redux/unitSlice";
const Row = ({
  type,
  item,
  index,
  setShowModal,
  setIsUpdateForm,
  dispatch,
}) => {
  // console.log(item);
  return (
    <tr>
      {type === "products" && (
        <>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.code}</td>
          <td>{item.price}</td>
          <td>{item.category.name}</td>
          <td>{item.unitOfMeasure.name}</td>
          <td>
            <LazyLoadImagee
              src={item.image}
              alt={item.name}
              width={70}
              height={70}
            />
          </td>

          <td style={{ color: "#9c27b0" }}>
            <Button
              onClick={async () => {
                await dispatch(retriveProduct(item._id));
                setShowModal(true);
                setIsUpdateForm(true);
              }}
            >
              <EditIcon />
            </Button>
          </td>
          <td>
            <Button
              onClick={async () => {
                await dispatch(removeProduct(item._id));
              }}
            >
              <DeleteOutlineIcon />
            </Button>
          </td>
        </>
      )}
      {type === "categories" && (
        <>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>
            <LazyLoadImagee
              src={item.image}
              alt={item.name}
              width={70}
              height={70}
            />
          </td>
          <td>
            <Button
              onClick={async () => {
                await dispatch(retriveCategory(item._id));
                setShowModal(true);
                setIsUpdateForm(true);
              }}
            >
              <EditIcon />
            </Button>
          </td>
          <td>
            <Button
              onClick={async () => {
                await dispatch(removeCategory(item._id));
              }}
            >
              <DeleteOutlineIcon />
            </Button>
          </td>
        </>
      )}
      {type === "units" && (
        <>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.baseUnit}</td>
          <td>{item.conversionFactor}</td>
          <td>
            <Button
              onClick={async () => {
                await dispatch(retriveUnit(item._id));
                setShowModal(true);
                setIsUpdateForm(true);
              }}
            >
              <EditIcon />
            </Button>
          </td>
          <td>
            <Button
              onClick={async () => {
                await dispatch(removeUnit(item._id));
              }}
            >
              <DeleteOutlineIcon />
            </Button>
          </td>
        </>
      )}
    </tr>
  );
};

export default Row;
