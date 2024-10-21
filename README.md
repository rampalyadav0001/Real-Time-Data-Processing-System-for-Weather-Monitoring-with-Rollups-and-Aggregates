# Real-Time Weather Monitoring System

## Overview

This project fetches weather data from the OpenWeatherMap API, displays 5-day forecasts, and allows temperature conversion between Celsius and Fahrenheit. It also includes additional weather metrics like humidity and wind speed.

## Features

- **API Integration:** Connects to OpenWeatherMap for real-time weather data.
- **Weather Summaries:** Provides daily forecasts with max, min, and average temperatures.
- **Temperature Conversion:** Converts temperature values from Kelvin to Celsius or Fahrenheit based on user preference.
- **Daily Weather Summary:** Simulates weather updates over several days and calculates average, maximum, minimum temperatures, and dominant weather conditions.
- **Additional Data:** Includes humidity and wind speed details.
- **5-Day Forecast:** Displays weather for the upcoming days.

## Fulfillment of Requirements

The application meets the following requirements:

- **Data Source:** 
  - Continuously retrieves weather data from the OpenWeatherMap API for major metros in India (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).
  - Processes main weather conditions (e.g., Rain, Snow, Clear), current temperature, perceived temperature, and update time.

- **Processing and Analysis:**
  - Calls the OpenWeatherMap API at configurable intervals (e.g., every 5 minutes).
  - Converts temperature values from Kelvin to Celsius or Fahrenheit based on user preference.

- **Rollups and Aggregates:**
  - **Daily Weather Summary:**
    - Rolls up weather data for each day.
    - Calculates daily aggregates: average temperature, maximum temperature, minimum temperature, and dominant weather condition.
    - Stores daily summaries in a database or persistent storage for further analysis.

  - **Alerting Thresholds:**
    - Defines user-configurable thresholds for temperature or specific weather conditions.
    - Continuously tracks the latest weather data and compares it with the thresholds.
    - Triggers alerts when thresholds are breached, displayed on the console or sent via email notification (implementation details are open-ended).

  - **Visualizations:**
    - Implements visualizations to display daily weather summaries, historical trends, and triggered alerts.

## Design Highlights

- **Modular Structure:** Separate modules for API connection, data processing, and UI rendering.
- **Configurable:** Customize temperature units and forecast intervals.
- **Easily Extendable:** New weather parameters can be added with minimal effort.

## Requirements

- Minimum screen resolution: 1070x680
- Node.js (Optional if live server isn’t available)
## Image
![image](https://github.com/user-attachments/assets/66c11c1a-a4e9-45d6-b12b-188a5116a062)

## Setup

### Prerequisites

- Install Node.js and npm.

### Installation


1. **Clone the Repository**
   ```bash
   git clone https://github.com/rampalyadav0001/Real-Time-Data-Processing-System-for-Weather-Monitoring-with-Rollups-and-Aggregates.git 

   ```

2. **Install Dependencies**

   ```bash
   npm install
   
   ```
   
3. **Run the Server**

   ```bash
   npm install http-server -g
   http-server -p 8080
   ```


