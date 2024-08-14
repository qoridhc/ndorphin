import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BoardList = () => {
    const [boards, setBoards] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const loadBoards = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/v1/boards`, {
                    params: {
                        type: 'SOME_TYPE',
                        page: page,
                        size: 12
                    }
                });
                setBoards(prevBoards => [...prevBoards, ...response.data.content]);
                setHasMore(!response.data.last);
            } catch (error) {
                console.error("Failed to load boards:", error);
            }
            setLoading(false);
        };

        loadBoards();
    }, [page]);

    const handleScroll = (e) => {
        if (loading || !hasMore) return;

        const { scrollTop, clientHeight, scrollHeight } = e.target.scrollingElement;
        if (scrollHeight - scrollTop <= clientHeight * 1.5) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    return (
        <div>
            {boards.map(board => (
                <div key={board.id}>{board.subject}</div>
            ))}
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default BoardList;
