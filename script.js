fetch("./profileData.json")
  .then(response => response.json())
  .then(data => {
    document.getElementById("name").textContent = data.name;
    document.getElementById("headline").textContent = data.headline;

    const experienceList = document.getElementById("experience");
    data.experiences.forEach(exp => {
      const li = document.createElement("li");
      li.textContent = exp;
      experienceList.appendChild(li);
    });
  })
  .catch(error => console.error("Error loading profile data:", error));

