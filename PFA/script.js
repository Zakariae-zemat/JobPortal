console.log("start...");
fetch('http://localhost:8080/api/v1/jobs')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
