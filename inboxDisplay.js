//when inbox button is clicked, switch to inbox display
function switchToInboxDisplay() {
  const inboxDisplayButton = document.querySelector(".inboxDisplayButton");
  const toDoListItemsHeader = document.querySelector(".toDoListItemsHeader");
  inboxDisplayButton.addEventListener("click", () => {
    
    const listItemsHeader = document.querySelector(".listItemsHeader");
  if (listItemsHeader.children.length > 2) {
    const inputFormContainer = document.querySelector(".inputFormContainer");
    inputFormContainer.remove();
    const toDoListItemsAddTask = document.querySelector(".toDoListItemsAddTask")
    toDoListItemsAddTask.style.visibility = "visible";
    toDoListItemsAddTask.textContent = "+ Add Task";
  }
    
  toDoListItemsHeader.textContent = "Inbox";
    const listItemsDisplay = document.querySelector(".listItemsDisplay");
    while (listItemsDisplay.firstChild) {
      listItemsDisplay.firstChild.remove();
    }
    const inboxLocalStorage =
      JSON.parse(localStorage.getItem("inboxToDo")) || [];
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
      setDataIndexOnListItems();
      editTitle();
      editInboxItemDueDates();
    });
    beAbleToDeleteEachInboxListItemOnReload();
  });
}
switchToInboxDisplay();

function getInboxListItemDueDateFromLocalStorage(item) {
  const inboxListItemDueDate = document.createElement("div");
  inboxListItemDueDate.textContent = item.dueDate;
  inboxListItemDueDate.classList.add("inboxListItemDueDate");
  return inboxListItemDueDate;
}

//when add task button is clicked, display input form
function displayInboxToDoInputForm() {
  const toDoListItemsAddTask = document.querySelector(".toDoListItemsAddTask");
  const listItemsHeader = document.querySelector(".listItemsHeader");
  toDoListItemsAddTask.addEventListener("click", () => {
    const inputFormContainer = document.createElement("div");
    inputFormContainer.classList.add("inputFormContainer");
    const inputForm = createInboxInput(toDoListItemsAddTask);
    const inputFormSubmitButton = createAddButton();
    const inputFormCancelButton = createCancelButton();
    toDoListItemsAddTask.style.visibility = "hidden";
    listItemsHeader.appendChild(inputFormContainer);
    inputFormContainer.appendChild(inputForm);
    inputFormContainer.appendChild(inputFormSubmitButton);
    inputFormContainer.appendChild(inputFormCancelButton);
    removeInputContainer();
    submitEachListItem();
  });
}

displayInboxToDoInputForm();

function createCancelButton() {
  const inputFormCancelButton = document.createElement("button");
  inputFormCancelButton.classList.add("inputFormCancel");
  inputFormCancelButton.textContent = "Cancel";
  return inputFormCancelButton;
}

function createAddButton() {
  const inputFormSubmitButton = document.createElement("button");
  inputFormSubmitButton.classList.add("inputFormSubmit");
  inputFormSubmitButton.textContent = "Add";
  return inputFormSubmitButton;
}

function createInboxInput(toDoListItemsAddTask) {
  const inputForm = document.createElement("input");
  inputForm.type = "text";
  inputForm.name = "inboxInput";
  inputForm.classList.add("inboxInput");
  toDoListItemsAddTask.textContent = "";
  return inputForm;
}

//when cancel button is clicked, remove input form and return to "+ Add Task"
function removeInputContainer() {
  const inboxCancelButton = document.querySelector(".inputFormCancel");
  const inputFormContainer = document.querySelector(".inputFormContainer");
  const toDoListItemsAddTask = document.querySelector(".toDoListItemsAddTask");
  inboxCancelButton.addEventListener("click", () => {
    inputFormContainer.remove();
    toDoListItemsAddTask.style.visibility = "visible";
    toDoListItemsAddTask.textContent = "+ Add Task";
  });
}

