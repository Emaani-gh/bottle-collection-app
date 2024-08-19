"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RedeemForm = ({ totalAmount }) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(totalAmount);
  const [paymentMethod, setPaymentMethod] = useState("MTN MoMo");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Logic for handling the redemption
    console.log("Redeem Details", {
      firstName,
      lastName,
      phoneNumber,
      amount,
      paymentMethod,
    });

    // Redirect to a success page or handle the form submission
    router.push("/redeem-success");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Redeem Your QR Codes
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Amount to Redeem</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              disabled
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="MTN MoMo">MTN MoMo</option>
              <option value="Telecel Cash">Telecel Cash</option>
              <option value="AT Cash">AT Cash</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Process
          </button>
        </form>
      </div>
    </div>
  );
};

export default RedeemForm;
