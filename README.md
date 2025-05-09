#🌦️ Weather Buddy
##Weather Buddy is a sleek, real-time weather application built using React.js and the OpenWeatherMap API. It allows users to search for any city and get live weather details like temperature, conditions, humidity, and wind speed in a user-friendly interface.

##📸 Demo
<!-- Update with actual image path if available -->

##🚀 Features
🔍 Search weather by city name

🌡️ Real-time temperature display in Celsius

🌤️ Weather conditions (Clear, Clouds, Rain, etc.)

💧 Humidity and wind speed data

📱 Fully responsive design for all screen sizes

🧭 Simple and clean UI

##🛠️ Tech Stack
Frontend: React.js,Tailwind CSS

API: OpenWeatherMap API

Build Tool: Vite

##🔧 Installation
###1.Clone the repository

```

git clone https://github.com/Vargheseeldo10/Weather-Buddy.git
cd Weather-Buddy
``` 
###2.Install dependencies 

```

npm install
```
###3.Add your OpenWeatherMap API key

Create a .env file in the root directory and add:

```
VITE_API_KEY=your_openweathermap_api_key
```
###4.Start the development server

```
npm run dev
```
##🧩 Project Structure
```
Weather-Buddy/
├── public/
│   └── (static assets)
├── src/
│   ├── App.jsx              # Main component
│   ├── index.css            # Global styles
│   ├── main.jsx             # React entry point
├── .env                     # API key config
├── vite.config.js           # Vite config
├── package.json             # Dependencies & scripts
```
##📌 Notes
Make sure to sign up for an API key at OpenWeatherMap and place it in your .env file.

The app fetches current weather data for the searched city and updates the UI dynamically.

##✨ Author
Varghese Eldo

##📄 License
This project is licensed under the MIT License.
