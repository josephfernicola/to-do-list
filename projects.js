function displayNewProjectTitleInput() {
  const addNewProjectButton = document.querySelector(".addNewProjectButton");
  const projectInputContainer = document.querySelector(
    ".projectInputContainer"
  );
  addNewProjectButton.addEventListener("click", () => {
    addNewProjectButton.textContent = "";
    addNewProjectButton.style.visibility = "hidden";
    const projectTitleInput = createProjectTitleInput();
    const addTitleButton = createProjectTitleAddButton();
    const cancelProjectTitleButton = createProjectTitleCancelButton();
    const projectTitleContainer = document.createElement("div");
    projectTitleContainer.classList.add("projectTitleContainer");
    projectInputContainer.appendChild(projectTitleContainer);
    projectTitleContainer.appendChild(projectTitleInput);
    projectTitleContainer.appendChild(addTitleButton);
    projectTitleContainer.appendChild(cancelProjectTitleButton);
    cancelNewProjectTitleInput();
    addNewProjectTitleToList();

  });
}

displayNewProjectTitleInput();

function createProjectTitleCancelButton() {
  const cancelProjectTitleButton = document.createElement("button");
  cancelProjectTitleButton.classList.add("cancelProjectTitleButton");
  cancelProjectTitleButton.textContent = "Cancel";
  return cancelProjectTitleButton;
}

function createProjectTitleAddButton() {
  const addTitleButton = document.createElement("button");
  addTitleButton.classList.add("addProjectTitleButton");
  addTitleButton.textContent = "Add";
  return addTitleButton;
}

function createProjectTitleInput() {
  const projectTitleInput = document.createElement("input");
  projectTitleInput.classList.add("projectTitleInput");
  projectTitleInput.type = "text";
  return projectTitleInput;
}

function cancelNewProjectTitleInput() {
  const cancelProjectTitleButton = document.querySelector(
    ".cancelProjectTitleButton"
  );
  cancelProjectTitleButton.addEventListener("click", () => {
    const projectTitleContainer = document.querySelector(
      ".projectTitleContainer"
    );
    projectTitleContainer.remove();
    const addNewProjectButton = document.querySelector(".addNewProjectButton");
    addNewProjectButton.textContent = "+ Add Project";
    addNewProjectButton.style.visibility = "visible";
  });
}

function addNewProjectTitleToList() {
  const addProjectTitleButton = document.querySelector(
    ".addProjectTitleButton"
  );
  const projectTitleInput = document.querySelector(".projectTitleInput");
  const firstProjectListLocalStorage =
    JSON.parse(localStorage.getItem("projectList")) || [];

  addProjectTitleButton.addEventListener("click", () => {
    if (firstProjectListLocalStorage.includes(projectTitleInput.value)) {
      alert("Projects cannot have the same name. Try Again!");
    }
    if (
      projectTitleInput.value !== "" &&
      projectTitleInput.value !== null &&
      !firstProjectListLocalStorage.includes(projectTitleInput.value)
    ) {
      const newProjectTitle = createProjectTitle(projectTitleInput);
      const projectTitleXButton = createProjectTitleXButton();
      const projectListContainer = createProjectListContainer();
      const listSidebar = document.querySelector(".listSidebar");
      listSidebar.appendChild(projectListContainer);
      projectListContainer.appendChild(newProjectTitle);
      projectListContainer.appendChild(projectTitleXButton);
      const projectListLocalStorage =
        JSON.parse(localStorage.getItem("projectList")) || [];
      projectListLocalStorage.push(projectTitleInput.value);
      localStorage.setItem(
        "projectList",
        JSON.stringify(projectListLocalStorage)
      );
      beAbleToSwitchHeaderToProjectTitle();
      displayAllItemsForSpecificHeader();
      setDataIndexOnProjectTitles();
      deleteProjectTitleWhenSubmitted(projectTitleXButton);
    }
    const projectTitleContainer = document.querySelector(
      ".projectTitleContainer"
    );
    projectTitleContainer.remove();
    const addNewProjectButton = document.querySelector(".addNewProjectButton");
    addNewProjectButton.textContent = "+ Add Project";
    addNewProjectButton.style.visibility = "visible";
  });
}

