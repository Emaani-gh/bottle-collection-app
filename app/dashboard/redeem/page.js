import RedeemForm from "@/app/components/RedeemForm";

export default function RedeemPage({ searchParams }) {
  const totalAmount = searchParams.amount;

  return <RedeemForm totalAmount={totalAmount} />;
}
