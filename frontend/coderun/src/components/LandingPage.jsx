import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              className="w-12 h-10"
              src="/codelogo-removebg-preview.png"
              alt="CodeRun Logo"
            />
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              CodeRun
            </span>
          </div>
        </nav>
      </motion.header>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 opacity-60">
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none">
            <motion.path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="none"
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="0.5"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Your Personal{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Code Compiler
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Write, compile, and run code in multiple languages. No setup
            required. Start coding in seconds.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/app"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block">
                Try Now
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* Feature Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 bg-gray-50 border-b">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="p-8">
              <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                <code>{`function greet() {
  console.log("Hello, CodeRun!");
}

greet(); // Output: Hello, CodeRun!`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to code efficiently
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built for developers who want to focus on writing code, not
              setting up environments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <img
                className="w-5 h-5"
                src="/codelogo-removebg-preview.png"
                alt="CodeRun Logo"
              />
              <span className="text-gray-900 font-medium text-xs">CodeRun</span>
            </div>
            <div className="text-gray-500 text-xs">© 2024 CodeRun</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "Multiple Languages",
    description:
      "Support for JavaScript, Python, Java, and C++. More coming soon.",
    icon: <i className="fas fa-code text-blue-500 text-xl" />,
  },
  {
    title: "Real-time Compilation",
    description: "Instant feedback with real-time compilation and execution.",
    icon: <i className="fas fa-bolt text-blue-500 text-xl" />,
  },
  {
    title: "Share Code",
    description: "Easily share your code snippets with others.",
    icon: <i className="fas fa-share-nodes text-blue-500 text-xl" />,
  },
];

export default LandingPage;
