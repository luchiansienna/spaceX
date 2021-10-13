import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

export const Input = (props: { id: string, name: string, searchTerm: string, searchByTerm: (searchTerm: string) => void }) => {
    const { id, name, searchByTerm, searchTerm } = props;
    const [query, setQuery] = useState(searchTerm);
    const onTextChange = (e: any) => setQuery(e.target.value);
    useEffect(() => {
        setQuery(query);
        const timeOutId = setTimeout(() => searchByTerm(query), 500);
        return () => clearTimeout(timeOutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, searchTerm]);

    return <TextField id={id} label={name} value={query} variant="outlined" type="search" onChange={onTextChange} />;
};