function deleteProjectTitleWhenSubmitted(projectTitleXButton) {
  projectTitleXButton.addEventListener("click", () => {
    const projectTitleList =
      JSON.parse(localStorage.getItem("projectList")) || [];
    projectTitleList.splice(
      projectTitleXButton.parentElement.getAttribute("data-index"),
      1
    );
    localStorage.setItem("projectList", JSON.stringify(projectTitleList));
    localStorage.removeItem(projectTitleXButton.parentElement.children[1].textContent)
    projectTitleXButton.parentElement.remove();
    removeDataIndexOnProjectTitles();
    setDataIndexOnProjectTitles();
    const currentHeader = document.querySelector(".toDoListItemsHeader")
    if (
      currentHeader.textContent ==
      projectTitleXButton.parentElement.children[1].textContent
    ) {
      switchToInboxDisplayIfYouDeleteProjectTitleWhileItIsOpened(currentHeader);
    }
  });
}

function setDataIndexOnProjectTitles() {
  const allProjectTitles =
    document.querySelectorAll(".projectListContainer") || [];
  for (let i = 0; i < allProjectTitles.length; i++) {
    allProjectTitles[i].setAttribute("data-index", i);
  }
}

function removeDataIndexOnProjectTitles() {
  const allProjectTitles =
    document.querySelectorAll(".projectListContainer") || [];
  for (let i = 0; i < allProjectTitles.length; i++) {
    allProjectTitles[i].removeAttribute("data-index", i);
  }
}

displayProjectListOnReload();

function createProjectListContainer() {
  const projectListContainer = document.createElement("div");
  projectListContainer.classList.add("projectListContainer");
  const projectIconAndTitle = document.createElement("div");
  projectIconAndTitle.classList.add("iconAndTitle");
  const projectIcon = document.createElement("img");
  projectIcon.src = "./icons/project.png";
  projectIcon.classList.add("projectIcon");

  projectListContainer.appendChild(projectIcon);
  return projectListContainer;
}

function createProjectTitleXButton() {
  const projectTitleXButton = document.createElement("div");
  projectTitleXButton.classList.add("projectTitleXButton");
  projectTitleXButton.textContent = "X";
  return projectTitleXButton;
}

function createProjectTitle(projectTitleInput) {
  const newProjectTitle = document.createElement("li");
  newProjectTitle.classList.add("newProjectTitle");
  newProjectTitle.textContent = projectTitleInput.value;
  return newProjectTitle;
}

function createProjectCircleIcon() {
  const circleIcon = document.createElement("img");
  circleIcon.src = "./icons/circle.png";
  circleIcon.classList.add("circleIcon");
  return circleIcon;
}

function displayProjectListOnReload() {
  const projectListFromStorage =
    JSON.parse(localStorage.getItem("projectList")) || [];
  const listSidebar = document.querySelector(".listSidebar");

  projectListFromStorage.forEach((element) => {
    const newProjectTitle = document.createElement("li");
    newProjectTitle.classList.add("newProjectTitle");

    const projectTitleXButton = createProjectTitleXButton();

    const projectListContainer = createProjectListContainer();

    newProjectTitle.textContent = element;
    listSidebar.appendChild(projectListContainer);

    projectListContainer.appendChild(newProjectTitle);
    projectListContainer.appendChild(projectTitleXButton);
  });
  setDataIndexOnProjectTitles();
  beAbleToDeleteProjectTitleOnSidebar();
  beAbleToSwitchHeaderToProjectTitle();
}

