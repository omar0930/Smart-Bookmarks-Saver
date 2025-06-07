// initializing the DOM elements
const siteTitleInput = document.getElementById("siteTitle");
const siteLinkInput = document.getElementById("siteLink");
const addBtn = document.getElementById("addBookmarkBtn");
const modal = document.getElementById("validationModal");
const closeModalBtn = document.querySelector(".close-modal");

let bookmarks = [];

// get bookmarks from localStorage
if (localStorage.getItem("savedBookmarks")) {
  bookmarks = JSON.parse(localStorage.getItem("savedBookmarks"));
  renderTable();
}

// name validation
siteTitleInput.addEventListener("input", () => {
  const namePattern = /^(\w){3,}(\s*(\w){1,})*$/;
  toggleValidation(siteTitleInput, namePattern);
});

// link validation
siteLinkInput.addEventListener("input", () => {
  const urlPattern =
    /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
  toggleValidation(siteLinkInput, urlPattern);
});

// on click of the add button, validate inputs
addBtn.addEventListener("click", () => {
  const isValidName = /^(\w){3,}(\s*(\w){1,})*$/.test(siteTitleInput.value);
  const isValidURL =
    /^(https?:\/\/)(www\.)?[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}(\/[^\s]*)?$/.test(
      siteLinkInput.value
    );

  if (isValidName && isValidURL) {
    saveBookmark();
  } else {
    modal.classList.add("show");
    modal.style.display = "block";
  }
});

// close the modal when clicking on the close button
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.style.display = "none";
});

// save the bookmark to localStorage
function saveBookmark() {
  bookmarks.push({
    name: siteTitleInput.value,
    url: siteLinkInput.value,
  });
  localStorage.setItem("savedBookmarks", JSON.stringify(bookmarks));
  renderTable();
  resetForm();
}

// show the modal for validation errors
function renderTable() {
  const tableBody = document.getElementById("bookmarksTableBody");
  tableBody.innerHTML = "";

  bookmarks.forEach((bookmark, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${bookmark.name}</td>
        <td>
          <a href="${bookmark.url}" target="_blank">
            <button class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</button>
          </a>
        </td>
        <td>
          <button onclick="deleteBookmark(${index})" class="btn btn-delete"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button>
        </td>
      </tr>
    `;
  });
}

// remove a bookmark
function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("savedBookmarks", JSON.stringify(bookmarks));
  renderTable();
}

// reset the form inputs
function resetForm() {
  siteTitleInput.value = "";
  siteLinkInput.value = "";
  siteTitleInput.classList.remove("is-valid");
  siteLinkInput.classList.remove("is-valid");
}

// style validation feedback
function toggleValidation(input, regex) {
  if (regex.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.add("is-invalid");
  }
}
