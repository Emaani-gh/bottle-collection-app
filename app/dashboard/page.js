"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const sampleQrCodes = [
  { _id: "1", data: "Sample Data 1", createdAt: new Date().toISOString() },
  { _id: "2", data: "Sample Data 2", createdAt: new Date().toISOString() },
];

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [redeemingId, setRedeemingId] = useState(null);

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
  }, [session, status, router]);

  const handleRedeem = async (qrCodeId) => {
    setRedeemingId(qrCodeId);
    try {
      const res = await axios.post(`/api/redeem/${qrCodeId}`, {
        userId: session.user.id,
      });
      alert("QR code redeemed successfully!");
      // Optionally refresh the user data or redirect
      router.reload();
    } catch (err) {
      alert("Error redeeming QR code");
    } finally {
      setRedeemingId(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

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
            Sample QR Codes
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            {sampleQrCodes.length > 0 ? (
              <ul className="space-y-4">
                {sampleQrCodes.map((qrCode) => (
                  <li
                    key={qrCode._id}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                  >
                    <p className="text-gray-800">
                      <span className="font-semibold">Data:</span> {qrCode.data}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Created At:</span>{" "}
                      {new Date(qrCode.createdAt).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleRedeem(qrCode._id)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      disabled={redeemingId === qrCode._id}
                    >
                      {redeemingId === qrCode._id
                        ? "Redeeming..."
                        : "Redeem QR Code"}
                    </button>
                  </li>
                ))}
              </ul>
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
