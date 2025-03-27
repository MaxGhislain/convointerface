'use client'

import { useChat } from '@ai-sdk/react'
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
// import * as useSWR2 from "swr";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "/api/chat" });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen text-white">
      {/* Header */}
      <header className="p-4 text-center text-lg font-bold bg-gray-900 shadow-xl lg:text-3xl">
        Conversational Interface
      </header>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-lg max-w-[50%] ${
              msg.role === "user"
                ? "bg-blue-500 self-end text-white ml-auto"
                : "bg-gray-700 text-white"
            }`}
          >
            {msg.content}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-4 bg-gray-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}
