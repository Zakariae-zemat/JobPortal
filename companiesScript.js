class Company {
    constructor(company, location) {
        this.company = company;
        this.location = location;
    }
}
let companies = [];
let allJobs = [];


fetch('http://localhost:8081/api/v1/jobs') 
    .then(response => response.json())
    .then(data => {

        data.forEach(companyData => {
            let cmp = new Company(
                companyData.company,
                companyData.location
            );
            companies.push(cmp);
        });
        displayCompanies(companies);
    })
    .catch(error => console.error('Error fetching jobs:', error));

function displayCompanies(companiesArray){
    const CompanyListingContainer = document.getElementById('CompanyListingContainer');
    CompanyListingContainer.innerHTML = '';

    companiesArray.forEach(job => {
        const CompanyDetail = document.createElement('div');
        CompanyDetail.className = 'relative flex flex-col jus items-center justify-center overflow-hidden bg-gray-50 mx-16 sm:py-12';

        const jobCardDiv = document.createElement('div');
        jobCardDiv.className = 'bg-white  drop-shadow-xl w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 rounded-md';

        const jobInfoDiv = document.createElement('div');


        const jobMetaDiv = document.createElement('div');
        jobMetaDiv.className = 'flex items-center gap-3 mt-2';

        const companySpan = document.createElement('span');
        companySpan.className = 'bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm flex gap-1 items-center cursor-pointer hover:underline decoration-solid';
        
        companySpan.addEventListener('click', function() {
            localStorage.setItem('selectedCompany', job.company);
        });

        const companySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        companySvg.setAttribute("viewBox", "0 0 24 24");
        companySvg.setAttribute("fill", "none");
        companySvg.setAttribute("stroke", "currentColor");
        companySvg.setAttribute("stroke-width", "1.5");
        companySvg.setAttribute("width", "16");
        companySvg.setAttribute("height", "16");

        const companyPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        companyPath.setAttribute("stroke-linecap", "round");
        companyPath.setAttribute("stroke-linejoin", "round");
        companyPath.setAttribute("d", "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z");

        companySvg.appendChild(companyPath);
        companySpan.appendChild(companySvg);
        const companyHref = document.createElement('a');
        companyHref.textContent = job.company;
        companyHref.href = "JobsAtCompany.html";
        companyHref.target = '_blanck';
        companySpan.appendChild(companyHref);


        const locationSpan = document.createElement('span');
            locationSpan.className = 'text-slate-600 text-sm flex gap-1 items-center';
    
            const locationSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            locationSvg.setAttribute("viewBox", "0 0 24 24");
            locationSvg.setAttribute("fill", "none");
            locationSvg.setAttribute("stroke", "currentColor");
            locationSvg.setAttribute("stroke-width", "2");
            locationSvg.setAttribute("width", "16");
            locationSvg.setAttribute("height", "16");
    
            const locationPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            locationPath1.setAttribute("stroke-linecap", "round");
            locationPath1.setAttribute("stroke-linejoin", "round");
            locationPath1.setAttribute("d", "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z");
    
            const locationPath2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            locationPath2.setAttribute("stroke-linecap", "round");
            locationPath2.setAttribute("stroke-linejoin", "round");
            locationPath2.setAttribute("d", "M15 11a3 3 0 11-6 0 3 3 0 016 0z");
    
            locationSvg.appendChild(locationPath1);
            locationSvg.appendChild(locationPath2);
            locationSpan.insertBefore(locationSvg, locationSpan.firstChild); 
            locationSpan.appendChild(document.createTextNode(job.location));

        jobMetaDiv.appendChild(companySpan);
        jobMetaDiv.appendChild(locationSpan);
        jobInfoDiv.appendChild(jobMetaDiv);

        const exploreButton = document.createElement('button');
        exploreButton.className = 'bg-blue-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center';
        exploreButton.textContent = 'Explore more';
        const expBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        expBtnSvg.setAttribute("viewBox", "0 0 24 24");
        expBtnSvg.setAttribute("fill", "none");
        expBtnSvg.setAttribute("stroke", "currentColor");
        expBtnSvg.setAttribute("stroke-width", "2");
        expBtnSvg.setAttribute("width", "16");
        expBtnSvg.setAttribute("height", "16");

        const expBtnPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        expBtnPath.setAttribute("stroke-linecap", "round");
        expBtnPath.setAttribute("stroke-linejoin", "round");
        expBtnPath.setAttribute("d", "M13 7l5 5m0 0l-5 5m5-5H6");

        expBtnSvg.appendChild(expBtnPath);
        exploreButton.appendChild(expBtnSvg);

        jobCardDiv.appendChild(jobInfoDiv);
        jobCardDiv.appendChild(exploreButton);

        CompanyDetail.appendChild(jobCardDiv);

        CompanyListingContainer.appendChild(CompanyDetail);
    });
}

document.getElementById('searchBtn').addEventListener('click', function(e) {
    e.preventDefault();

    const searchCompany = document.getElementById('company-search').value.toLowerCase();

    const filteredCompanies = companies.filter(cmp => 
        cmp.company.toLowerCase().includes(searchCompany)
    );

    displayCompanies(filteredCompanies);
});

document.querySelectorAll('#company-name').forEach(companyElement => {
    companyElement.addEventListener('click', function() {
        const companyName = this.textContent;
        localStorage.setItem('selectedCompany', companyName);
    });
});