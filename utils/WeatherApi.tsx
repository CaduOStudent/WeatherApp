import { fetchWeatherApi } from 'openmeteo';

export interface WeatherData {
	current: any;
	minutely15: any;
	hourly: any;
	daily: any;
}

export async function getWeatherData(latitude: number, longitude: number): Promise<WeatherData> {
	const params = {
		latitude: [latitude],
		longitude: [longitude],
		daily: [
			"sunrise",
			"sunset",
			"daylight_duration",
			"rain_sum",
			"showers_sum",
			"snowfall_sum",
			"temperature_2m_max",
			"temperature_2m_min"
		],
		hourly: [
			"temperature_2m",
			"weather_code",
			"cloud_cover",
			"precipitation",
			"wind_speed_10m",
			"uv_index",

		],
		current: [
			"weather_code",
			"precipitation",
			"is_day",
			"apparent_temperature",
			"temperature_2m",
			"wind_speed_10m",
			"wind_direction_10m",
			"wind_gusts_10m",
			"cloud_cover",
			"temperature_2m_max",
			"temperature_2m_min"
		],
		minutely_15: [
			"temperature_2m",
			"precipitation",
			"is_day",
			"wind_speed_80m",
			"apparent_temperature",
			"temperature_2m_max",
			"temperature_2m_min"
		],
		timezone: "auto",
		forecast_hours: 1,
		forecast_minutely_15: 4
	};
	const url = "https://api.open-meteo.com/v1/forecast";
	const responses = await fetchWeatherApi(url, params);

	const response = responses[0];

	// Error handling
	if (!response) {
		throw new Error("No response from Weather API");
	}

	const utcOffsetSeconds = response.utcOffsetSeconds();
	const current = response.current();
	const minutely15 = response.minutely15();
	const hourly = response.hourly();
	const daily = response.daily();

	// Helper to build time arrays
	const buildTimeArray = (obj: any) =>
		[...Array((Number(obj.timeEnd()) - Number(obj.time())) / obj.interval())].map(
			(_, i) => new Date((Number(obj.time()) + i * obj.interval() + utcOffsetSeconds) * 1000)
		);

	if (!daily) {
		throw new Error("Daily weather data is null");
	}
	if (!current) {
		throw new Error("Current weather data is null");
	}
	const sunrise = daily.variables(0);
	const sunset = daily.variables(1);

	return {
		current: {
			time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
			weatherCode: current.variables(0)?.value(),
			precipitation: current.variables(1)?.value(),
			isDay: current.variables(2)?.value(),
			apparentTemperature: current.variables(3)?.value(),
			temperature2m: current.variables(4)?.value(),
			windSpeed10m: current.variables(5)?.value(),
			windDirection10m: current.variables(6)?.value(),
			windGusts10m: current.variables(7)?.value(),
			cloudCover: current.variables(8)?.value(),
		},
		minutely15: minutely15
			? {
				time: buildTimeArray(minutely15),
				temperature2m: minutely15.variables(0)?.valuesArray(),
				precipitation: minutely15.variables(1)?.valuesArray(),
				isDay: minutely15.variables(2)?.valuesArray(),
				windSpeed80m: minutely15.variables(3)?.valuesArray(),
				apparentTemperature: minutely15.variables(4)?.valuesArray(),
			}
			: {
				time: [],
				temperature2m: [],
				precipitation: [],
				isDay: [],
				windSpeed80m: [],
				apparentTemperature: [],
			},
		hourly: hourly
			? {
				time: buildTimeArray(hourly),
				temperature2m: hourly.variables(0)?.valuesArray(),
				weatherCode: hourly.variables(1)?.valuesArray(),
				cloudCover: hourly.variables(2)?.valuesArray(),
				precipitation: hourly.variables(3)?.valuesArray(),
				windSpeed10m: hourly.variables(4)?.valuesArray(),
				uvIndex: hourly.variables(5)?.valuesArray(),
			}
			: {
				time: [],
				temperature2m: [],
				weatherCode: [],
				cloudCover: [],
				precipitation: [],
				windSpeed10m: [],
				uvIndex: [],
			},
		daily: {
			time: buildTimeArray(daily),
			sunrise: sunrise
				? [...Array(sunrise.valuesInt64Length())].map(
					(_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
				)
				: [],
			sunset: sunset
				? [...Array(sunset.valuesInt64Length())].map(
					(_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
				)
				: [],
			daylightDuration: daily.variables(2)?.valuesArray(),
			rainSum: daily.variables(3)?.valuesArray(),
			showersSum: daily.variables(4)?.valuesArray(),
			snowfallSum: daily.variables(5)?.valuesArray(),
			temperature2mMax: daily.variables(6)?.valuesArray(),
			temperature2mMin: daily.variables(7)?.valuesArray(),
		},
	};
}