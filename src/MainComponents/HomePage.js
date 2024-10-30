import React, {useEffect, useState} from 'react';

const HomePage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Nie udało się załadować danych");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Operacja fetch napotkała error:", error);
                setError(error);
                setLoading(false);
            });
    }, [])

    if (loading) return <p>Ładowanie...</p>;
    if (error) return <p>Błąd: {error.message}</p>;

    return (
        <div>
            <h1>Witaj na stronie głównej</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default HomePage;