'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data for conversations
  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://placehold.co/100x100',
      lastMessage: 'Thanks for reaching out!',
      timestamp: '2 hours ago',
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      avatar: 'https://placehold.co/100x100',
      lastMessage: "I'll send the designs tomorrow",
      timestamp: '1 day ago',
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Alex Kim',
      avatar: 'https://placehold.co/100x100',
      lastMessage: 'The project looks great!',
      timestamp: '2 days ago',
      unreadCount: 1
    }
  ];

  // Mock data for messages
  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        content: "Hi, I saw your portfolio and I'm interested in working together",
        senderId: 'current-user',
        timestamp: '10:30 AM',
        isCurrentUser: true
      },
      {
        id: '2',
        content: "Thanks for reaching out! I'd love to hear more about your project",
        senderId: 'other-user',
        timestamp: '10:35 AM',
        isCurrentUser: false
      }
    ],
    '2': [
      {
        id: '1',
        content: "How's the design coming along?",
        senderId: 'current-user',
        timestamp: 'Yesterday',
        isCurrentUser: true
      },
      {
        id: '2',
        content: "Ill send the designs tomorrow",
        senderId: 'other-user',
        timestamp: '1 day ago',
        isCurrentUser: false
      }
    ]
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    // In a real app, this would send to a backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Conversations List */}
            <div className="border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Messages</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    className={`w-full p-4 text-left hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-purple-50' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex gap-3">
                      <Image
                        src={conversation.avatar}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium truncate">{conversation.name}</h3>
                          <span className="text-sm text-gray-500">{conversation.timestamp}</span>
                        </div>
                        <div className="flex justify-between items-baseline mt-1">
                          <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                          {conversation.unreadCount > 0 && (
                            <span className="ml-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages View */}
            <div className="md:col-span-2 h-[600px] flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Image
                        src={conversations.find(c => c.id === selectedConversation)?.avatar || ''}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">
                          {conversations.find(c => c.id === selectedConversation)?.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto">
                    {messages[selectedConversation]?.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-4 flex ${
                          message.isCurrentUser ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.isCurrentUser
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.isCurrentUser ? 'text-purple-200' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        disabled={!newMessage.trim()}
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}