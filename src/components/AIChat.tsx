import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, MapPin, AlertTriangle, Phone } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'location' | 'emergency' | 'route';
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation?: string;
}

export function AIChat({ isOpen, onClose, currentLocation }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI travel assistant. I can help you with local information, safety guidance, emergency contacts, and route planning. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    'emergency': {
      text: "🚨 EMERGENCY DETECTED! I'm immediately alerting nearby police stations and your emergency contacts. Stay calm and try to move to a safe location if possible. Emergency services are being dispatched to your location.",
      type: 'emergency' as const
    },
    'police': {
      text: "📞 Nearest Police Stations:\n• Guwahati Central Police Station - 2.1 km\n• Tourist Police Helpdesk - 1.8 km\n• Emergency Helpline: 100\n\nWould you like me to connect you directly?",
      type: 'text' as const
    },
    'hospital': {
      text: "🏥 Nearest Medical Facilities:\n• GMCH Hospital - 3.2 km\n• Apollo Clinic - 1.5 km\n• Emergency Medical: 108\n\nDo you need immediate medical assistance?",
      type: 'text' as const
    },
    'route': {
      text: "🗺️ I can suggest the safest route to your destination. Current risk analysis shows:\n• Main roads: SAFE ✅\n• Market area: MODERATE ⚠️\n• Hill routes: HIGH RISK ❌\n\nWhere would you like to go?",
      type: 'route' as const
    },
    'weather': {
      text: "🌤️ Current Weather Alert:\n• Temperature: 28°C\n• Humidity: 78%\n• Heavy rainfall expected at 3 PM\n• Flood warning for low-lying areas\n\nPlan your activities accordingly!",
      type: 'text' as const
    },
    'local': {
      text: "🏛️ Local Information:\n• Best time to visit temples: Early morning\n• Local cuisine recommendations available\n• Cultural etiquette guidelines\n• Language assistance in Assamese/Hindi\n\nWhat specific information do you need?",
      type: 'text' as const
    }
  };

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('emergency') || lowerMessage.includes('help') || lowerMessage.includes('danger')) {
      return {
        id: Date.now(),
        text: predefinedResponses.emergency.text,
        sender: 'ai',
        timestamp: new Date(),
        type: predefinedResponses.emergency.type
      };
    } else if (lowerMessage.includes('police') || lowerMessage.includes('security')) {
      return {
        id: Date.now(),
        text: predefinedResponses.police.text,
        sender: 'ai',
        timestamp: new Date(),
        type: predefinedResponses.police.type
      };
    } else if (lowerMessage.includes('hospital') || lowerMessage.includes('medical') || lowerMessage.includes('doctor')) {
      return {
        id: Date.now(),
        text: predefinedResponses.hospital.text,
        sender: 'ai',
        timestamp: new Date(),
        type: predefinedResponses.hospital.type
      };
    } else if (lowerMessage.includes('route') || lowerMessage.includes('direction') || lowerMessage.includes('way')) {
      return {
        id: Date.now(),
        text: predefinedResponses.route.text,
        sender: 'ai',
        timestamp: new Date(),
        type: predefinedResponses.route.type
      };
    } else if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('climate')) {
      return {
        id: Date.now(),
        text: predefinedResponses.weather.text,
        sender: 'ai',
        timestamp: new Date(),
        type: predefinedResponses.weather.type
      };
    } else if (lowerMessage.includes('local') || lowerMessage.includes('culture') || lowerMessage.includes('food')) {
      return {
        id: Date.now(),
        text: predefinedResponses.local.text,
        sender: 'ai',
        timestamp: new Date(),
        type: predefinedResponses.local.type
      };
    } else {
      return {
        id: Date.now(),
        text: `I understand you're asking about "${userMessage}". I can help you with:\n\n🚨 Emergency assistance\n🗺️ Safe route planning\n📞 Local contacts & services\n🌤️ Weather updates\n🏛️ Local information\n\nPlease let me know what specific help you need!`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Bot className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">AI Travel Assistant</h3>
              <p className="text-xs text-blue-100">Online • Multilingual Support</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.type === 'emergency'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'ai' && (
                    <Bot className={`h-4 w-4 mt-0.5 ${
                      message.type === 'emergency' ? 'text-red-600' : 'text-blue-600'
                    }`} />
                  )}
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your travel..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setInputText('emergency help needed')}
              className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full hover:bg-red-200 transition-colors"
            >
              🚨 Emergency
            </button>
            <button
              onClick={() => setInputText('show me safe routes')}
              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full hover:bg-green-200 transition-colors"
            >
              🗺️ Safe Routes
            </button>
            <button
              onClick={() => setInputText('nearest police station')}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
            >
              📞 Police
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}