const storedJobs = JSON.parse(localStorage.getItem("jobs"));
const companyName = localStorage.getItem("selectedCompany");

const filteredJobs = storedJobs.filter(job => 
    job.company == companyName
);

displayJobs(filteredJobs);
document.getElementById('tmp').textContent = "Offres d'emploi chez " + companyName;
function displayJobs(jobsArray) {
    const jobListingContainer = document.getElementById('jobListingContainer');
    jobListingContainer.innerHTML = '';

    jobsArray.forEach(job => {
        const jobDetailDiv = document.createElement('div');
        jobDetailDiv.className = 'relative flex flex-col jus items-center justify-center overflow-hidden bg-gray-50 mx-16 sm:py-12';

        const jobCardDiv = document.createElement('div');
        jobCardDiv.className = 'bg-white  drop-shadow-xl w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 rounded-md';

        const jobInfoDiv = document.createElement('div');

        const categorySpan = document.createElement('span');
        categorySpan.className = 'text-blue-800 text-sm';
        categorySpan.textContent = job.category;

        const jobTitle = document.createElement('h3');
        jobTitle.className = 'font-bold mt-px';
        jobTitle.textContent = job.title;

        jobInfoDiv.appendChild(categorySpan);
        jobInfoDiv.appendChild(jobTitle);

        const jobMetaDiv = document.createElement('div');
        jobMetaDiv.className = 'flex items-center gap-3 mt-2';

        const companySpan = document.createElement('span');
        companySpan.className = 'company-link bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm flex gap-1 items-center cursor-pointer hover:underline decoration-solid';
        

        companySpan.setAttribute('data-company',job.company);

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
        const companyHref = document.createElement('a');
        companyHref.textContent = job.company;
        companyHref.href = "JobsAtCompany.html";

        companySpan.addEventListener('click', function() {
            localStorage.setItem('selectedCompany', job.company);
        });

        companySvg.appendChild(companyPath);
        companySpan.appendChild(companySvg);
        companySpan.appendChild(companyHref);

        const dateSpan = document.createElement('span');
        dateSpan.className = 'text-slate-600 text-sm flex gap-1 items-center';
        dateSpan.textContent = getRelativeTime(job.created);

        const dateSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        dateSvg.setAttribute("viewBox", "0 0 24 24");
        dateSvg.setAttribute("fill", "none");
        dateSvg.setAttribute("stroke", "currentColor");
        dateSvg.setAttribute("stroke-width", "2");
        dateSvg.setAttribute("width", "16");
        dateSvg.setAttribute("height", "16");

        const datePath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        datePath1.setAttribute("stroke-linecap", "round");
        datePath1.setAttribute("stroke-linejoin", "round");
        datePath1.setAttribute("d", "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z");

        dateSvg.appendChild(datePath1);

        dateSpan.insertBefore(dateSvg, dateSpan.firstChild);

        jobMetaDiv.appendChild(companySpan);
        jobMetaDiv.appendChild(dateSpan);
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
        exploreButton.addEventListener('mouseover', function() {
            const popover = document.getElementById('popover-Job');
            document.getElementById('popover-jobTitle').textContent = job.title;
            document.getElementById('popover-description').textContent = job.description;
            document.getElementById('popover-companyName').textContent = job.company;
            document.getElementById('popover-jobLocation').textContent = job.location;
            document.getElementById('popover-jobDate').textContent = getRelativeTime(job.created);
            document.getElementById('popover-jobSalary').textContent = Math.floor(job.salary_max/1000) + 'k';
        
            
            const rect = exploreButton.getBoundingClientRect();
            popover.style.top = `${rect.bottom + window.scrollY}px`;
            popover.style.left = `${rect.left + window.scrollX}px`;
            popover.classList.remove('invisible', 'opacity-0');
            popover.classList.add('visible', 'opacity-100');
        });
        
        document.getElementById('closeBtn').addEventListener('click', function() {
            const popover = document.getElementById('popover-Job');
            popover.classList.add('invisible', 'opacity-0');
            popover.classList.remove('visible', 'opacity-100');
        });

        expBtnSvg.appendChild(expBtnPath);
        exploreButton.appendChild(expBtnSvg);

        jobCardDiv.appendChild(jobInfoDiv);
        jobCardDiv.appendChild(exploreButton);

        jobDetailDiv.appendChild(jobCardDiv);

        jobListingContainer.appendChild(jobDetailDiv);
    });
}

function getRelativeTime(createdDate) {
    const now = new Date();
    const jobDate = new Date(createdDate);

    const diffInSeconds = Math.floor((now - jobDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInSeconds < 60) {
        return "à l'instant";
    } else if (diffInMinutes < 60) {
        return `il y a ${diffInMinutes} min`;
    } else if (diffInHours < 24) {
        return `il y a ${diffInHours} h`;
    } else if (diffInDays < 7) {
        return `il y a ${diffInDays} jrs`;
    } else if (diffInWeeks < 4) {
        return `il y a ${diffInWeeks} semaine${diffInWeeks > 1 ? 's' : ''}`;
    } else {
        return `il y a ${diffInMonths} mois`;
    }
}
