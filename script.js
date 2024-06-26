document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const countriesList = document.getElementById('countriesList');
    let userCountry = '';

    // Fetch user's country using ipapi
    fetch(`https://ipapi.co/json/`)
        .then(response => response.json())
        .then(data => {
            userCountry = data.country_name;
        })
        .catch(error => console.error('Error fetching user country:', error));

    // Fetch all countries data from REST Countries API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            // Initial display of all countries
            // displayCountries(data);

            // Event listener for search input
            searchInput.addEventListener('input', () => {
                const searchText = searchInput.value.toLowerCase();
                const filteredCountries = data.filter(country =>
                    country.name.common.toLowerCase().includes(searchText)
                );
                displayCountries(filteredCountries);
            });
        })
        .catch(error => console.error('Error fetching countries:', error));

    // Function to display countries
    function displayCountries(countries) {
        countriesList.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');

            const countryFlag = document.createElement('img');
            countryFlag.src = country.flags.png; // Using REST Countries flag URL
            countryFlag.alt = `${country.name.common} flag`;
            countryCard.appendChild(countryFlag);

            const countryName = document.createElement('div');
            countryName.classList.add('country-name');
            countryName.textContent = country.name.common;
            countryCard.appendChild(countryName);

            const countryDetails = document.createElement('div');
            countryDetails.classList.add('country-details');
            countryDetails.innerHTML = `
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Subregion:</strong> ${country.subregion}</p>
            `;
            countryCard.appendChild(countryDetails);

            // Check if the country matches user's country and change background color
            if (country.name.common === userCountry) {
                countryCard.style.backgroundColor = 'pink';
            }

            countriesList.appendChild(countryCard);
        });
    }
});
