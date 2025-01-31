import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react"; // Monaco Editor import
import { GoogleGenerativeAI } from "@google/generative-ai";
import ThemeProvider from '../components/ThemeProvider';

const ChatWithAi = () => {
    const [response, setResponse] = useState("");
    const [code, setCode] = useState("// Write your JavaScript code here...");
    const searchRef = useRef(null);

    const fetchAIResponse = async (promptText) => {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyDjSHn3tJY_q_DWJvtvwJwTeUcgFSycI38");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(promptText);
            const textResponse = result.response.text();
            setResponse(textResponse);
            setCode(textResponse);
            searchRef.current.value = "";
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    };

    const handleSubmit = () => {
        if (searchRef.current.value.trim() !== "") {
            fetchAIResponse(searchRef.current.value);
        }
    };

    return (
        <ThemeProvider>
            <div className="p-4 relative z-10">
                <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#BF9B30] to-[#FFF5E1] bg-clip-text text-transparent font-mono text-center">Chat with AI</h1>

                <div className="flex sm:flex-row flex-col relative max-w-[80%] m-auto justify-center items-center gap-2 mb-4">
                    <textarea
                        ref={searchRef}
                        className="w-[100%] h-[100px] sm:text-lg text-xs px-4 py-2 bg-transparent pe-[100px] rounded-md outline-none ring-1 ring-amber-300"
                        placeholder="Enter your query..."
                    />
                    <button
                        onClick={handleSubmit}
                        className="border-amber-500 sm:w-max w-full h-full bg-amber-300 border-spacing-1 border-2  sm:absolute right-0 rounded-md px-4 py-2 text-black hover:bg-amber-400"
                    >
                        Search
                    </button>
                </div>

                {response && (
                    <div
                        className="border border-amber-400 rounded-md m-auto p-2"
                        style={{
                            maxWidth: "90vw",
                            maxHeight: "500px",
                            overflowX: "hidden",
                            padding: "10px",
                            borderRadius: "8px",
                            backgroundColor: "transparent", // Dark background theme
                        }}
                    >
                        <MonacoEditor
                            height="400px"
                            language="javascript"
                            value={code}
                            onChange={(newValue) => setCode(newValue)}
                            theme="vs-dark"
                            
                            options={{
                                selectOnLineNumbers: true,
                                minimap: { enabled: false },
                                automaticLayout: true,
                                readOnly: true, // Allows editing
                                quickSuggestions: true, // Enable autocompletion
                                suggestOnTriggerCharacters: true, // Trigger suggestions on characters
                                wordWrap: "on", // Ensures the content wraps and avoids horizontal scroll
                                wrappingIndent: "same", // Ensures wrapping behavior is clean
                                scrollbar: {
                                    horizontal: "hidden", // Hides the horizontal scrollbar
                                    vertical: "auto", // Shows the vertical scrollbar as needed
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </ThemeProvider>
    );
};

export default ChatWithAi;
