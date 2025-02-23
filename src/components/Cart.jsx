import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);
  const [cartLength, setCartLength] = useState(0);

  const fetchCartById = async () => {
    try {
      const response = await axios.get(
        `http://bhartiyabiotech.ap-south-1.elasticbeanstalk.com/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setCartLength(response.data.varient_quantity.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken && userId) {
      fetchCartById();
    }
  }, [authToken, userId, cartLength]);

  return (
    <div className="cart">
      <Link className="flex items-center" to="/cart">
        <span className="cart-icon">
          <FaShoppingCart />
        </span>
        <span className="cart-count mt-[-15px]">{cartLength}</span>
      </Link>
    </div>
  );
};

export default Cart;
