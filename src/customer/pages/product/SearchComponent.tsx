import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    InputBase,
    Paper,
    Tooltip,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CircularProgress
} from '@mui/material';
import { Search, Close, SmartToy } from '@mui/icons-material';
import { AppDispatch } from '../../../state/Store';

interface Product {
    id: number;
    title: string;
    description: string;
    images: string[];
    sellingPrice: number;
}

interface Message {
    role: 'user' | 'assistant';
    content: string | AIResponse;
}

interface AIResponse {
    message: string;
    searchQuery: string;
}

const SearchComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [isAIMode, setIsAIMode] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSearch = async () => {
        if (!query.trim()) return;
        
        setIsLoading(true);
        setError('');
        
        try {
            const response = await fetch(`http://localhost:8080/api/product/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setSearchResults(data);
            } else {
                console.error('Unexpected API response format:', data);
                setSearchResults([]);
                setError('Định dạng dữ liệu không hợp lệ');
            }
        } catch (error) {
            console.error('Search Error:', error);
            setSearchResults([]);
            setError('Có lỗi xảy ra khi tìm kiếm');
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductClick = (product: Product) => {
        const formattedTitle = encodeURIComponent(product.title);
        navigate(`/product-details/${formattedTitle}/${product.description}/${product.id}`);
        setIsOpen(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            isAIMode ? handleAIChat() : handleSearch();
        }
    };

    const handleAIChat = async () => {
        if (!query.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: query }]);
        setIsTyping(true);

        try {
            const aiResponse = await mockAIResponse(query);
            setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
            handleSearch();
        } catch (error) {
            console.error('AI Chat Error:', error);
        } finally {
            setIsTyping(false);
        }
    };

    const mockAIResponse = async (query: string): Promise<AIResponse> => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            message: `Tôi sẽ giúp bạn tìm sản phẩm "${query}". Đây là một số kết quả phù hợp.`,
            searchQuery: query
        };
    };

    useEffect(() => {
        console.log('Search Results:', searchResults);
    }, [searchResults]);

    return (
        <>
            <Tooltip title="Tìm kiếm">
                <IconButton 
                    onClick={() => setIsOpen(true)}
                    className="hover:bg-gray-100 transition-colors"
                >
                    <Search />
                </IconButton>
            </Tooltip>

            <Dialog 
                open={isOpen} 
                onClose={() => setIsOpen(false)}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Search />
                        <Typography variant="h6">Tìm kiếm sản phẩm</Typography>
                    </div>
                    <IconButton onClick={() => setIsOpen(false)} size="small">
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <div className="flex flex-col gap-4">
                        <Paper className="flex items-center p-2">
                            <InputBase
                                className="flex-1 ml-2"
                                placeholder="Nhập từ khóa tìm kiếm..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <IconButton 
                                onClick={() => setIsAIMode(!isAIMode)}
                                color={isAIMode ? "primary" : "default"}
                            >
                                <SmartToy />
                            </IconButton>
                        </Paper>

                        {isAIMode && (
                            <Paper className="h-48 overflow-y-auto p-4 mb-4">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                                    >
                                        <div
                                            className={`inline-block p-2 rounded-lg ${
                                                msg.role === 'user'
                                                    ? 'bg-primary-color text-white'
                                                    : 'bg-gray-100'
                                            }`}
                                        >
                                            {typeof msg.content === 'string' 
                                                ? msg.content 
                                                : msg.content.message
                                            }
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <Typography variant="body2" className="text-gray-500 italic">
                                        Đang nhập...
                                    </Typography>
                                )}
                                <div ref={messagesEndRef} />
                            </Paper>
                        )}

                        {/* Search Results */}
                        {isLoading ? (
                            <div className="flex justify-center p-4">
                                <CircularProgress />
                            </div>
                        ) : error ? (
                            <Typography color="error" className="text-center p-4">
                                {error}
                            </Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {Array.isArray(searchResults) && searchResults.length > 0 ? (
                                    searchResults.map((product) => (
                                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                                            <Card 
                                                onClick={() => handleProductClick(product)}
                                                className="cursor-pointer hover:shadow-lg transition-shadow"
                                            >
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={product.images?.[0] || '/placeholder-image.jpg'}
                                                    alt={product.title}
                                                    className="object-cover h-40"
                                                />
                                                <CardContent>
                                                    <Typography 
                                                        variant="subtitle1" 
                                                        className="font-medium line-clamp-2"
                                                    >
                                                        {product.title}
                                                    </Typography>
                                                    <Typography 
                                                        variant="body2" 
                                                        color="text.secondary"
                                                        className="line-clamp-2 mt-1"
                                                    >
                                                        {product.description}
                                                    </Typography>
                                                    <Typography 
                                                        variant="body1" 
                                                        color="primary" 
                                                        className="mt-2 font-medium"
                                                    >
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(product.sellingPrice)}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    <Grid item xs={12}>
                                        <Typography className="text-center p-4 text-gray-500">
                                            {query ? 'Không tìm thấy sản phẩm phù hợp' : 'Nhập từ khóa để tìm kiếm'}
                                        </Typography>
                                    </Grid>
                                )}
                            </Grid>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SearchComponent;