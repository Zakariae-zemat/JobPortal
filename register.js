document.getElementById("registerBtn").addEventListener("click", async function() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    
    let role;
    if (document.getElementById("bordered-radio-1").checked) {
        role = "Condidature";
    } else {
        role = "Recruteur";
    }

    const userData = {
        username: username,
        email: email,
        password: password
    };

    try {
        
        const registerResponse = await fetch("http://localhost:8081/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (registerResponse.ok) {
            
            const roleData = {
                username: username,
                rolename: role
            };

            const roleResponse = await fetch("http://localhost:8081/roleTouser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(roleData)
            });

            if (roleResponse.ok) {
                alert("User registered and role assigned successfully!");
            } else {
                alert("Failed to assign role.");
                console.log(roleResponse.status);
                
            }
        } else {
            alert("Failed to register user.");
            console.log(registerResponse.status);
            
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
    }
});
