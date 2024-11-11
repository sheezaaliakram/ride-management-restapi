// Using vanilla JavaScript to handle form submission and make the API call
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Using fetch API to make a POST request to the login endpoint
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Display or store the JWT token if login is successful
        document.getElementById("message").textContent = "Login successful!";
        console.log("JWT Token:", data.token);

        // Store the token in local storage for later use
        localStorage.setItem("jwtToken", data.token);
      } else {
        // Display error message if authentication fails
        document.getElementById("message").textContent =
          data.error || "Login failed!";
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      document.getElementById("message").textContent =
        "Network error occurred!";
    }
  });
