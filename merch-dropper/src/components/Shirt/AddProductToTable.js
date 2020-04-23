import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import addProduct from "./AddProduct";
import { useStyles } from "../Component-Styles/addProduct-styles.js";

export default function AddProductToTable(props) {
  const classes = useStyles();
  const [stores, setStores] = useState("");
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    storeID: 0
  });

  //fetch stores on mount of logged in user
  // get currently logged in user data from localstorage
  //GET userID from this endpoint /api/users/email
  // save the userID
  // GET stores associated from logged in user from endpoint of stores/userID
  //setStore to that list

  useEffect(() => {
    async function getStores() {
      const { email } = JSON.parse(localStorage.getItem("profile"));

      const res = await axios.get(
        `https://merchdropper-production.herokuapp.com/api/users/email/${email}`
      );
      console.log(res);
      const userID = res.data.id;
      const res2 = await axios.get(
        `https://merchdropper-production.herokuapp.com/api/stores/user/${userID}`
      );
      console.log(res2);
      setStores(res2.data);
    }
    getStores();
  }, []);

  const handleChange = event => {
    setProduct({
      ...product,
      storeID: stores.id,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    addProduct(props.garment, product);
    setTimeout(() => {
      props.history.push("/dashboard");
    }, 800);
  };
  console.log(props.garment);
  const shirtColor = props.garment.color;
  const shirtImage = props.garment.mockUrl;

  console.log(product);
  return (
    <div className={classes.addproductContainer}>
      <div className={classes.imgContainer}>
        <img
          src={shirtImage}
          className={classes.shirtImg}
          alt="shirt design preview"
        />
      </div>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            className={classes.createTitle}
            label="Create Title"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelText
              }
            }}
          />{" "}
          <TextField
            className={classes.price}
            label="$"
            name="price"
            value={product.price}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelText
              }
            }}
          />{" "}
          <TextField
            className={classes.desc}
            label="Add Product Description"
            name="description"
            multiline
            rows={5}
            value={product.description}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true
            }}
            InputLabelProps={{
              classes: {
                root: classes.labelText
              }
            }}
          />{" "}
          {/* <Typography
                              className={classes.productHeader}
                              variant="h3"
                              gutterBottom
                            >
                              Product:
                            </Typography>
                            <Typography className={classes.product} variant="body1" gutterBottom>
                              Unisex T - Shirt
                            </Typography> */}{" "}
          {/* <Typography className={classes.colorHeader} variant="h3" gutterBottom>
            Color:
          </Typography>{" "}
          <Typography className={classes.color} variant="body1" gutterBottom>
            {" "}
            {shirtColor}{" "}
          </Typography>{" "} */}
          {/* <TextField
                            select
                            className={classes.storeSelect}
                            name="storeID"
                            label="Select Store"
                            value={product.storeID}
                            onChange={handleChange}
                            InputProps={{ disableUnderline: true }}
                          >
                            {stores.map(store => (
                              <MenuItem key={store.id} value={store.id}>
                                {store.store_name}
                              </MenuItem>
                            ))}
                          </TextField> */}{" "}
          <Button
            variant="contained"
            className={classes.addButton}
            type="submit"
          >
            Add Product{" "}
          </Button>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}