// ======================================
// 1. CONNECT HTML ELEMENTS WITH JAVASCRIPT
// ======================================

const skillsContainer = document.getElementById("skillsContainer");
const skillForm = document.getElementById("skillForm");
const skillInput = document.getElementById("skillInput");
const searchInput = document.getElementById("searchInput");
const totalCount = document.getElementById("totalCount");
const darkModeBtn = document.getElementById("darkModeBtn");
const modeLabel = document.getElementById("modeLabel");


// ======================================
// 2. CREATE INITIAL SKILLS ARRAY
// ======================================

const skills = [
    {
        id: 1,
        name: "React",
        icon: "fa-brands fa-react",
    },
    {
        id: 2,
        name: "Node.js",
        icon: "fa-brands fa-node-js",
    },
    {
        id: 3,
        name: "Python",
        icon: "fa-brands fa-python",
    },
    {
        id: 4,
        name: "Databases",
        icon: "fa-solid fa-database",
    },
    {
        id: 5,
        name: "Tailwind CSS",
        icon: "fa-brands fa-tailwind-css",
    },
    {
        id: 6,
        name: "JavaScript",
        icon: "fa-brands fa-js",
    },
    {
        id: 7,
        name: "TypeScript",
        icon: "fa-brands fa-typescript",
    },
    {
        id: 8,
        name: "Problem Solving",
        icon: "fa-solid fa-puzzle-piece",
    },
];


// ======================================
// 3. UPDATE TOTAL SKILLS COUNT
// ======================================

function updateSkillCount() {
    totalCount.textContent = `Total Skills: ${skills.length}`;
}


// ======================================
// 4. DISPLAY SKILLS DYNAMICALLY
// ======================================

function displaySkills(skillList = skills) {

    // Create cards for every skill
    const skillCards = skillList.map((skill) => {

        // Create the main card
        const card = document.createElement("div");
        card.className = "subcontainer";

        // Create the skill title
        const title = document.createElement("h3");
        title.className = "subcontainer__title";

        // Create the skill icon
        const icon = document.createElement("i");
        icon.className = skill.icon;

        // Create the skill name
        const skillName = document.createElement("span");
        skillName.textContent = ` ${skill.name}`;

        // Add icon and name to title
        title.append(icon, skillName);

        // Create the delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "subcontainer__button";
        deleteButton.type = "button";

        // Store the skill ID in the button
        deleteButton.dataset.skillId = skill.id;

        // Create trash icon
        const trashIcon = document.createElement("i");
        trashIcon.className = "fa-solid fa-trash-can fa-xl";

        deleteButton.appendChild(trashIcon);

        // Add title and button to card
        card.append(title, deleteButton);

        return card;
    });

    // Display cards inside the skills container
    skillsContainer.replaceChildren(...skillCards);
}


// ======================================
// 5. SEARCH AND FILTER SKILLS
// ======================================

function searchSkills() {

    // Get search input and remove extra spaces
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Filter matching skills
    const filteredSkills = skills.filter((skill) => {
        return skill.name.toLowerCase().includes(searchTerm);
    });

    // Display filtered skills
    displaySkills(filteredSkills);
}

// Listen for search input
searchInput.addEventListener("input", searchSkills);


// ======================================
// 6. ADD NEW SKILLS
// ======================================

skillForm.addEventListener("submit", function (event) {

    // Prevent page reload
    event.preventDefault();

    // Get input value
    const skillName = skillInput.value.trim();

    // Validate empty input
    if (skillName === "") {
        alert("Please enter a skill name!");
        return;
    }

    // Prevent duplicate skills
    const alreadyExists = skills.some((skill) => {
        return skill.name.toLowerCase() === skillName.toLowerCase();
    });

    if (alreadyExists) {
        alert("This skill already exists!");
        return;
    }

    // Create new skill object
    const newSkill = {
        id: Date.now(),
        name: skillName,
        icon: "fa-solid fa-code",
    };

    // Add new skill to array
    skills.push(newSkill);

    // Clear search and input fields
    skillInput.value = "";
    searchInput.value = "";

    // Refresh dashboard
    displaySkills();
    updateSkillCount();
});


// ======================================
// 7. DELETE SKILLS
// ======================================

skillsContainer.addEventListener("click", function (event) {

    // Find the clicked delete button
    const deleteButton = event.target.closest(".subcontainer__button");

    // Stop if the click was not on a delete button
    if (!deleteButton) {
        return;
    }

    // Get the skill ID
    const skillId = Number(deleteButton.dataset.skillId);

    // Find the skill position
    const skillIndex = skills.findIndex((skill) => {
        return skill.id === skillId;
    });

    // Stop if the skill was not found
    if (skillIndex === -1) {
        return;
    }

    // Remove the selected skill
    skills.splice(skillIndex, 1);

    // Refresh dashboard and count
    searchSkills();
    updateSkillCount();
});


// ======================================
// 8. DARK MODE AND LIGHT MODE
// ======================================

darkModeBtn.addEventListener("click", function () {

    // Toggle dark mode class
    document.body.classList.toggle("dark-mode");

    // Check current theme
    const isDarkMode = document.body.classList.contains("dark-mode");

    // Update button text
    modeLabel.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

});


// ======================================
// 9. INITIALIZE THE APPLICATION
// ======================================

// Display all skills when page loads
displaySkills();

// Display initial skill count
updateSkillCount();