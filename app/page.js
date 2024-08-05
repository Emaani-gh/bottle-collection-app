// pages/index.js
import Head from "next/head";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Recycling for a Better Future</title>
        <meta
          name="description"
          content="Recycle your plastic bottles and contribute to a sustainable future."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-gray-800">
            Recycling System
          </a>
          <nav className="flex space-x-4">
            <a href="#features" className="text-gray-800">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-800">
              How It Works
            </a>
            <a href="#testimonials" className="text-gray-800">
              Testimonials
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Recycling for a Better Future
          </h1>
          <p className="mt-4 text-gray-600">
            Recycle your plastic bottles and contribute to a sustainable future.
          </p>
          <a
            href="#features"
            className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded-full"
          >
            Get Started
          </a>
        </section>

        <section id="features" className="mt-20">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Features
          </h2>
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800">Easy to Use</h3>
                <p className="mt-2 text-gray-600">
                  Simple and intuitive interface for hassle-free recycling.
                </p>
              </div>
            </div>
            <div className="w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Track Your Progress
                </h3>
                <p className="mt-2 text-gray-600">
                  Monitor the number of bottles recycled and rewards earned.
                </p>
              </div>
            </div>
            <div className="w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Redeem Rewards
                </h3>
                <p className="mt-2 text-gray-600">
                  Get rewarded for your efforts with redeemable points.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mt-20">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            How It Works
          </h2>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              1. Scan the barcode on your bottles.
            </p>
            <p className="text-gray-600 mt-2">
              2. Drop them in the designated collection bin.
            </p>
            <p className="text-gray-600 mt-2">
              3. Earn points and redeem rewards!
            </p>
          </div>
        </section>

        <section id="testimonials" className="mt-20">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Testimonials
          </h2>
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-gray-600">
                  "This system makes recycling so easy and rewarding!"
                </p>
                <p className="mt-4 text-gray-800 font-bold">- John Doe</p>
              </div>
            </div>
            <div className="w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-gray-600">
                  "I love being able to track my progress and see my impact."
                </p>
                <p className="mt-4 text-gray-800 font-bold">- Jane Smith</p>
              </div>
            </div>
            <div className="w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-gray-600">
                  "The rewards program is a great incentive to keep recycling!"
                </p>
                <p className="mt-4 text-gray-800 font-bold">- Emily Johnson</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white shadow mt-20">
        <div className="container mx-auto px-6 py-4 text-center">
          <p className="text-gray-800">
            &copy; 2024 Recycling System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
