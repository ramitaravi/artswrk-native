'use client';

import { useState } from 'react';
import { ref, push, serverTimestamp } from 'firebase/database';
import { database } from '@/lib/firebase';

interface MessageModalProps {
  recipientId: string;
  recipientName: string;
  senderId: string;
  senderName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MessageModal({
  recipientId,
  recipientName,
  senderId,
  senderName,
  isOpen,
  onClose
}: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      // Create a conversation if it doesn't exist
      const conversationId = [senderId, recipientId].sort().join('_');
      const messageData = {
        senderId,
        senderName,
        recipientId,
        recipientName,
        content: message,
        timestamp: serverTimestamp(),
        read: false
      };

      // Add message to the conversation
      await push(ref(database, `conversations/${conversationId}/messages`), messageData);

      // Update latest message for both users
      const updates = {
        [`users/${senderId}/conversations/${conversationId}`]: {
          withUser: recipientId,
          withUserName: recipientName,
          lastMessage: message,
          timestamp: serverTimestamp(),
          unreadCount: 0
        },
        [`users/${recipientId}/conversations/${conversationId}`]: {
          withUser: senderId,
          withUserName: senderName,
          lastMessage: message,
          timestamp: serverTimestamp(),
          unreadCount: 1
        }
      };

      // Update conversation metadata
      Object.entries(updates).forEach(async ([path, data]) => {
        await set(ref(database, path), data);
      });

      setMessage('');
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">Message {recipientName}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <textarea
          className="w-full h-32 p-3 border rounded-lg mb-4"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSending}
        />
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            disabled={isSending}
          >
            Cancel
          </button>
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-purple-300"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </div>
  );
} 