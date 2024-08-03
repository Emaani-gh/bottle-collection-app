"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RedirectPage = ({ params }) => {
  const { qrCodeId } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      // User is not authenticated, save QR code ID in local storage
      localStorage.setItem("pendingQRCode", qrCodeId);
      router.push("/login"); // Redirect to login page
    } else {
      setLoading(false);
    }
  }, [qrCodeId, session, status, router]);

  const handleRedeem = async () => {
    setRedeeming(true);
    try {
      await axios.post(`/api/redirect/${qrCodeId}`, {
        userId: session.user.id,
      });
      router.push("/dashboard"); // Redirect to the dashboard after redemption
    } catch (err) {
      setError("Error redeeming QR code");
      setRedeeming(false);
    }
  };

  if (loading) return <p className="text-center">Processing...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Redeem QR Code</h1>
        <p className="mb-4">Click the button below to redeem the QR code.</p>
        <button
          onClick={handleRedeem}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={redeeming}
        >
          {redeeming ? "Redeeming..." : "Redeem QR Code"}
        </button>
      </div>
    </div>
  );
};

export default RedirectPage;
