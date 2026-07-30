import { asyncHandler } from "../middleware/asyncHandler.Middleware.js";

import {
  createOrder,
  createOrderItem,
  getAllOrders,
  getOrdersByUser,
  getOrderItems,
  getOrderById,
  updateOrderStatus,
} from "../model/orders.Model.js";

import { getCartByUser, clearCart } from "../model/cart.Model.js";

export const createOrderController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const {
    phone,

    address,

    delivery_address,

    shipping_address,

    paymentMethod,
  } = req.body;

  const orderAddress =
    address || delivery_address || shipping_address || "Not specified";

  const cartItems = await getCartByUser(userId);

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({
      message: "Cart is empty",
    });
  }

  const totalPrice = cartItems.reduce(
    (total, item) => {
      return total + Number(item.price) * item.quantity;
    },

    0,
  );

  const order = await createOrder(
    userId,

    totalPrice,

    phone,

    orderAddress,

    paymentMethod,
  );

  for (const item of cartItems) {
    await createOrderItem(
      order.id,

      item.product_id,

      item.quantity,

      item.price,
    );
  }

  await clearCart(userId);

  return res.status(201).json({
    message: "Order created successfully",

    order,
  });
});

export const getMyOrdersController = asyncHandler(async (req, res) => {
  const orders = await getOrdersByUser(req.user.id);

  for (const order of orders) {
    order.items = await getOrderItems(order.id);
  }

  res.status(200).json({
    orders,
  });
});

export const getAllOrdersController = asyncHandler(async (req, res) => {
  const orders = await getAllOrders();

  for (const order of orders) {
    order.items = await getOrderItems(order.id);
  }

  res.status(200).json({
    orders,
  });
});

export const getSingleOrderController = asyncHandler(async (req, res) => {
  const order = await getOrderById(
    req.params.id,

    req.user.id,
  );

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  order.items = await getOrderItems(order.id);

  res.status(200).json({
    order,
  });
});

export const acceptOrderController = asyncHandler(async (req, res) => {
  const order = await updateOrderStatus(
    req.params.id,

    "Accepted",

    "Your booking has been accepted",
  );

  res.status(200).json({
    message: "Order accepted successfully",

    order,
  });
});

export const rejectOrderController = asyncHandler(async (req, res) => {
  const { message } = req.body;

  const order = await updateOrderStatus(
    req.params.id,

    "Rejected",

    message,
  );

  res.status(200).json({
    message: "Order rejected successfully",

    order,
  });
});
