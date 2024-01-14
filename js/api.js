const url = "https://bollingvaaler.no/wp-json/wc/store/products/";

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
