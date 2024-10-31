document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        
        const username = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:8081/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.accessToken;

              
                localStorage.setItem("token", token);
                
                alert("Login successful!");
                window.location.href = "acceuil.html";
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while logging in. Please try again later.");
        }
    });
});
