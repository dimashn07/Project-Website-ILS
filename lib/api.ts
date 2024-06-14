export const sendLayananForm = async (data) => {
    const response = await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return response.json();
};
