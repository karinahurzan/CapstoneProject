"use strict";

// === VARIABLE DECLARATIONS ===
const courseList = document.querySelector(".course-list");
const searchForm = document.querySelector("#search-form");
const searchTitle = document.querySelector("#search-title");
const searchInstructor = document.querySelector("#search-instructor");
const searchLevel = document.querySelector("#search-level");
const searchCategory = document.querySelector("#search-category");
const showMoreBtn = document.querySelector("#show-more-btn");
const paginationControls = document.querySelector("#pagination-controls");
const clearFiltersBtn = document.querySelector("#clear-filters-btn");

let fullCourseList = [];
let allCourses = [];
let currentPage = 1;
const itemsPerPage = 10;

// === GET CATEGORY FROM URL PARAMETERS ===
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

// === FETCH COURSES FROM JSON FILE ===
async function fetchCourses() {
  try {
    const response = await fetch("../courses.json");
    if (!response.ok) throw new Error("Failed to load courses");
    return await response.json();
  } catch (error) {
    console.error("Error loading courses:", error);
    return [];
  }
}

// === RENDER COURSES TO THE PAGE ===
async function renderCourses(page = 1) {
  courseList.innerHTML = "";
  paginationControls.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedCourses = allCourses.slice(start, end);

  paginatedCourses.forEach((course) => {
    const courseItem = document.createElement("li");
    courseItem.classList.add("course-item");
    courseItem.innerHTML = '';

    courseItem.innerHTML = `   
            <img src="${course.photo}" alt="${course.name}">
            <div class="course-info">  
                <h3 class="course-name">${course.name}</h3>
                <p class="course-teacher">Instructor: ${course.teacher}</p>
                <p class="course-difficulty">Difficulty: ${
                  course.difficulty
                }</p>
                <p class="course-category">Category: ${course.category}</p>
                <p class="course-topics">Topics: ${course.topics.join(", ")}</p>
            </div>
    `;

    courseList.appendChild(courseItem);
  });

  await renderPagination();
  showMoreBtn.style.display = end < allCourses.length ? "block" : "none";
}

// === CLEAR FILTERS ===
async function clearFilters() {
  searchTitle.value = "";
  searchInstructor.value = "";
  searchLevel.value = "";
  searchCategory.value = "";

  allCourses = [...fullCourseList];
  currentPage = 1;
  history.replaceState(null, "", window.location.pathname);

  await renderCourses(currentPage);
}

// === RENDER PAGINATION BUTTONS ===
async function renderPagination() {
  const totalPages = Math.ceil(allCourses.length / itemsPerPage);

  if (totalPages <= 1) {
    paginationControls.style.display = "none";
    return;
  } else {
    paginationControls.style.display = "flex";
  }

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.toggle("active", i === currentPage);
    btn.addEventListener("click", async () => {
      currentPage = i;
      await renderCourses(currentPage);
    });
    paginationControls.appendChild(btn);
  }
}

// === FILTER COURSES BASED ON SEARCH FORM ===
async function filterCourses(e) {
  e.preventDefault();

  const url = new URL(window.location);
  url.searchParams.delete("category");
  history.pushState(null, "", url);

  const sortBy = document.querySelector("#search-sort").value;

  const filteredCourses = fullCourseList.filter((course) => {
    const titleMatch = course.name
      .toLowerCase()
      .includes(searchTitle.value.toLowerCase());

    const instructorMatch = course.teacher
      .toLowerCase()
      .includes(searchInstructor.value.toLowerCase());

    const levelMatch = searchLevel.value
      ? course.difficulty === searchLevel.value
      : true;

    const categoryMatch = searchCategory.value
      ? course.category === searchCategory.value
      : true;

    return titleMatch && instructorMatch && levelMatch && categoryMatch;
  });

  if (sortBy === "name") {
    filteredCourses.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "difficulty") {
    const levels = ["Beginner", "Intermediate", "Advanced"];
    filteredCourses.sort(
      (a, b) => levels.indexOf(a.difficulty) - levels.indexOf(b.difficulty)
    );
  }

  currentPage = 1;
  allCourses = filteredCourses;
  await renderCourses(currentPage);
}

// === LOAD MORE COURSES ON BUTTON CLICK ===
async function loadMoreCourses() {
  currentPage++;
  await renderCourses(currentPage);
}

// === INITIALIZE PAGE ===
(async function init() {
  fullCourseList = await fetchCourses();
  allCourses = [...fullCourseList];

  const categoryFromURL = getCategoryFromURL();

  if (categoryFromURL) {
    searchCategory.value = categoryFromURL;
    allCourses = fullCourseList.filter(
      (course) => course.category === categoryFromURL
    );
  }

  await renderCourses(currentPage);

  searchForm.addEventListener("submit", filterCourses);
  showMoreBtn.addEventListener("click", loadMoreCourses);
  clearFiltersBtn.addEventListener("click", clearFilters);
})();
