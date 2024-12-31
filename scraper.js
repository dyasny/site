const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const url = "https://www.linkedin.com/in/dyasny"; // Replace with your public LinkedIn profile URL

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Go to LinkedIn profile
    await page.goto(url, { waitUntil: "networkidle2" });

    // Extract data (adjust selectors as needed)
    const profileData = await page.evaluate(() => {
      const name = document.querySelector(".text-heading-xlarge")?.innerText || "Name not found";
      const headline = document.querySelector(".text-body-medium")?.innerText || "Headline not found";
      const experiences = Array.from(document.querySelectorAll(".experience-section li")).map(li => li.innerText);

      return { name, headline, experiences };
    });

    // Write data to JSON file
    fs.writeFileSync("profileData.json", JSON.stringify(profileData, null, 2));
    console.log("Profile data scraped successfully!");
  } catch (error) {
    console.error("Error scraping LinkedIn profile:", error);
  } finally {
    await browser.close();
  }
})();

