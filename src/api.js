export async function fetchData(endpoint, data = null, method = 'GET') {
    try {
      // Set up the options object for the fetch request
      const options = {
        method, // Default to GET method
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      // If data is provided (for POST requests), add it to the body of the request
      if (data) {
        options.body = JSON.stringify(data);
      }
  
      const response = await fetch(`http://localhost:3001/api/${endpoint}`, options);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint} data`);
      }
  
      // Return the response as JSON
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
      return null;
    }
  }
  
  
  
  
  