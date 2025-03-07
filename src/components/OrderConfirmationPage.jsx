import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderConfirmationPage = () => {
    const orderDetails = useSelector((state) => state.order.orderDetails);

    if (!orderDetails) {
        return <div className="container mx-auto p-4 text-center text-gray-700">No order details found.</div>;
    }

    const { cartItems, shippingInfo, total, paymentMethod, totalSavings } = orderDetails;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Order Confirmation</h2>
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Order Details</h3>
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-700">Items:</h4>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between py-2 border-b">
                            <div className="flex items-center flex-1">
                                <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-contain mr-4" />
                                <span>{item.title} x {item.quantity}</span>
                            </div>
                            <div className=" text-right flex-col  items-center">
                                <span className='line-through block'>Rs .{(item.varients[0].price * item.quantity).toFixed(2)}</span>
                                <span>Save Rs .{(item.varients[0].discount * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-700">Shipping Information:</h4>
                    <p>{shippingInfo.name}</p>
                    <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.postalCode}</p>
                    <p>{shippingInfo.phone}</p>
                    <p>{shippingInfo.email}</p>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-700 mb-4">
                    <span>Total:</span>
                    <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-green-500 mb-4">
                    <span>Total Savings:</span>
                    <span>₹{totalSavings}</span>
                </div>
                <div className="mb-4">
                    <h4 className="font-semibold text-gray-700">Payment Method:</h4>
                    <p>{paymentMethod}</p>
                </div>
                <Link to="/" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 text-center inline-block">Go to Home</Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
