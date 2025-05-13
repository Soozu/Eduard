import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Map, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatMessage } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { cities } from '../../data/cities';
import { places } from '../../data/places';

// Sample welcome messages
const welcomeMessages: ChatMessage[] = [
  {
    id: 'welcome-1',
    text: "Hello there! 👋 I'm your WerTigo travel assistant. How can I help you plan your Philippines adventure today?",
    sender: 'assistant',
    timestamp: new Date(),
  },
  {
    id: 'welcome-2',
    text: "I can recommend destinations, suggest itineraries, or provide information about specific places. What would you like to know?",
    sender: 'assistant',
    timestamp: new Date(),
  },
];

interface Recommendation {
  type: 'city' | 'place';
  id: string;
  name: string;
  rating: number;
  image: string;
  description: string;
  tags: string[];
}

// Enhanced response generator with recommendations
const getAutoResponse = (message: string): { text: string; recommendations?: Recommendation[] } => {
  const lowerMessage = message.toLowerCase();
  
  // Beach recommendations
  if (lowerMessage.includes('beach') || lowerMessage.includes('beaches')) {
    const beachPlaces = places.filter(place => 
      place.tags.some(tag => tag.toLowerCase().includes('beach'))
    );
    const beachCities = cities.filter(city => 
      city.tags.some(tag => tag.toLowerCase().includes('beach'))
    );
    
    return {
      text: "Here are some of the Philippines' most beautiful beaches and beach destinations:",
      recommendations: [
        ...beachCities.slice(0, 3).map(city => ({
          type: 'city' as const,
          id: city.id,
          name: city.name,
          rating: city.rating,
          image: city.image,
          description: city.description,
          tags: city.tags,
        })),
        ...beachPlaces.slice(0, 2).map(place => ({
          type: 'place' as const,
          id: place.id,
          name: place.name,
          rating: place.rating,
          image: place.image,
          description: place.description,
          tags: place.tags,
        })),
      ],
    };
  }
  
  // Food recommendations
  if (lowerMessage.includes('food') || lowerMessage.includes('restaurant')) {
    const restaurants = places.filter(place => 
      place.category === 'restaurant'
    ).sort((a, b) => b.rating - a.rating);
    
    return {
      text: "Here are some of the best-rated restaurants across the Philippines:",
      recommendations: restaurants.slice(0, 5).map(place => ({
        type: 'place' as const,
        id: place.id,
        name: place.name,
        rating: place.rating,
        image: place.image,
        description: place.description,
        tags: place.tags,
      })),
    };
  }
  
  // City-specific recommendations
  for (const city of cities) {
    if (lowerMessage.includes(city.name.toLowerCase())) {
      const cityPlaces = places.filter(place => place.cityId === city.id)
        .sort((a, b) => b.rating - a.rating);
      
      return {
        text: `Here are the top-rated places to visit in ${city.name}:`,
        recommendations: [
          {
            type: 'city' as const,
            id: city.id,
            name: city.name,
            rating: city.rating,
            image: city.image,
            description: city.description,
            tags: city.tags,
          },
          ...cityPlaces.slice(0, 4).map(place => ({
            type: 'place' as const,
            id: place.id,
            name: place.name,
            rating: place.rating,
            image: place.image,
            description: place.description,
            tags: place.tags,
          })),
        ],
      };
    }
  }
  
  // Default response with top-rated cities
  return {
    text: "Here are some of our top-rated destinations in the Philippines:",
    recommendations: cities
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)
      .map(city => ({
        type: 'city' as const,
        id: city.id,
        name: city.name,
        rating: city.rating,
        image: city.image,
        description: city.description,
        tags: city.tags,
      })),
  };
};

interface MessageWithRecommendations extends ChatMessage {
  recommendations?: Recommendation[];
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageWithRecommendations[]>(welcomeMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: MessageWithRecommendations = {
      id: uuidv4(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate assistant typing
    setIsTyping(true);
    
    // Simulate a delay before the assistant responds
    setTimeout(() => {
      const response = getAutoResponse(inputMessage);
      const assistantMessage: MessageWithRecommendations = {
        id: uuidv4(),
        text: response.text,
        sender: 'assistant',
        timestamp: new Date(),
        recommendations: response.recommendations,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6">
        <div className="flex items-center">
          <Bot className="h-8 w-8 text-primary-500" />
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">WerTigo Travel Assistant</h3>
            <p className="text-sm text-gray-500">Ask me anything about traveling in the Philippines</p>
          </div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`chat-message ${
                  message.sender === 'user' 
                    ? 'chat-message-user' 
                    : 'chat-message-assistant'
                }`}
              >
                <div className="flex items-start">
                  {message.sender === 'assistant' && (
                    <Bot className="h-5 w-5 mr-2 text-primary-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm sm:text-base">{message.text}</p>
                    
                    {/* Recommendations grid */}
                    {message.recommendations && message.recommendations.length > 0 && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {message.recommendations.map((rec) => (
                          <Link
                            key={rec.id}
                            to={rec.type === 'city' ? `/city/${rec.id}` : `/place/${rec.id}`}
                            className="flex bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="w-24 h-24 flex-shrink-0">
                              <img 
                                src={rec.image} 
                                alt={rec.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">{rec.name}</h4>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                  <span className="ml-1 text-sm text-gray-600">{rec.rating.toFixed(1)}</span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{rec.description}</p>
                              <div className="flex items-center mt-2 text-primary-500 text-sm">
                                <MapPin className="w-4 h-4 mr-1" />
                                View on map
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    <span className="text-xs text-gray-500 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <User className="h-5 w-5 ml-2 text-primary-500 flex-shrink-0 mt-0.5" />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="chat-message chat-message-assistant">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-primary-500" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Quick suggestions */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex flex-wrap gap-2 mb-3">
          <button 
            onClick={() => setInputMessage('What are the best beaches in the Philippines?')}
            className="px-3 py-1.5 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200"
          >
            Best beaches
          </button>
          <button 
            onClick={() => setInputMessage('What Filipino food should I try?')}
            className="px-3 py-1.5 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200"
          >
            Must-try food
          </button>
          <button 
            onClick={() => setInputMessage('Best time to visit Philippines?')}
            className="px-3 py-1.5 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200"
          >
            When to visit
          </button>
          <Link 
            to="/map" 
            className="px-3 py-1.5 bg-primary-50 text-sm text-primary-600 rounded-full hover:bg-primary-100 flex items-center"
          >
            <Map size={14} className="mr-1" /> View Map
          </Link>
        </div>
        
        {/* Input area */}
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="input flex-grow"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="ml-3 p-2 rounded-full bg-primary-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;