function submitEachListItem() {
  const inputFormSubmitButton = document.querySelector(".inputFormSubmit");
  const inboxInput = document.querySelector(".inboxInput");
  inputFormSubmitButton.addEventListener("click", () => {
    const toDoListItemsAddTask = document.querySelector(
      ".toDoListItemsAddTask"
    );
    toDoListItemsAddTask.style.visibility = "visible";
    displayNewInputItemOnScreen(inboxInput);
    pushNewItemToLocalStorage(inboxInput);
    setDataIndexOnListItems();
    removeInputForm();
  });
}

function pushNewItemToLocalStorage(inboxInput) {
  let existingInboxToDoItems =
    JSON.parse(localStorage.getItem("inboxToDo")) || [];
  if (inboxInput.value !== "") {
    const newInboxItemName = inboxInput.value;
    const newItem = {
      title: newInboxItemName,
      dueDate: "No Date",
    };
    existingInboxToDoItems.push(newItem);
    localStorage.setItem("inboxToDo", JSON.stringify(existingInboxToDoItems));
  }
}

function removeInputForm() {
  const inputFormContainer = document.querySelector(".inputFormContainer");
  const toDoListItemsAddTask = document.querySelector(".toDoListItemsAddTask");
  inputFormContainer.remove();
  toDoListItemsAddTask.textContent = "+ Add Task";
}

function displayNewInputItemOnScreen(inboxInput) {
  if (inboxInput.value !== "") {
    const inboxListItem = document.createElement("li");
    inboxListItem.classList.add("inboxListItem");
    const inboxListTitle = getInboxListTitleWhenSubmitted(inboxInput);
    const inboxListTitleContainer = document.createElement("div");
    inboxListTitleContainer.classList.add("inboxListTitleContainer");
    const inboxListItemDueDate = getInboxListItemDueDate();
    const inboxListItemXButton = getInboxListItemXButton();
    beAbleToDeleteInboxListItemOnInitialLoad(inboxListItemXButton);
    const dueDateAndX = document.createElement("div");
    dueDateAndX.classList.add("dueDateAndX");
    const listItemsDisplay = document.querySelector(".listItemsDisplay");
    const circleIcon = createCircleIcon();
    listItemsDisplay.appendChild(inboxListItem);
    inboxListItem.appendChild(inboxListTitleContainer);
    inboxListTitleContainer.appendChild(circleIcon);
    inboxListTitleContainer.appendChild(inboxListTitle);
    dueDateAndX.appendChild(inboxListItemDueDate);
    dueDateAndX.appendChild(inboxListItemXButton);
    inboxListItem.appendChild(dueDateAndX);
    editInboxItemDueDates();
    editTitle();
  }
}

function createCircleIcon() {
  const circleIcon = document.createElement("img");
  circleIcon.src = "./icons/circle.png";
  circleIcon.classList.add("circleIcon");
  return circleIcon;
}

function getInboxListItemXButton() {
  const inboxListItemXButton = document.createElement("div");
  inboxListItemXButton.textContent = "X";
  inboxListItemXButton.classList = "inboxListItemXButton";
  return inboxListItemXButton;
}

function getInboxListItemDueDate() {
  const inboxListItemDueDate = document.createElement("div");
  inboxListItemDueDate.textContent = "No Date";
  inboxListItemDueDate.classList.add("inboxListItemDueDate");
  return inboxListItemDueDate;
}

function getInboxListTitleWhenSubmitted(inboxInput) {
  const inboxListTitle = document.createElement("div");
  inboxListTitle.classList.add("inboxListTitle");
  inboxListTitle.textContent = inboxInput.value;
  return inboxListTitle;
}

function getInboxListTitleOnReload(inboxInput) {
  const inboxListTitle = document.createElement("div");
  inboxListTitle.classList.add("inboxListTitle");
  inboxListTitle.textContent = inboxInput.title;
  return inboxListTitle;
}

function setDataIndexOnListItems() {
  const inboxListItems = document.querySelectorAll(".inboxListItem");
  for (let i = 0; i < inboxListItems.length; i++) {
    inboxListItems[i].setAttribute("data-index", i);
  }
}

