import { useState } from "react";
import axios from 'axios';

function useSendingAuthData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
   
    const fetchSendingAuthData = async (url, sendData) => {
        setError("")
        setLoading(true);
        try {
            const response = await axios.post(url, sendData);
            console.log(response);
            const authorization = response.data.token;
            localStorage.setItem('authorization', authorization);
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return [fetchSendingAuthData, loading, error];
}

export default useSendingAuthData;
