import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, MoreVertical, MessageSquare } from 'lucide-react';

export default function CoachChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'coach',
      text: "Hey there! Welcome to Maxx Fitclub! You've just taken the first step toward building a stronger, healthier version of yourself. I will be your personal coach. Feel free to ask me anything about your training, exercises execution, or nutrition guidelines. Let's crush it! 💪",
      time: '09:00 am',
      date: 'Today, 14 Aug'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const coachResponses = [
    "Consistency is key! What are we training today? Remember to track your sets inside the portal! 💪",
    "Nutrition is 70% of the game. Make sure you check out your meal plan for the day under the Nutrition tab! 🥦",
    "Great effort! Ensure you stay hydrated throughout the day. Aim for 3L of water! 💧",
    "Don't worry about yesterday's slip-ups. Focus on winning today's workouts and logs. I'm here to back you up! 🔥",
    "Keep pushing your limits. Your future self will thank you for the hard work you do today!"
  ];

  const [responseIndex, setResponseIndex] = useState(0);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    
    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputValue,
      time: timeString,
      date: 'Today, 14 Aug'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Coach typing and replying
    setTimeout(() => {
      setIsTyping(false);
      const coachMsg = {
        id: Date.now() + 1,
        sender: 'coach',
        text: coachResponses[responseIndex],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
        date: 'Today, 14 Aug'
      };
      setMessages((prev) => [...prev, coachMsg]);
      setResponseIndex((prev) => (prev + 1) % coachResponses.length);
    }, 1500);
  };

  return (
    <div className="chat-container animate-fade">
      {/* Header bar */}
      <div className="chat-header">
        <div className="chat-avatar-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200" 
            alt="Trainer Avatar"
            className="chat-avatar-img" 
          />
          <div className="avatar-status-dot"></div>
        </div>
        <div className="chat-header-info">
          <h3 className="chat-header-name">FitClub Pro</h3>
          <span className="chat-header-sub">Personal Coach · Online</span>
        </div>
        <button className="chat-more-btn" aria-label="Chat Menu">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages bubble body */}
      <div className="chat-body no-scrollbar">
        {messages.map((msg, index) => {
          const showDateSeparator = index === 0 || messages[index - 1].date !== msg.date;
          return (
            <React.Fragment key={msg.id}>
              {showDateSeparator && (
                <div className="chat-date-separator">
                  <span>{msg.date}</span>
                </div>
              )}
              <div className={`chat-message-row ${msg.sender === 'user' ? 'user-row' : 'coach-row'}`}>
                {msg.sender === 'coach' && (
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200" 
                    alt="Trainer Mini Avatar"
                    className="msg-mini-avatar" 
                  />
                )}
                <div className="msg-bubble-wrap">
                  <div className="msg-bubble">
                    {msg.text.split('\n').map((para, i) => (
                      <p key={i} className="msg-paragraph">{para}</p>
                    ))}
                  </div>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            </React.Fragment>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="chat-message-row coach-row animate-fade">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200" 
              alt="Trainer Avatar"
              className="msg-mini-avatar" 
            />
            <div className="msg-bubble-wrap">
              <div className="msg-bubble typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input drawer */}
      <form className="chat-input-row" onSubmit={handleSend}>
        <button type="button" className="chat-add-asset-btn" aria-label="Add attachment" onClick={() => alert('Attachments disabled in demo portal.')}>
          <Plus size={20} />
        </button>
        <div className="chat-input-pill">
          <input
            type="text"
            className="chat-text-input"
            placeholder="Enter message ..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="chat-send-btn" aria-label="Send message">
            <Send size={18} />
          </button>
        </div>
      </form>

      <style dangerouslySetInnerHTML={{ __html: `
        .chat-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 180px);
          min-height: 500px;
          background-color: var(--bg-primary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        /* Header design */
        .chat-header {
          display: flex;
          align-items: center;
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--color-border);
          padding: 16px 20px;
          gap: 14px;
        }

        .chat-avatar-wrapper {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }

        .chat-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .avatar-status-dot {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #22c55e;
          border: 2px solid var(--bg-card);
        }

        .chat-header-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .chat-header-name {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .chat-header-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .chat-more-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .chat-more-btn:hover {
          color: var(--text-primary);
        }

        /* Chat content bubbles body */
        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          background-color: var(--bg-primary);
        }

        .chat-date-separator {
          text-align: center;
          margin: 8px 0;
          position: relative;
        }

        .chat-date-separator::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--color-border);
          z-index: 1;
        }

        .chat-date-separator span {
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          padding: 4px 14px;
          border-radius: var(--radius-pill);
          font-size: 0.75rem;
          color: var(--text-secondary);
          position: relative;
          z-index: 2;
        }

        .chat-message-row {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          max-width: 80%;
        }

        .coach-row {
          align-self: flex-start;
        }

        .user-row {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .msg-mini-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
        }

        .msg-bubble-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .coach-row .msg-bubble-wrap {
          align-items: flex-start;
        }

        .user-row .msg-bubble-wrap {
          align-items: flex-end;
        }

        .msg-bubble {
          padding: 14px 18px;
          border-radius: 20px;
          font-size: 0.95rem;
          line-height: 1.45;
        }

        .coach-row .msg-bubble {
          background-color: var(--bg-card);
          color: var(--text-primary);
          border-bottom-left-radius: 4px;
          border: 1px solid var(--color-border);
        }

        .user-row .msg-bubble {
          background-color: var(--bg-active);
          color: var(--text-primary);
          border-bottom-right-radius: 4px;
        }

        .msg-paragraph {
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        .msg-paragraph:last-child {
          margin-bottom: 0;
        }

        .msg-time {
          font-size: 0.75rem;
          color: rgba(181, 183, 192, 0.6);
        }

        /* Typing indicator dots */
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 14px 20px;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--text-secondary);
          animation: jump 1.2s infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        /* Input row drawer styles */
        .chat-input-row {
          display: flex;
          align-items: center;
          background-color: var(--bg-card);
          border-top: 1px solid var(--color-border);
          padding: 14px 20px;
          gap: 14px;
        }

        .chat-add-asset-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chat-add-asset-btn:hover {
          background-color: var(--bg-active);
          transform: scale(1.05);
        }

        .chat-input-pill {
          flex: 1;
          display: flex;
          align-items: center;
          background-color: var(--bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-pill);
          padding: 6px 6px 6px 18px;
        }

        .chat-text-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.95rem;
        }

        .chat-text-input:focus {
          outline: none;
        }

        .chat-text-input::placeholder {
          color: rgba(181, 183, 192, 0.4);
        }

        .chat-send-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--bg-active);
          border: none;
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chat-send-btn:hover {
          background-color: var(--color-accent);
          color: #000000;
          transform: scale(1.05);
        }

        @media (max-width: 600px) {
          .chat-container {
            height: calc(100vh - 150px);
            min-height: 400px;
            border-radius: var(--radius-md);
          }
          .chat-input-row {
            padding: 10px;
            gap: 8px;
          }
          .chat-add-asset-btn {
            width: 36px;
            height: 36px;
          }
          .chat-message-row {
            max-width: 90%;
          }
        }
      `}} />
    </div>
  );
}