function beAbleToDeleteProjectListItemOnInitialLoad(projectTitleXButton) {
  const header = document.querySelector(".toDoListItemsHeader");
  projectTitleXButton.addEventListener("click", () => {
    const specificProjectLocalStorageList =
      JSON.parse(localStorage.getItem(header.textContent)) || [];
    specificProjectLocalStorageList.splice(
      projectTitleXButton.parentElement.parentElement.getAttribute(
        "data-index"
      ),
      1
    );
    //remove project list container
    projectTitleXButton.parentElement.parentElement.remove();

    localStorage.setItem(
      header.textContent,
      JSON.stringify(specificProjectLocalStorageList)
    );
    removeDataIndexOnProjectListItems();
    setDataIndexOnProjectListItems();
  });
}

//function for project title on left side deletion
function beAbleToDeleteProjectTitleOnSidebar() {
  const allXButtons = document.querySelectorAll(".projectTitleXButton") || [];
  allXButtons.forEach((xButton) => {
    xButton.addEventListener("click", () => {
      const projectTitleLocalStorage =
        JSON.parse(localStorage.getItem("projectList")) || [];
      projectTitleLocalStorage.splice(
        xButton.parentElement.getAttribute("data-index"),
        1
      );
      localStorage.setItem(
        "projectList",
        JSON.stringify(projectTitleLocalStorage)
      );
      const currentHeader = document.querySelector(".toDoListItemsHeader");
      if (
        currentHeader.textContent ==
        xButton.parentElement.children[1].textContent
      ) {
        switchToInboxDisplayIfYouDeleteProjectTitleWhileItIsOpened(currentHeader);
      }
      localStorage.removeItem(xButton.parentElement.children[1].textContent);
      xButton.parentElement.remove();

      removeDataIndexOnProjectTitles();
      setDataIndexOnProjectTitles();
    });
  });
}

function switchToInboxDisplayIfYouDeleteProjectTitleWhileItIsOpened(currentHeader) {
  const listItemsDisplay = document.querySelector(".listItemsDisplay");
  while (listItemsDisplay.firstChild) {
    listItemsDisplay.firstChild.remove();
    }
  localStorage.removeItem(currentHeader.textContent)
  currentHeader.textContent = "Inbox";
  const inboxLocalStorage = JSON.parse(localStorage.getItem("inboxToDo")) || [];
  //switching to inbox display if you delete a project title while having it open
  inboxLocalStorage.forEach((item) => {
    const inboxListItem = document.createElement("li");
    inboxListItem.classList.add("inboxListItem");
    const inboxListTitleContainer = document.createElement("div");
    inboxListTitleContainer.classList.add("inboxListTitleContainer");
    const inboxDueDateAndX = document.createElement("div");
    inboxDueDateAndX.classList.add("dueDateAndX");
    const listItemsDisplay = document.querySelector(".listItemsDisplay");
    const circleIcon = createCircleIcon();
    listItemsDisplay.appendChild(inboxListItem);
    inboxListItem.appendChild(inboxListTitleContainer);
    inboxListTitleContainer.appendChild(circleIcon);
    inboxListTitleContainer.appendChild(getInboxListTitleOnReload(item));
    inboxDueDateAndX.appendChild(
      getInboxListItemDueDateFromLocalStorage(item)
    );
    inboxDueDateAndX.appendChild(getInboxListItemXButton());
    inboxListItem.appendChild(inboxDueDateAndX);
    editTitle();
    editInboxItemDueDates();
  });
  beAbleToDeleteEachInboxListItemOnReload();
}

function beAbleToSwitchHeaderToProjectTitle() {
  const newProjectTitles = document.querySelectorAll(".newProjectTitle");
  newProjectTitles.forEach((title) => {
    title.addEventListener("click", () => {
      const header = document.querySelector(".toDoListItemsHeader");
      header.textContent = title.textContent;
    });
  });
}

