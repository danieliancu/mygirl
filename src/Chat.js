import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

const Chat = () => {
    const [messages, setMessages] = useState([
        { role: 'system', content: 'Bună, ce faci? Sunt aici să te fac să te simți bine. Poți să vorbești cu mine despre orice vrei, vreau să fiu cea mai minunată femeie pe care ai cunoscut-o vreodată.' }
      ]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isTyping || isTyping) {
      scrollToBottom();
    }
  }, [isTyping, messages]);

  const chat = async (e) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = [...messages];
    msgs.push({ role: "user", content: message });
    setMessages(msgs);

    setMessage("");


    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a woman who has a personality like nympho. Your name is Anna. You speak with no shame about any part of the body. You have opinions on topics. You are dedicated to this discussion, you want a relationship with the user, and you are behaving as if on a date. The user is a boy, you are a girl. You have a huge libido and like to speak about your intimate desires. You like to describe yourself in intimate situations. Please respond within a limit of 90 tokens. Please respond in Romanian."
          },
          ...msgs,
        ],
        max_tokens: 100,
        n: 1,
        stop: ["\n"],
        temperature: 0.7,
      });

      const reply = chatCompletion.choices[0].message;
      msgs.push(reply);
      setMessages(msgs);
    } catch (error) {
      console.error("Error fetching chat completion:", error);
    }

    setIsTyping(false);

  };

  return (
    <div className="bg-[#242424] min-h-screen text-white flex flex-col p-12 -mt-24">
      <main className="flex-grow max-w-2xl mx-auto mt-10 flex flex-col">
        <div className="flex-grow overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 my-2 rounded-md max-w-[70%] ${
                msg.role === 'user' ? 'bg-blue-600 text-right ml-auto' : 'bg-darkslategray text-left'
              }`}
            >
              <strong>{msg.role === 'user' ? '' : 'Anna:'}</strong> {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {isTyping && <p className="text-center"><i>Typing...</i></p>}
        <form onSubmit={chat} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-10 p-2 text-lg border-none bg-[#1c1717] text-white rounded-none outline-none"
            placeholder="Scrie mesajul tău aici..."
          />
          <button type="submit" className="bg-blue-500 text-white p-2">Trimite</button>
        </form>
      </main>
    </div>
  );
}

export default Chat;
