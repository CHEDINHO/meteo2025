const apiKey = '2188e97dbdbb47fbf13da2e09641e78a';
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weatherIcon'); // عنصر الأيقونة المتحركة

weatherForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        console.log(data);

        locationElement.textContent = data.name;
        temperatureElement.textContent = `${data.main.temp} °C`;
        descriptionElement.textContent = data.weather[0].description;

        // إضافة الأيقونة المتحركة بناءً على حالة الطقس
        const iconCode = data.weather[0].icon;
        weatherIconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // إضافة تأثير متحرك للأيقونة
        weatherIconElement.classList.add('icon-animate');

        // عرض معلومات الطقس
        weatherInfo.style.display = 'block';

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
});
