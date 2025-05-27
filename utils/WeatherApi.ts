import { fetchWeatherApi } from 'openmeteo';
const initialLat = 49.2827; // Example: Vancouver, Canada
const initialLong = -123.1207; // Example: Vancouver, Canada


export interface WeatherData {
	// Define your weather data structure if needed
	current: any;
	// You can add additional properties (hourly, daily…) as required
}

export async function getWeatherData(latitude: number, longitude: number){

	const params = {
		latitude: [latitude],
		longitude: [longitude],
		daily: [
			"temperature_2m_max", "temperature_2m_min", "wind_speed_10m_max", "sunset", "sunrise", "daylight_duration", "sunshine_duration", "weather_code"
		],
		hourly: [
			"temperature_2m", "is_day", "sunshine_duration", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "cloud_cover", "wind_speed_10m", "wind_speed_80m", "wind_direction_10m", "wind_direction_80m", "wind_gusts_10m", "temperature_80m", "weather_code", "uv_index"
		],
		models: "best_match",
		current: [
			"temperature_2m", "is_day", "apparent_temperature", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m", "precipitation", "cloud_cover", "weather_code"],
		minutely_15: ["wind_gusts_10m", "precipitation", "temperature_2m", "wind_speed_80m", "wind_direction_80m", "is_day"

		],
		temperature_unit: "celsius",
		wind_speed_unit: "kmh",
		timezone: "auto",
		forecast_hours: 1,
		cell_selection: "nearest",
		forecast_minutely_15: 4
	};
	const url = "https://api.open-meteo.com/v1/forecast";
	const responses = await fetchWeatherApi(url, params);
	return responses[0].current();
};
