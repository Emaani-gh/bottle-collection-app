"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Spinner from "@/app/components/Spinner";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${session.user.id}`);
        setUser(res.data);
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Check for pending QR code in local storage
    const pendingQRCode = localStorage.getItem("pendingQRCode");
    if (pendingQRCode) {
      handleRedeem([pendingQRCode]);
      localStorage.removeItem("pendingQRCode"); // Clear the pending QR code
    }
  }, [session, status, router]);

  const handleRedeem = async (qrCodes) => {
    setRedeeming(true);
    setMessage(""); // Clear any existing messages

    try {
      const responses = await Promise.all(
        qrCodes.map((qrCodeId) =>
          axios.post(`/api/redirect/${qrCodeId}`, {
            userId: session.user.id,
          })
        )
      );

      const messages = responses.map((response) => response.data.message);
      const allSuccess = responses.every((response) => response.status === 200);

      if (allSuccess) {
        setMessage("All QR codes redeemed successfully!");
        // Fetch updated user data after successful redemption
        const res = await axios.get(`/api/users/${session.user.id}`);
        setUser(res.data);
      } else {
        setMessage(messages.join("\n"));
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Error redeeming QR codes");
      }
    } finally {
      setRedeeming(false);
    }
  };

  useEffect(() => {
    if (message) {
      alert(message);
      setMessage(""); // Clear the message after showing
    }
  }, [message]);

  const calculateCounter = () => {
    return user?.qrCodes.length || 0;
  };

  const calculateTotalAmount = () => {
    return user?.qrCodes
      .reduce((total, qrCode) => total + qrCode.unitPrice, 0)
      .toFixed(2);
  };

  const getUnitPrice = () => {
    return user?.qrCodes[0]?.unitPrice || 0;
  };

  const getLastTimestamp = () => {
    const lastQRCode = user?.qrCodes[user.qrCodes.length - 1];
    return lastQRCode
      ? new Date(lastQRCode.timestamp).toLocaleDateString()
      : "";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            User Information
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-600">
              <span className="font-semibold">First Name:</span>{" "}
              {user?.firstName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Last Name:</span> {user?.lastName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            QR Codes
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            {user?.qrCodes?.length > 0 ? (
              <div>
                <p className="text-lg font-semibold mb-4">
                  Total Items: {calculateCounter()}
                </p>
                <p className="text-lg font-semibold mb-4">
                  Total Amount: GHS {calculateTotalAmount()}
                </p>
                <p className="text-lg font-semibold mb-4">
                  Unit Price: GHS {getUnitPrice()}
                </p>
                <p className="text-lg font-semibold mb-4">
                  Last Transaction Date: {getLastTimestamp()}
                </p>
                {/* <ul className="space-y-4">
                  {user.qrCodes.map((qrCode, index) => (
                    <li
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                    >
                      <p className="text-gray-800">
                        <span className="font-semibold">Barcode:</span>{" "}
                        {qrCode?.barcode}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Counter:</span>{" "}
                        {qrCode?.counter}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Unit Price:</span>{" "}
                        {qrCode?.unitPrice}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Total Amount:</span>{" "}
                        {(qrCode?.counter * qrCode?.unitPrice).toFixed(2)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(qrCode?.timestamp).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul> */}
                <button
                  onClick={() => handleRedeem(user.qrCodes.map((qr) => qr._id))}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={redeeming}
                >
                  {redeeming ? <Spinner /> : "Redeem All QR Codes"}
                </button>
              </div>
            ) : (
              <p>No QR codes available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