function displayAllItemsForSpecificHeader() {
  const newProjectTitles = document.querySelectorAll(".newProjectTitle") || [];
  newProjectTitles.forEach((title) => {
    title.addEventListener("click", () => {
      const listItemsHeader = document.querySelector(".listItemsHeader");
  if (listItemsHeader.children.length > 2) {
    const inputFormContainer = document.querySelector(".inputFormContainer");
    inputFormContainer.remove();
    const toDoListItemsAddTask = document.querySelector(".toDoListItemsAddTask")
    toDoListItemsAddTask.style.visibility = "visible";
    toDoListItemsAddTask.textContent = "+ Add Task";
  }
      //clear the screen, then repopulate using local storage
      const listItemsDisplay = document.querySelector(".listItemsDisplay");
      while (listItemsDisplay.firstChild) {
        listItemsDisplay.firstChild.remove();
      }
      const headerTitleLocalStorage =
        JSON.parse(localStorage.getItem(title.textContent)) || [];
      headerTitleLocalStorage.forEach((item) => {
        const projectListItem = document.createElement("li");
        projectListItem.classList.add("projectListItem");
        const projectListTitle = createProjectListTitleOnReload(item);
        const projectListTitleContainer = document.createElement("div");
        projectListTitleContainer.classList.add("projectListTitleContainer");
        const projectListItemDueDate = createProjectDueDateOnReload(item);
        const projectListItemXButton = createProjectItemXButton();
        const circleIcon = createProjectCircleIcon();
        beAbleToDeleteEachProjectListItem(projectListItemXButton, title);
        const projectDueDateAndX = createDueDateAndXClassOnReload();
        const listItemsDisplay = document.querySelector(".listItemsDisplay");
        listItemsDisplay.appendChild(projectListItem);
        projectListItem.appendChild(projectListTitleContainer);
        projectListTitleContainer.appendChild(circleIcon);
        projectListTitleContainer.appendChild(projectListTitle);
        projectDueDateAndX.appendChild(projectListItemDueDate);
        projectDueDateAndX.appendChild(projectListItemXButton);
        projectListItem.appendChild(projectDueDateAndX);

        setDataIndexOnProjectListItems();
        editProjectItemDueDates();
        editProjectTitle();
      });
    });
  });
}
displayAllItemsForSpecificHeader();
beAbleToSwitchHeaderToProjectTitle();

function createDueDateAndXClassOnReload() {
  const projectDueDateAndX = document.createElement("div");
  projectDueDateAndX.classList.add("projectDueDateAndX");
  return projectDueDateAndX;
}

function beAbleToDeleteEachProjectListItem(projectListItemXButton, title) {
  projectListItemXButton.addEventListener("click", () => {
    const projectLocalStorageList =
      JSON.parse(localStorage.getItem(title.textContent)) || [];
    projectLocalStorageList.splice(
      projectListItemXButton.parentElement.parentElement.getAttribute(
        "data-index"
      ),
      1
    );
    //removing list element
    projectListItemXButton.parentElement.parentElement.remove();
    localStorage.setItem(
      title.textContent,
      JSON.stringify(projectLocalStorageList)
    );
    removeDataIndexOnProjectListItems();
    setDataIndexOnProjectListItems();
  });
}

function createProjectListTitleOnReload(item) {
  const projectListTitle = document.createElement("div");
  projectListTitle.classList.add("projectListTitle");
  projectListTitle.textContent = item.title;
  return projectListTitle;
}

function createProjectItemXButton() {
  const projectListItemXButton = document.createElement("div");
  projectListItemXButton.textContent = "X";
  projectListItemXButton.classList = "projectListItemXButton";
  return projectListItemXButton;
}

function createProjectDueDateOnReload(item) {
  const projectListItemDueDate = document.createElement("div");
  projectListItemDueDate.textContent = item.dueDate;
  projectListItemDueDate.classList.add("projectListItemDueDate");
  return projectListItemDueDate;
}

function replaceInboxInputFormWithProjectForm() {
  const toDoListItemsAddTask = document.querySelector(".toDoListItemsAddTask");
  const currentHeader = document.querySelector(".toDoListItemsHeader");
  toDoListItemsAddTask.addEventListener("click", () => {
    const inputFormContainer = document.querySelector(".inputFormContainer");
    if (currentHeader.textContent !== "Inbox") {
      while (inputFormContainer.firstChild) {
        inputFormContainer.firstChild.remove();
      }
      const projectHeaderInput = createProjectHeaderInput();
      const projectHeaderAddButton = createProjectHeaderAddButton();
      const projectHeaderCancelButton = createProjectHeaderCancelButton();
      toDoListItemsAddTask.style.visibility = "hidden";
      inputFormContainer.appendChild(projectHeaderInput);
      inputFormContainer.appendChild(projectHeaderAddButton);
      inputFormContainer.appendChild(projectHeaderCancelButton);

      addProjectItemsToDisplay();
      deleteProjectInputContainerWhenCancelButtonIsClicked();
    }
  });
}

