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

const Header = () => (
  <header className="flex items-center p-4 bg-white shadow-md">
    <div className="font-bold text-xl flex items-center gap-2">
      <img
        className="w-15 h-12  rounded"
        src="/codelogo-removebg-preview.png"
        placeholder="logo"
      />
      <div className="flex flex-col ">
        <h1 className="text-3xl font-semibold">CodeRun</h1>
        <span className="text-gray-500 text-sm font-light -mt-1">
          Code Compiler
        </span>
      </div>
    </div>
  </header>
);

const Sidebar = ({ language, setLanguage }) => {
  const languages = [
    { id: "javascript", img: "/icons/javascript.png", alt: "JavaScript" },
    { id: "java", img: "/icons/java.png", alt: "Java" },
    { id: "cpp", img: "/icons/cpp.png", alt: "C++" },
    { id: "python", img: "/icons/python.png", alt: "Python" },
  ];
  return (
    <aside className="w-20 bg-gray-100 flex flex-col items-center p-2 space-y-2">
      {languages.map((lang) => (
        <button
          key={lang.id}
          onClick={() => setLanguage(lang.id)}
          className={`w-12 h-12 rounded flex items-center justify-center ${
            language === lang.id ? "bg-blue-300" : "bg-gray-300"
          }`}>
          <img src={lang.img} alt={lang.alt} className="w-8 h-8" />
        </button>
      ))}
    </aside>
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
    <div className="flex-1 bg-gray-200 p-4 border-r shadow-md">
      <CodeMirror
        className="border-none"
        value={code}
        height="100%"
        theme="dark"
        extensions={[basicSetup, history(), getLanguageExtension(language)]}
        onChange={(newValue) => setCode(newValue)}
      />
    </div>
  );
};

const OutputPanel = ({ output }) => (
  <div className="flex-1 bg-gray-100 p-4 border-l shadow-md">
    {output ? (
      <pre className="bg-white p-2 rounded-md text-sm">{output}</pre>
    ) : (
      <span className="text-gray-400">Run code to see output...</span>
    )}
  </div>
);

const Controls = ({ handleRunCode, code }) => {
  const [showPopup, setShowPopup] = useState(false);
  const handleShare = async () => {
    try {
      console.log(1);
      await navigator.clipboard.writeText(code);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    } catch (err) {
      console.error("Clipboard write failed:", err);
    }
  };

  return (
    <div className=" relative flex gap-2 p-2 ml-auto">
      <button
        className="bg-gray-400 text-sm text-white px-2 py-1 rounded"
        onClick={handleShare}>
        <i className="fa-solid fa-share-nodes px-1"></i>Share
      </button>
      {showPopup && (
        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md opacity-90 transition-opacity duration-300">
          ✅ Code copied!
        </div>
      )}
      <button
        className="bg-green-600 text-sm hover:bg-green-700 text-white px-5 py-1 rounded"
        onClick={handleRunCode}>
        RUN
      </button>
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
    console.log(codeBody);
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/code/code-execute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(codeBody),
        }
      );
      const data = await response.json();
      console.log(data);
      setOutput(
        data.success ? (data.error ? data.error : data.output) : data.error
      );
    } catch (error) {
      setOutput("Error running code...");
      console.error(error);
    }
  };

  const handleClearOutput = () => setOutput("");

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar language={language} setLanguage={setLanguage} />
        <main className="flex flex-1 p-2 ">
          <div className=" flex-1 flex flex-col border-r shadow-md">
            <Controls handleRunCode={handleRunCode} code={code} />
            <CodeEditor code={code} setCode={setCode} language={language} />
          </div>
          <div className=" w-[45%] flex flex-col gap-1">
            <div className="flex w-full p-2 ml-auto justify-between items-center">
              <h2 className="text-md font-normal opacity-70">OUTPUT</h2>
              <button
                className="bg-gray-400 text-white text-sm px-2 py-1 rounded"
                onClick={handleClearOutput}>
                CLEAR
              </button>
            </div>
            <OutputPanel output={output} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CodeRunApp;
