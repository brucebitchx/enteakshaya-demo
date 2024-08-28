document.addEventListener('DOMContentLoaded', function() {
    const servicesList = document.getElementById('services-list');
    const searchBar = document.getElementById('search-bar');
    const serviceHeading = document.getElementById('service-heading');
    const serviceDescription = document.getElementById('service-description');
    const serviceDocuments = document.getElementById('service-documents');
    const serviceBtn = document.getElementById('service-btn');
    const serviceExtra = document.getElementById('service-extra');
  
    let servicesData = [];

    function fetchAndDisplayServices() {
        fetch('https://brucebitchx.github.io/enteakshaya-demo/assets/json/services.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                servicesData = data.services;
                populateServiceList(servicesData);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
                servicesList.innerHTML = '<p>Error loading services. Please try again later.</p>';
            });

    }

    function populateServiceList(services) {
        servicesList.innerHTML = ''; // Clear existing list
        services.forEach(service => {
            const serviceLink = document.createElement('a');
            serviceLink.href = '#';
            serviceLink.textContent = service.name;
            serviceLink.classList.add('list-group-item');
            serviceLink.dataset.serviceId = service.id;
            serviceLink.addEventListener('click', function(event) {
                event.preventDefault();
                displayServiceDetails(service.id);
            });
            servicesList.appendChild(serviceLink);
        });
    }

    function displayServiceDetails(serviceId) {
        const service = servicesData.find(service => service.id === serviceId);

        if (service) {
            serviceHeading.textContent = service.name;
            serviceDescription.textContent = service.description;
            serviceDocuments.innerHTML = '';
            service.documents_needed.forEach(doc => {
                const docItem = document.createElement('li');
                docItem.textContent = doc;
                serviceDocuments.appendChild(docItem);
                const message = `I'm interested in applying for the ${service.name} service.`;
            const encodedMessage = encodeURIComponent(message);
            serviceBtn.href = `https://wa.me/+919946280727?text=${encodedMessage}`;
            serviceExtra.textContent = `For more details, please contact us or visit our office.`;
            });
            
            // // Encode the service name for URL
            // const message = `https://wa.me/whatsappphonenumber?text=I%27m%20interested%20in%20the%20${(service.name)}.`;
            // serviceBtn.href = `https://wa.me/+919946280727?text=${message}`;
            // serviceExtra.textContent = `For more details, please contact us or visit our office.`;
        }
    }

    function filterServices() {
        const query = searchBar.value.toLowerCase();
        const filteredServices = servicesData.filter(service => service.name.toLowerCase().includes(query));
        populateServiceList(filteredServices);
    }

    searchBar.addEventListener('input', filterServices);

    fetchAndDisplayServices(); // Fetch and display the services when the DOM is loaded
});