replaceInboxInputFormWithProjectForm();

function createProjectHeaderCancelButton() {
  const projectHeaderCancelButton = document.createElement("button");
  projectHeaderCancelButton.classList.add("projectCancelButton");
  projectHeaderCancelButton.textContent = "Cancel";
  return projectHeaderCancelButton;
}

function createProjectHeaderAddButton() {
  const projectHeaderAddButton = document.createElement("button");
  projectHeaderAddButton.classList.add("projectAddButton");
  projectHeaderAddButton.textContent = "Add";
  return projectHeaderAddButton;
}

function createProjectHeaderInput() {
  const projectHeaderInput = document.createElement("input");
  projectHeaderInput.type = "text";
  projectHeaderInput.classList.add("projectInput");
  return projectHeaderInput;
}

function deleteProjectInputContainerWhenCancelButtonIsClicked() {
  const cancelButton = document.querySelector(".projectCancelButton");
  cancelButton.addEventListener("click", () => {
    const inputContainer = document.querySelector(".inputFormContainer");
    inputContainer.remove();
    const toDoListItemsAddTask = document.querySelector(
      ".toDoListItemsAddTask"
    );
    toDoListItemsAddTask.style.visibility = "visible";
    toDoListItemsAddTask.textContent = "+ Add Task";
  });
}

function addProjectItemsToDisplay() {
  const projectAddButton = document.querySelector(".projectAddButton");
  const projectInput = document.querySelector(".projectInput");
  const currentProjectHeader = document.querySelector(".toDoListItemsHeader");
  projectAddButton.addEventListener("click", () => {
    let existingProjectToDoItems =
      JSON.parse(localStorage.getItem(currentProjectHeader.textContent)) || [];
    if (projectInput.value !== "") {
      const newProjectItemName = projectInput.value;
      const newItem = {
        title: newProjectItemName,
        dueDate: "No Date",
      };
      existingProjectToDoItems.push(newItem);
      localStorage.setItem(
        currentProjectHeader.textContent,
        JSON.stringify(existingProjectToDoItems)
      );
      displayNewProjectInputItemOnScreen(projectInput);
      setDataIndexOnProjectListItems();
    }
    removeProjectInputForm();
    const toDoListItemsAddTask = document.querySelector(
      ".toDoListItemsAddTask"
    );
    toDoListItemsAddTask.style.visibility = "visible";
  });
}

function removeProjectInputForm() {
  const inputFormContainer = document.querySelector(".inputFormContainer");
  const toDoListItemsAddTask = document.querySelector(".toDoListItemsAddTask");
  inputFormContainer.remove();
  toDoListItemsAddTask.textContent = "+ Add Task";
}

function setDataIndexOnProjectListItems() {
  const projectListItems = document.querySelectorAll(".projectListItem");
  for (let i = 0; i < projectListItems.length; i++) {
    projectListItems[i].setAttribute("data-index", i);
  }
}

function removeDataIndexOnProjectListItems() {
  const projectListTitles = document.querySelectorAll(".projectListItem");
  for (let i = 0; i < projectListTitles.length; i++) {
    projectListTitles[i].removeAttribute("data-index", i);
  }
}

