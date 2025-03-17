import React from "react";
import { useEffect, useState } from "react";
// import { EditorView } from "@codemirror/view";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { basicSetup } from "codemirror";
import { history } from "@codemirror/commands";
import { EditorState } from "@codemirror/state";
import CodeMirror from "@uiw/react-codemirror";
import { motion } from "framer-motion";

const Header = () => (
  <motion.header
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="flex items-center p-2 sm:p-4 bg-white shadow-sm">
    <div className="font-bold text-xl flex items-center gap-2">
      <img
        className="w-12 h-10 sm:w-16 sm:h-14 object-cover rounded"
        src="/codelogo-removebg-preview.png"
        placeholder="logo"
      />
      <div className="flex flex-col">
        <h1 className="text-xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
          CodeRun
        </h1>
        <span className="text-xs sm:text-sm text-gray-500 font-light -mt-1">
          Code Compiler
        </span>
      </div>
    </div>
  </motion.header>
);

const Sidebar = ({ language, setLanguage }) => {
  const languages = [
    { id: "javascript", img: "/icons/javascript.png", alt: "JavaScript" },
    { id: "java", img: "/icons/java.png", alt: "Java" },
    { id: "cpp", img: "/icons/cpp.png", alt: "C++" },
    { id: "python", img: "/icons/python.png", alt: "Python" },
  ];
  return (
    <motion.aside
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-14 sm:w-20 bg-white flex flex-col items-center p-1 sm:p-2 space-y-2 shadow-sm">
      {languages.map((lang) => (
        <motion.button
          key={lang.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(lang.id)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
            language === lang.id
              ? "bg-blue-500 shadow-sm"
              : "bg-gray-50 hover:bg-gray-100"
          }`}>
          <img
            src={lang.img}
            alt={lang.alt}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </motion.button>
      ))}
    </motion.aside>
  );
};

const CodeEditor = ({ code, setCode, language }) => {
  // const extensions = [basicSetup, history(), javascript()];

  const getLanguageExtension = (lang) => {
    switch (lang) {
      case "javascript":
        return javascript();
      case "java":
        return java();
      case "cpp":
        return cpp();
      case "python":
        return python();
      default:
        return javascript();
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 bg-gray-200 p-4 border-r shadow-md rounded-lg">
      <CodeMirror
        className="border-none rounded-md overflow-hidden shadow-sm"
        value={code}
        height="100%"
        theme="dark"
        extensions={[basicSetup, history(), getLanguageExtension(language)]}
        onChange={(newValue) => setCode(newValue)}
      />
    </motion.div>
  );
};

const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"
    />
  </div>
);

const OutputPanel = ({ output, isLoading }) => {
  // Helper function to detect if output is an error
  const isError = (text) => {
    return (
      text.toLowerCase().includes("error") ||
      text.toLowerCase().includes("exception") ||
      text.toLowerCase().includes("failed")
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex-1 bg-gray-100 p-4 border-l shadow-md rounded-lg">
      {isLoading ? (
        <Spinner />
      ) : output ? (
        <motion.div
        
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`${
            isError(output) ? "bg-red-50 border border-red-200" : "bg-white"
          } p-4 rounded-md text-sm shadow-sm h-full overflow-auto`}>
          {isError(output) ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-red-500 font-medium pb-2 border-b border-red-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Compilation Error
              </div>
              <pre className="text-red-600 font-mono whitespace-pre-wrap break-words">
                {output}
              </pre>
            </div>
          ) : (
            <pre className="text-gray-700 font-mono whitespace-pre-wrap break-words">
              {output}
            </pre>
          )}
        </motion.div>
      ) : (
        <span className="text-gray-400">Run code to see output...</span>
      )}
    </motion.div>
  );
};

const Controls = ({ handleRunCode, code }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (err) {
      console.error("Clipboard write failed:", err);
    }
  };

  return (
    <div className="relative flex gap-1 sm:gap-2 p-1 sm:p-2 ml-auto">
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm px-1 sm:px-2 py-1 rounded-md transition-all duration-200"
          onClick={handleShare}>
          <i className="fa-solid fa-share-nodes px-1"></i>
          <span className="hidden sm:inline">Share</span>
        </motion.button>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5 border border-green-400/20">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="w-4 h-4 flex items-center justify-center bg-white/20 rounded-full">
              ✓
            </motion.span>
            <span className="font-medium">Code copied!</span>
          </motion.div>
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-500 hover:bg-blue-600 text-xs sm:text-sm text-white px-2 sm:px-5 py-1 rounded-md transition-all duration-200"
        onClick={handleRunCode}>
        RUN
      </motion.button>
    </div>
  );
};

const CodeRunApp = () => {
  const snippets = {
    javascript: `// JavaScript Example
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("World"));`,

    java: `// Java Example
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,

    cpp: `// C++ Example
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World!" << endl;
  return 0;
}`,

    python: `# Python Example
def greet(name):
    return "Hello, " + name + "!"
    
print(greet("World"))`,
  };

  const languageVersion = {
    javascript: "18.15.0",

    java: "15.0.2",

    cpp: "10.2.0",

    python: "3.10.0",
  };

  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [version, setVersion] = useState("18.15.0");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCode(snippets[language]);
    setVersion(languageVersion[language]);
  }, [language]);

  const handleRunCode = async () => {
    const codeBody = {
      language: language,
      version,
      code,
    };
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://coderun-0he1.onrender.com/api/code/code-execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(codeBody),
        }
      );
      const data = await response.json();
      setOutput(
        data.success ? (data.error ? data.error : data.output) : data.error
      );
    } catch (error) {
      setOutput("Error running code...");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearOutput = () => setOutput("");

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 p-2 gap-2">
        <Sidebar language={language} setLanguage={setLanguage} />
        <main className="flex flex-1 flex-col lg:flex-row gap-2">
          <motion.div
            layout
            className="flex-1 flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
            <Controls handleRunCode={handleRunCode} code={code} />
            <CodeEditor code={code} setCode={setCode} language={language} />
          </motion.div>
          <motion.div
            layout
            className="h-[40vh] lg:h-auto lg:w-[45%] flex flex-col gap-1 bg-white rounded-lg shadow-sm p-2">
            <div className="flex w-full ml-auto justify-between items-center">
              <h2 className="text-sm sm:text-md font-medium text-gray-700">
                OUTPUT
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm px-2 py-1 rounded-md transition-all duration-200"
                onClick={handleClearOutput}>
                CLEAR
              </motion.button>
            </div>
            <OutputPanel output={output} isLoading={isLoading} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default CodeRunApp;
