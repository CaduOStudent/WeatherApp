import { fetchWeatherApi } from 'openmeteo';

// Interface describing the structure of air quality data returned by the API
export interface AirQualityData {
    current: {
        time: Date;
        europeanAqi: number | null;
        uvIndex: number | null;
    };
    hourly: {
        time: Date[];
        europeanAqi: number[] | null;
    };
}

// Function to fetch air quality data from Open-Meteo API for a given latitude and longitude
export async function getAirQualityData(latitude: number, longitude: number): Promise<AirQualityData> {
    // Prepare API parameters for the request
    const params = {
        latitude: [latitude],
        longitude: [longitude],
        hourly: ["european_aqi"],
        current: ["european_aqi", "uv_index"]
    };
    const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
    // Use openmeteo's fetchWeatherApi utility to make the request
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    // Basic error handling: check if response is undefined or null
    if (!response) {
        throw new Error("No response received from Air Quality API");
    }

    // Get UTC offset, current, and hourly data from the response
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current();
    const hourly = response.hourly();

    // Helper function to build an array of Date objects for each hourly data point
    const buildTimeArray = (obj: any) =>
        [...Array((Number(obj.timeEnd()) - Number(obj.time())) / obj.interval())].map(
            (_, i) => new Date((Number(obj.time()) + i * obj.interval() + utcOffsetSeconds) * 1000)
        );

    // Error handling if current data is missing
    if (!current) {
        throw new Error("No current data received from Air Quality API");
    }

    // Return the formatted air quality data
    return {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            europeanAqi: current.variables(0)?.value() ?? null,
            uvIndex: current.variables(1)?.value() ?? null,
        },
        hourly: {
            time: hourly ? buildTimeArray(hourly) : [],
            europeanAqi:
                hourly &&
                    hourly.variables(0) &&
                    hourly.variables(0)!.valuesArray() !== null
                    ? Array.from(hourly.variables(0)!.valuesArray() as Float32Array)
                    : null,
        },
    };
}