function displayNewProjectInputItemOnScreen(projectInput) {
  //const currentProjectHeader = document.querySelector(".toDoListItemsHeader");
  const projectListItem = document.createElement("li");
  projectListItem.classList.add("projectListItem");
  const projectListTitle = getProjectListTitleOnSubmit(projectInput);
  const projectListTitleContainer = document.createElement("div");
  projectListTitleContainer.classList.add("projectListTitleContainer");
  const projectListItemDueDate = getProjectDueDateOnSubmit();
  const projectListItemXButton = getProjectXButtonOnSubmit();
  const circleIcon = createCircleIcon();

  beAbleToDeleteProjectListItemOnInitialLoad(projectListItemXButton)

  const projectDueDateAndX = document.createElement("div");
  projectDueDateAndX.classList.add("projectDueDateAndX");
  const listItemsDisplay = document.querySelector(".listItemsDisplay");
  listItemsDisplay.appendChild(projectListItem);
  projectListItem.appendChild(projectListTitleContainer);
  projectListTitleContainer.appendChild(circleIcon);
  projectListTitleContainer.appendChild(projectListTitle);
  projectDueDateAndX.appendChild(projectListItemDueDate);
  projectDueDateAndX.appendChild(projectListItemXButton);
  projectListItem.appendChild(projectDueDateAndX);

  editProjectTitle();
  editProjectItemDueDates();
}

function getProjectXButtonOnSubmit() {
  const projectListItemXButton = document.createElement("div");
  projectListItemXButton.textContent = "X";
  projectListItemXButton.classList = "projectListItemXButton";
  return projectListItemXButton;
}

function getProjectDueDateOnSubmit() {
  const projectListItemDueDate = document.createElement("div");
  projectListItemDueDate.textContent = "No Date";
  projectListItemDueDate.classList.add("projectListItemDueDate");
  return projectListItemDueDate;
}

function getProjectListTitleOnSubmit(projectInput) {
  const projectListTitle = document.createElement("div");
  projectListTitle.classList.add("projectListTitle");
  projectListTitle.textContent = projectInput.value;
  return projectListTitle;
}

function editProjectItemDueDates() {
  const projectDueDates = document.querySelectorAll(".projectListItemDueDate");
  projectDueDates.forEach((dueDate) => {
    dueDate.addEventListener("click", () => {
      dueDate.textContent = "";

      const editProjectDueDateInput = document.createElement("input");
      editProjectDueDateInput.type = "date";
      editProjectDueDateInput.classList.add("editProjectDueDateInput");

      if (dueDate.parentElement.childNodes.length == 2) {
        //ensures no more than 1 date input pops up
        dueDate.parentElement.lastChild.remove(); //delete previous x button

        allowOneProjectDateInputPopupAtATime();

        dueDate.parentElement.appendChild(editProjectDueDateInput);

        const newXButton = createProjectItemXButton();
        beAbleToDeleteProjectListItemOnInitialLoad(newXButton);

        dueDate.parentElement.appendChild(newXButton);
      }
      displayProjectDateOnChangeWithCorrectFormat(
        editProjectDueDateInput,
        dueDate
      );
    });
  });
}

//this function is causing the bug
function displayProjectDateOnChangeWithCorrectFormat(
  editProjectDueDateInput,
  dueDate
) {
  editProjectDueDateInput.addEventListener("change", () => {
    let correctDateFormat = new Date(editProjectDueDateInput.value);
    const dayValue = correctDateFormat.getDate() + 1;
    const monthValue = correctDateFormat.getMonth() + 1;
    const yearValue = correctDateFormat.getFullYear();
    correctDateFormat = monthValue + "/" + dayValue + "/" + yearValue;

    dueDate.textContent = correctDateFormat;
    editProjectDueDateInput.remove();
    const currentHeader = document.querySelector(".toDoListItemsHeader");
    const specificProjectLocalStorageList =
      JSON.parse(localStorage.getItem(currentHeader.textContent)) || [];
    specificProjectLocalStorageList.forEach((element) => {
      //matching the title of the due date being selected with local storage
      if (
        dueDate.parentElement.parentElement.firstChild.textContent ==
        element.title
      ) {
        element.dueDate = correctDateFormat;
        localStorage.setItem(
          currentHeader.textContent,
          JSON.stringify(specificProjectLocalStorageList)
        );
      }
    });
  });
}