function removeDataIndexOnListItems() {
  const inboxListTitles = document.querySelectorAll(".inboxListItem");
  for (let i = 0; i < inboxListTitles.length; i++) {
    inboxListTitles[i].removeAttribute("data-index", i);
  }
}

//when you reload page, iterate through local storage to display on page
function displayInboxToDoItemsOnPageReload() {
  const inboxLocalStorageList = JSON.parse(localStorage.getItem("inboxToDo"));
  const listItemsDisplay = document.querySelector(".listItemsDisplay");

  if (inboxLocalStorageList !== null) {
    for (let i = 0; i < inboxLocalStorageList.length; i++) {
      const inboxListItem = document.createElement("li");
      inboxListItem.classList.add("inboxListItem");
      const inboxListTitle = getLocalStorageInboxTitle(
        inboxLocalStorageList,
        i
      );
      const inboxListItemDueDate = getLocalStorageInboxDueDate(
        inboxLocalStorageList,
        i
      );
      const xButton = getInboxListItemXButton();
      const dueDateAndX = document.createElement("div");
      dueDateAndX.classList.add("dueDateAndX");
      const inboxListTitleContainer = document.createElement("div");
      inboxListTitleContainer.classList.add("inboxListTitleContainer");
      const circleIcon = createCircleIcon();

      listItemsDisplay.appendChild(inboxListItem);
      inboxListItem.appendChild(inboxListTitleContainer);
      inboxListTitleContainer.appendChild(circleIcon);
      inboxListTitleContainer.appendChild(inboxListTitle);
      dueDateAndX.appendChild(inboxListItemDueDate);
      dueDateAndX.appendChild(xButton);
      inboxListItem.appendChild(dueDateAndX);
    }
    setDataIndexOnListItems();
    beAbleToDeleteEachInboxListItemOnReload();
    editInboxItemDueDates();
    editTitle();
  }
}

displayInboxToDoItemsOnPageReload();

function getLocalStorageInboxDueDate(inboxLocalStorageList, i) {
  const inboxListItemDueDate = document.createElement("div");
  inboxListItemDueDate.classList.add("inboxListItemDueDate");
  inboxListItemDueDate.textContent = inboxLocalStorageList[i].dueDate;
  return inboxListItemDueDate;
}

function getLocalStorageInboxTitle(inboxLocalStorageList, i) {
  const inboxListTitle = document.createElement("div");
  inboxListTitle.classList.add("inboxListTitle");
  inboxListTitle.textContent = inboxLocalStorageList[i].title;
  return inboxListTitle;
}

function beAbleToDeleteEachInboxListItemOnReload() {
  const xButtons = document.querySelectorAll(".inboxListItemXButton");
  xButtons.forEach((element) => {
    element.addEventListener("click", () => {
      const inboxLocalStorageList =
        JSON.parse(localStorage.getItem("inboxToDo")) || [];
      inboxLocalStorageList.splice(
        element.parentElement.parentElement.getAttribute("data-index"),
        1
      );
      //removing list element
      element.parentElement.parentElement.remove();
      localStorage.setItem("inboxToDo", JSON.stringify(inboxLocalStorageList));
      removeDataIndexOnListItems();
      setDataIndexOnListItems();
    });
  });
}

function beAbleToDeleteInboxListItemOnInitialLoad(inboxListItemXButton) {
  inboxListItemXButton.addEventListener("click", () => {
    const inboxLocalStorageList =
      JSON.parse(localStorage.getItem("inboxToDo")) || [];
    inboxLocalStorageList.splice(
      inboxListItemXButton.parentElement.parentElement.getAttribute(
        "data-index"
      ),
      1
    );
    //removing list element
    inboxListItemXButton.parentElement.parentElement.remove();
    localStorage.setItem("inboxToDo", JSON.stringify(inboxLocalStorageList));
    removeDataIndexOnListItems();
    setDataIndexOnListItems();
  });
}

