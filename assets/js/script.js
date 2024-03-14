// Function to format the number with two decimal places
function formatNumber(number) {
  // Check if the number is not a number or null
  if (isNaN(number) || number == null) {
    // Return '-' if the number is not valid
    return '-';
  } else {
    // Return the number with two decimal places if it's valid
    return number.toFixed(2);
  }
}

// Event listener for button click event
$('button').click(function () {
  // Check if the city input field is empty
  if ($('#city').val().length == 0) {
    // Show warning message if the city input field is empty
    return swal('', 'Please enter a city name', 'warning');
  }
  // Get the value of the city input field
  let cityName = $('#city').val();
  // Show loading message using sweetalert
  swal({
    title: '',
    text: 'Fetching weather data . . .',
    icon: 'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif',
    button: false,
  });
  // AJAX request to fetch weather data from the WeatherAPI
  $.ajax({
    url: 'http://api.weatherapi.com/v1/current.json',
    method: 'GET',
    data: {
      key: 'f137aee3e50e4dcd95c21839241403', // API key for WeatherAPI
      q: cityName, // City name for which weather data is requested
    },
    // Success callback function for handling successful response
    success: function (res) {
      // Check if there is an error in the response
      if (res.error) {
        // Show error message if there is an error in the response
        return swal(
          'Error',
          'Failed to fetch weather data. Please try again later.',
          'error'
        );
      }
      // Extract weather data from the response
      let data = res.current;
      // Update DOM elements with weather data
      $('.temperature').text(formatNumber(data.temp_c));
      $('.condition').text(data.condition.text);
      $('.humidity').text(data.humidity + '%');
      // Create country name with first letter in uppercase
      let newCountryName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
      $('.city-name').text(newCountryName);
      $('.weather-info').show(); // Show weather info container
      swal.close(); // Close loading message
    },
    // Error callback function for handling AJAX errors
    error: function (xhr, status, error) {
      console.error('Error fetching data:', error);
      // Show error message if there is an AJAX error
      swal(
        '',
        'Failed to fetch weather data. Please try again later.',
        'error'
      );
    },
  });
});