function deleteProjectListItemOnReload() {
  const listOfXButtons = document.querySelectorAll(".projectListItemXButton");
  const currentHeader = document.querySelector(".toDoListItemsHeader");

  listOfXButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const specificProjectLocalStorageList =
        JSON.parse(localStorage.getItem(currentHeader.textContent)) || [];
      specificProjectLocalStorageList.splice(
        button.parentElement.parentElement.getAttribute("data-index"),
        1
      );
      //removing list element
      button.parentElement.parentElement.remove();
      localStorage.setItem(
        currentHeader.textContent,
        JSON.stringify(specificProjectLocalStorageList)
      );
      removeDataIndexOnProjectListItems();
      setDataIndexOnProjectListItems();
    });
  });
}

function allowOneProjectDateInputPopupAtATime() {
  const allProjectInputs = document.querySelector(".editProjectDueDateInput");
  const currentHeader = document.querySelector(".toDoListItemsHeader");
  const projectLocalStorageItem = JSON.parse(
    localStorage.getItem(currentHeader.textContent)
  );

  projectLocalStorageItem.forEach((element) => {
    if (allProjectInputs !== null && allProjectInputs.parentElement !== null) {
      if (
        element.title ==
        allProjectInputs.parentElement.parentElement.firstChild.textContent
      ) {
        allProjectInputs.parentElement.firstChild.textContent = element.dueDate;
        allProjectInputs.remove();
      }
    }
  });
}

let projectInputPopup = false;

function editProjectTitle() {
  const projectListTitle = document.querySelectorAll(".projectListTitle");

  if (projectListTitle.length > 0) {
    projectListTitle.forEach((element) => {
      element.addEventListener("click", () => {
        //if container does not already have input class, add one
        //prevents more than one input being added to list

        if (element.parentElement.children.length < 3 && !projectInputPopup) {
          const editProjectTitleInput = document.createElement("input");
          editProjectTitleInput.type = "text";
          editProjectTitleInput.classList.add("editProjectTitleInput");
          let originalTitleBeforeEdit = element.textContent;
          element.textContent = "";

          const addProjectTitleEditButton = document.createElement("button");
          addProjectTitleEditButton.classList = "addProjectTitleEditButton";
          addProjectTitleEditButton.textContent = "Edit";

          const cancelProjectTitleEditButton = document.createElement("button");
          cancelProjectTitleEditButton.classList =
            "cancelProjectTitleEditButton";
          cancelProjectTitleEditButton.textContent = "Cancel";

          const circleIcon = element.parentElement.firstChild;
          circleIcon.style.visibility = "hidden";

          element.parentElement.style.gridTemplateColumns =
            ".1fr .1fr 1fr .5fr .8fr";
          element.parentElement.style.columnGap = "0px";

          element.parentElement.appendChild(editProjectTitleInput);
          element.parentElement.appendChild(addProjectTitleEditButton);
          element.parentElement.appendChild(cancelProjectTitleEditButton);

          projectInputPopup = true;

          changeProjectTitle(originalTitleBeforeEdit, element);
          cancelButtonForEditingProjectTitle(originalTitleBeforeEdit, element);
        }
      });
    });
  }
}

