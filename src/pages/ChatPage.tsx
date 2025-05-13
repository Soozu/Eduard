import React from 'react';
import ChatInterface from '../components/chat/ChatInterface';

const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="flex-grow flex">
        <div className="container-custom flex-grow flex flex-col py-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-grow flex flex-col">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;