function editInboxItemDueDates() {
  const inboxDueDates = document.querySelectorAll(".inboxListItemDueDate");
  inboxDueDates.forEach((dueDate) => {
    dueDate.addEventListener("click", () => {
      dueDate.textContent = "";
      const editDueDateInput = document.createElement("input");
      editDueDateInput.type = "date";
      editDueDateInput.classList.add("editDueDateInput");
      if (dueDate.parentElement.childNodes.length == 2) {
        //ensures no more than 1 date input pops up
        dueDate.parentElement.lastChild.remove(); //delete previous x button
        allowOneDateInputPopupAtATime();
        dueDate.parentElement.appendChild(editDueDateInput);
        const newXButton = getInboxListItemXButton();
        beAbleToDeleteInboxListItemOnInitialLoad(newXButton);
        dueDate.parentElement.appendChild(newXButton);
      }
      displayDateOnChangeWithCorrectFormat(editDueDateInput, dueDate);
    });
  });
}

function displayDateOnChangeWithCorrectFormat(editDueDateInput, dueDate) {
  editDueDateInput.addEventListener("change", () => {
    let correctDateFormat = new Date(editDueDateInput.value);
    const dayValue = correctDateFormat.getDate() + 1;
    const monthValue = correctDateFormat.getMonth() + 1;
    const yearValue = correctDateFormat.getFullYear();
    correctDateFormat = monthValue + "/" + dayValue + "/" + yearValue;
    dueDate.textContent = correctDateFormat;
    editDueDateInput.remove();
    const inboxLocalStorageList =
      JSON.parse(localStorage.getItem("inboxToDo")) || [];
    inboxLocalStorageList.forEach((element) => {
      //matching the title of the due date being selected with local storage
      if (
        dueDate.parentElement.parentElement.firstChild.textContent ==
        element.title
      ) {
        element.dueDate = correctDateFormat;
        localStorage.setItem(
          "inboxToDo",
          JSON.stringify(inboxLocalStorageList)
        );
      }
    });
  });
}

function allowOneDateInputPopupAtATime() {
  const allInputs = document.querySelector(".editDueDateInput");
  const localStorageItem = JSON.parse(localStorage.getItem("inboxToDo"));
  localStorageItem.forEach((element) => {
    if (allInputs !== null && allInputs.parentElement !== null) {
      if (
        element.title ==
        allInputs.parentElement.parentElement.firstChild.textContent
      ) {
        allInputs.parentElement.firstChild.textContent = element.dueDate;
        allInputs.remove();
      }
    }
  });
}

let inputPopup = false; //this ensures only one input can be display at a time

function editTitle() {
  const inboxListTitle = document.querySelectorAll(".inboxListTitle") || [];
  inboxListTitle.forEach((element) => {
    element.addEventListener("click", () => {
      //if container does not already have input class, add one
      //prevents more than one input being added to list
      if (element.parentElement.children.length < 3 && !inputPopup) {
        const editTitleInput = document.createElement("input");
        editTitleInput.type = "text";
        editTitleInput.classList.add("editTitleInput");
        let originalTitleBeforeEdit = element.textContent;
        element.textContent = "";
        const circleIcon = element.parentElement.firstChild;
        circleIcon.style.visibility = "hidden";
        const addTitleEditButton = document.createElement("button");
        addTitleEditButton.classList = "addTitleEditButton";
        addTitleEditButton.textContent = "Edit";
        const cancelTitleEditButton = document.createElement("button");
        cancelTitleEditButton.classList = "cancelTitleEditButton";
        cancelTitleEditButton.textContent = "Cancel";
        //Formatting the input container while it is on display, reset after it closes
        element.parentElement.style.gridTemplateColumns =
          ".1fr .1fr 1fr .5fr .8fr";
        element.parentElement.style.columnGap = "0px";

        element.parentElement.appendChild(editTitleInput);
        element.parentElement.appendChild(addTitleEditButton);
        element.parentElement.appendChild(cancelTitleEditButton);
        inputPopup = true;
        changeTitle(originalTitleBeforeEdit, element);
        cancelOutOfEditingTitle(originalTitleBeforeEdit, element);
      }
    });
  });
}
//when input is open to edit the title, then change the local storage value to match
function changeTitle(originalTitleBeforeEdit, currentTitle) {
  const editTitleInput = document.querySelector(".editTitleInput");
  const addTitleEditButton = document.querySelector(".addTitleEditButton");
  const cancelTitleEditButton = document.querySelector(
    ".cancelTitleEditButton"
  );
  const inboxLocalStorageList = JSON.parse(localStorage.getItem("inboxToDo"));
  const newTitleListArray = [];
  addTitleEditButton.addEventListener("click", () => {
    if (editTitleInput.value !== "") {
      inputPopup = false;
      currentTitle.textContent = editTitleInput.value;
      const inboxTitleList = document.querySelectorAll(".inboxListTitle");
      inboxTitleList.forEach((element) => {
        newTitleListArray.push(element.textContent);
      });
      const indexOfNewTitle = newTitleListArray.findIndex(
        (currentTitle) => currentTitle === editTitleInput.value
      );
      inboxLocalStorageList[indexOfNewTitle].title =
        editTitleInput.value;

      localStorage.setItem("inboxToDo", JSON.stringify(inboxLocalStorageList));
    }
    const circleIcon = addTitleEditButton.parentElement.firstChild;
    circleIcon.style.visibility = "visible";
    if (editTitleInput.value == "") {
      currentTitle.textContent = originalTitleBeforeEdit;
      remakeEventListenerAfterBlankTitleEdit();
    }
    addTitleEditButton.parentElement.style.gridTemplateColumns = ".1fr 2fr";
    addTitleEditButton.parentElement.style.columnGap = "10px";
    editTitleInput.remove();
    addTitleEditButton.remove();
    cancelTitleEditButton.remove();
  });
}