//when input is open to edit the title, then change the local storage value to match
function changeProjectTitle(originalTitleBeforeEdit, title) {
  const editProjectTitleInput = document.querySelector(
    ".editProjectTitleInput"
  );
  const addProjectTitleEditButton = document.querySelector(
    ".addProjectTitleEditButton"
  );
  const cancelProjectTitleEditButton = document.querySelector(
    ".cancelProjectTitleEditButton"
  );
  const currentHeader = document.querySelector(".toDoListItemsHeader");
  const specificProjectLocalStorageList = JSON.parse(
    localStorage.getItem(currentHeader.textContent)
  );
  const newProjectTitleListArray = [];
  addProjectTitleEditButton.addEventListener("click", () => {
    if (editProjectTitleInput.value !== "") {
      projectInputPopup = false;
      title.textContent = editProjectTitleInput.value;
      const projectTitleList = document.querySelectorAll(".projectListTitle");
      projectTitleList.forEach((element) => {
        newProjectTitleListArray.push(element.textContent);
      });
      const indexOfNewProjectTitle = newProjectTitleListArray.findIndex(
        (title) => title === editProjectTitleInput.value
      );
      specificProjectLocalStorageList[indexOfNewProjectTitle].title =
        editProjectTitleInput.value;
      localStorage.setItem(
        currentHeader.textContent,
        JSON.stringify(specificProjectLocalStorageList)
      );
    }
    const circleIcon = addProjectTitleEditButton.parentElement.firstChild;
    circleIcon.style.visibility = "visible";

    if (editProjectTitleInput.value == "") {
      title.textContent = originalTitleBeforeEdit;
      remakeProjectEventListenerAfterBlankTitleEdit();
    }

    addProjectTitleEditButton.parentElement.style.gridTemplateColumns =
      ".1fr 2fr";
    addProjectTitleEditButton.parentElement.style.columnGap = "10px";
    editProjectTitleInput.remove();
    addProjectTitleEditButton.remove();
    cancelProjectTitleEditButton.remove();
  });
}

function cancelButtonForEditingProjectTitle(oldTitle, elementClass) {
  const cancelProjectTitleEditButton = document.querySelector(
    ".cancelProjectTitleEditButton"
  );
  if (cancelProjectTitleEditButton) {
    cancelProjectTitleEditButton.addEventListener("click", () => {
      projectInputPopup = false;
      const editProjectTitleInput = document.querySelector(
        ".editProjectTitleInput"
      );
      const addProjectTitleEditButton = document.querySelector(
        ".addProjectTitleEditButton"
      );
      elementClass.textContent = oldTitle;
      const circleIcon = cancelProjectTitleEditButton.parentElement.firstChild;
      circleIcon.style.visibility = "visible";

      cancelProjectTitleEditButton.parentElement.style.gridTemplateColumns =
        ".1fr 2fr";
      cancelProjectTitleEditButton.parentElement.style.columnGap = "10px";

      editProjectTitleInput.remove();
      addProjectTitleEditButton.remove();
      cancelProjectTitleEditButton.remove();
    });
  }
}

function remakeProjectEventListenerAfterBlankTitleEdit() {
  const projectListTitle = document.querySelectorAll(".projectListTitle") || [];
  projectListTitle.forEach((element) => {
    element.addEventListener("click", () => {
      //if container does not already have input class, add one
      //prevents more than one input being added to list

      if (element.parentElement.children.length < 3 && !inputPopup) {
        const editProjectTitleInput = document.createElement("input");
        editProjectTitleInput.type = "text";
        editProjectTitleInput.classList.add("editTitleInput");
        let originalTitleBeforeEdit = element.textContent;
        element.textContent = "";
        const circleIcon = element.parentElement.firstChild;
        circleIcon.style.visibility = "hidden";
        const addProjectTitleEditButton = document.createElement("button");
        addProjectTitleEditButton.classList = "addTitleEditButton";
        addProjectTitleEditButton.textContent = "Edit";
        const cancelProjectTitleEditButton = document.createElement("button");
        cancelProjectTitleEditButton.classList = "cancelTitleEditButton";
        cancelProjectTitleEditButton.textContent = "Cancel";
        //Formatting the input container while it is display, reset after
        element.parentElement.style.gridTemplateColumns =
          ".1fr .1fr 1fr .5fr .8fr";
        element.parentElement.style.columnGap = "0px";

        element.parentElement.appendChild(editProjectTitleInput);
        element.parentElement.appendChild(addProjectTitleEditButton);
        element.parentElement.appendChild(cancelProjectTitleEditButton);
        inputPopup = true;
        changeProjectTitle(originalTitleBeforeEdit, element);
        cancelButtonForEditingProjectTitle(originalTitleBeforeEdit, element);
      }
    });
  });
}

//CLEAN UP YOUR PROJECTS CODE
//when you switch to project input, make sure the add and cancel button are closed
//then delete the input