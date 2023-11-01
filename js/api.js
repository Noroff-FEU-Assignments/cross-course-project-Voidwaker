const url = "https://api.noroff.dev/api/v1/rainy-days";

export async function makeApiCall() {
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
    } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    }
}