function remakeEventListenerAfterBlankTitleEdit() {
  const inboxListTitle = document.querySelectorAll(".inboxListTitle") || [];
  inputPopup = false;
  inboxListTitle.forEach((element) => {
    element.addEventListener("click", () => {
      //if container does not already have input class, add one
      //prevents more than one input being added to list
      if (element.parentElement.children.length < 3 && !inputPopup) {
        const editTitleInput = document.createElement("input");
        editTitleInput.type = "text";
        editTitleInput.classList.add("editTitleInput");
        let originalTitleBeforeEdit = element.textContent;
        element.textContent = "";
        const circleIcon = element.parentElement.firstChild;
        circleIcon.style.visibility = "hidden";
        const addTitleEditButton = document.createElement("button");
        addTitleEditButton.classList = "addTitleEditButton";
        addTitleEditButton.textContent = "Edit";
        const cancelTitleEditButton = document.createElement("button");
        cancelTitleEditButton.classList = "cancelTitleEditButton";
        cancelTitleEditButton.textContent = "Cancel";
        //Formatting the input container while it is display, reset after
        element.parentElement.style.gridTemplateColumns =
          ".1fr .1fr 1fr .5fr .8fr";
        element.parentElement.style.columnGap = "0px";
        element.parentElement.appendChild(editTitleInput);
        element.parentElement.appendChild(addTitleEditButton);
        element.parentElement.appendChild(cancelTitleEditButton);
        inputPopup = true;
        changeTitle(originalTitleBeforeEdit, element);
        cancelOutOfEditingTitle(originalTitleBeforeEdit, element);
      }
    });
  });
}
cancelOutOfEditingTitle();

function cancelOutOfEditingTitle(oldTitle, elementClass) {
  const cancelTitleEditButton = document.querySelector(
    ".cancelTitleEditButton"
  );
  if (cancelTitleEditButton) {
    cancelTitleEditButton.addEventListener("click", () => {
      inputPopup = false;
      const editTitleInput = document.querySelector(".editTitleInput");
      const addTitleEditButton = document.querySelector(".addTitleEditButton");
      elementClass.textContent = oldTitle;
      const circleIcon = cancelTitleEditButton.parentElement.firstChild;
      circleIcon.style.visibility = "visible";
      cancelTitleEditButton.parentElement.style.gridTemplateColumns =
        ".1fr 2fr";
      cancelTitleEditButton.parentElement.style.columnGap = "10px";
      editTitleInput.remove();
      addTitleEditButton.remove();
      cancelTitleEditButton.remove();
    });
  }
}
