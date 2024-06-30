
document.addEventListener("DOMContentLoaded", async function() {
  const studentsArray = await getStudents();

  let table = document.createElement("table");
  table.classList.add("table", "table-success", "table-striped");
  document.body.append(table);
  document.body.classList.add(
    "d-flex",
    "flex-wrap",
    "align-items-baseline",
    "justify-content-between"
  );
  table.classList.add("table", "table-bordered");
  let tableHead = document.createElement("thead");
  let tableBody = document.createElement("tbody");
  table.append(tableHead, tableBody);

  let firstRow = document.createElement("tr");
  firstRow.classList.add("first_row");
  let studentNameHeader = document.createElement("th");
  let nameSortButton = document.createElement("button");
  nameSortButton.classList.add("btn", "btn-primary", "d-inline-flex");
  nameSortButton.type = "button";
  nameSortButton.textContent = "Сортировать";
  studentNameHeader.classList.add("head_row");
  studentNameHeader.innerHTML = "ФИО";
  studentNameHeader.append(nameSortButton);

  let studentFacultyHeader = document.createElement("th");
  let facultySortButton = document.createElement("button");
  facultySortButton.classList.add("btn", "btn-primary", "d-inline-flex");
  facultySortButton.type = "button";
  facultySortButton.textContent = "Сортировать";
  studentFacultyHeader.innerHTML = "Факультет";
  studentFacultyHeader.classList.add("head_row");
  studentFacultyHeader.append(facultySortButton);

  let studentAgeHeader = document.createElement("th");
  let ageSortButton = document.createElement("button");
  ageSortButton.classList.add("btn", "btn-primary", "d-inline-flex");
  ageSortButton.type = "button";
  ageSortButton.textContent = "Сортировать";
  studentAgeHeader.innerHTML = "Дата рождения и возраст";
  studentAgeHeader.classList.add("head_row");
  studentAgeHeader.append(ageSortButton);

  let studyTimeHeader = document.createElement("th");
  let studyTimeSortButton = document.createElement("button");
  studyTimeSortButton.classList.add("btn", "btn-primary", "d-inline-flex");
  studyTimeSortButton.type = "button";
  studyTimeSortButton.textContent = "Сортировать";
  studyTimeHeader.innerHTML = "Годы обучения";
  studyTimeHeader.classList.add("head_row");
  studyTimeHeader.append(studyTimeSortButton);

  let studentDeleteHeader = document.createElement("th");
  studentDeleteHeader.classList.add("head_row");
  

  let form = document.createElement("form");
  let nameInputGroup = document.createElement("div");
  let nameInput = document.createElement("input");
  let addButton = document.createElement("button");

  form.classList.add("align-items-start", "d-flex", "flex-column");
  addButton.classList.add("btn", "btn-primary", "d-inline-flex", "mt-3");
  addButton.type = "submit";
  addButton.textContent = "Добавить студента";
  nameInputGroup.classList.add("col");
  nameInput.classList.add("form-control");
  nameInput.placeholder = "ФИО";
  nameInputGroup.append(nameInput);
  form.append(nameInputGroup);

  let facultyInputGroup = document.createElement("div");
  let facultyInput = document.createElement("input");
  facultyInputGroup.classList.add("col", "mt-3");
  facultyInput.classList.add("form-control");
  facultyInput.placeholder = "Факультет";
  facultyInputGroup.append(facultyInput);
  form.append(facultyInputGroup);

  let dateOfBirthInputGroup = document.createElement("div");
  let dateOfBirthInput = document.createElement("input");
  let dateOfBirthLabel = document.createElement("label");
  dateOfBirthInput.type = "date";
  dateOfBirthInput.setAttribute("date", "date");
  dateOfBirthInput.setAttribute("min", "1900-01-01");
  dateOfBirthInput.setAttribute("max", "2024-06-08");
  dateOfBirthInputGroup.classList.add("col", "mt-3");
  dateOfBirthInput.classList.add("form-control");
  dateOfBirthLabel.textContent = "Дата рождения";
  dateOfBirthLabel.classList.add("mb-2");
  dateOfBirthInputGroup.append(dateOfBirthLabel, dateOfBirthInput);
  form.append(dateOfBirthInputGroup);

  let studyYearInputGroup = document.createElement("div");
  let studyYearInput = document.createElement("input");
  studyYearInputGroup.classList.add("col", "mt-3");
  studyYearInput.classList.add("form-control");
  studyYearInput.placeholder = "Год начала обучения";
  studyYearInput.type = "number";
  numberInputLength(studyYearInput);

  studyYearInputGroup.append(studyYearInput);
  form.append(studyYearInputGroup);
  form.append(addButton);

  let filterForm = document.createElement("form");
  let filterNameBox = document.createElement("div");
  let filterNameInput = document.createElement("input");
  let filterFacultyBox = document.createElement("div");
  let filterFacultyInput = document.createElement("input");
  let filterStartBox = document.createElement("div");
  let filterStartInput = document.createElement("input");
  let filterEndBox = document.createElement("div");
  let filterEndInput = document.createElement("input");
  filterForm.classList.add("align-items-start", "d-flex", "flex-column");
  filterNameBox.classList.add("col", "mt-3");
  filterFacultyBox.classList.add("col", "mt-3");
  filterStartBox.classList.add("col", "mt-3");
  filterEndBox.classList.add("col", "mt-3");
  filterNameInput.classList.add("form-control");
  filterNameInput.placeholder = "Поиск ФИО";
  filterFacultyInput.classList.add("form-control");
  filterFacultyInput.placeholder = "Поиск факультета";
  filterStartInput.classList.add("form-control");
  filterStartInput.type = "number";
  numberInputLength(filterStartInput);
  filterStartInput.placeholder = "Поиск года начала обучения";
  filterEndInput.classList.add("form-control");
  filterEndInput.placeholder = "Поиск года выпуска";
  filterEndInput.type = "number";
  numberInputLength(filterEndInput);
  filterNameBox.append(filterNameInput);
  filterFacultyBox.append(filterFacultyInput);
  filterStartBox.append(filterStartInput);
  filterEndBox.append(filterEndInput);
  filterForm.append(
    filterNameBox,
    filterFacultyBox,
    filterStartBox,
    filterEndBox
  );

  document.body.append(form, filterForm);

  firstRow.append(
    studentNameHeader,
    studentFacultyHeader,
    studentAgeHeader,
    studyTimeHeader,
    studentDeleteHeader
  );
  tableHead.append(firstRow);

  const birthdayFormat = (dOb) => {
    return `${formatDate(dOb)} , ${dateOfBirth(dOb)}`.trim()
       }

       const yearsFormat = (startYear) => {
        return `${Number(startYear)} - ${Number(
          startYear
        ) + 4}, ${
          Number(startYear) + 4 <= new Date().getFullYear()
            ? "(закончил)"
            : `${new Date().getFullYear() -
                Number(startYear) +
                1} курс`
        }`.trim()
           }
  function addOneStudent(studentObj) {
    let studentInformation = document.createElement("tr");
    studentInformation.classList.add("student_row");
    let studentName = document.createElement("td");
    studentName.id = "name";
    studentName.classList.add("student_cell");
    let studentFaculty = document.createElement("td");
    studentFaculty.classList.add("student_cell");
    let studentAge = document.createElement("td");
    studentAge.classList.add("student_cell");
    let studentYears = document.createElement("td");
    studentYears.classList.add("student_cell");
    let studentDeleteCell = document.createElement("td");
    studentDeleteCell.classList.add("student_cell");
    let studentDeleteButton = document.createElement('button')
    studentDeleteButton.classList.add("btn", "btn-danger", "d-inline-flex");
    studentDeleteButton.innerHTML = 'Удалить студента';
    studentDeleteButton.addEventListener('click', function() {
    studentDelete(studentObj.id);
    studentInformation.remove();
    })
    studentDeleteCell.append(studentDeleteButton);
    studentName.textContent = `${studentObj.surname} ${studentObj.name} ${studentObj.lastname}`.trim();
    studentFaculty.textContent = studentObj.faculty;
    studentAge.textContent = birthdayFormat(new Date(studentObj.birthday));
    console.log(typeof studentObj.birthday)
    studentYears.textContent = yearsFormat(studentObj.studyStart);
    console.log(studentObj);
    studentInformation.append(
      studentName,
      studentFaculty,
      studentAge,
      studentYears,
      studentDeleteCell,
    );
    tableBody.append(studentInformation);
    return studentInformation;
  }



  function filter(arr, prop, value) {
    let result = [],
      copy = [...arr];
    for (const item of copy) {
      if (
        String(item[prop])
          .toLowerCase()
          .includes(value) == true
      )
        result.push(item);
    }
    return result;
  }


  async function studentsPost(obj) {
    const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(obj),
      
    });
    const result = await response.json();
    return result;
  }

  async function studentDelete(id) {
    await fetch(`http://localhost:3000/api/students/${id}`, {
      method: 'DELETE',
    });
  }

  async function getStudents() {
    const response = await fetch('http://localhost:3000/api/students')
    const data = await response.json();
    return data
  }

  function createStudentsTable(arr) {
    tableBody.innerHTML = "";
    const nameValue = filterNameInput.value,
      facultyValue = filterFacultyInput.value,
      startYearValue = filterStartInput.value,
      endYearValue = filterEndInput.value;

    let newArr = [...arr];
    if (nameValue !== "") newArr = filter(newArr, "surname", nameValue);
    if (facultyValue !== "")
      newArr = filter(newArr, "faculty", facultyValue.toLowerCase());
    if (startYearValue !== "")
      newArr = filter(newArr, "studyStart", startYearValue);
    if (endYearValue !== "") newArr = filter(newArr, "studyStart", endYearValue);
    for (const student of newArr) {
      addOneStudent(student);
    }
  }

  console.log(studentsArray);
  createStudentsTable(studentsArray);

  filterNameInput.addEventListener("input", function(event) {
    event.preventDefault();
    createStudentsTable(studentsArray);
  });

  filterFacultyInput.addEventListener("input", function(event) {
    event.preventDefault();
    createStudentsTable(studentsArray);
  });

  filterStartInput.addEventListener("input", function(event) {
    event.preventDefault();
    createStudentsTable(studentsArray);
  });

  filterEndInput.addEventListener("input", function(event) {
    event.preventDefault();
    createStudentsTable(studentsArray);
  });


  function validation(form) {
    function removeError(input) {
      const parentInput = input.parentNode;
      const childInput = input;
      if (childInput.classList.contains("border", "border-danger")) {
        parentInput.querySelector(".error-label").remove();
        childInput.classList.remove("border", "border-danger");
      }
    }

    function createError(input, text) {
      const parentInput = input.parentNode;
      const errorLabel = document.createElement("label");
      const childInput = input;
      childInput.classList.add("border", "border-danger");
      errorLabel.classList.add("error-label");
      errorLabel.textContent = text;
      parentInput.append(errorLabel);
    }
    let result = true;
    const allInputs = form.querySelectorAll("input");
    for (const input of allInputs) {
      removeError(input);
      if (input == nameInput) {
        if (nameInput.value.trim() == "") {
          removeError(input);
          createError(input, "Введите ФИО!");
          result = false;
        }
      }

      if (input == facultyInput) {
        if (facultyInput.value.trim() == "") {
          removeError(input);
          createError(input, "Введите название факультета!");
          result = false;
        }
      }

      if (input == dateOfBirthInput) {
        if (dateOfBirthInput.value == "") {
          removeError(input);
          createError(input, "Введите дату рождения!");
          result = false;
        }
      }

      if (input == studyYearInput) {
        if (studyYearInput.value.trim() == "") {
          removeError(studyYearInput);
          createError(studyYearInput, "Введите год начала обучения!");
          result = false;
        } else if (
          studyYearInput.value.trim() < 2000 ||
          studyYearInput.value.trim() > 2024
        ) {
          removeError(studyYearInput);
          createError(
            studyYearInput,
            "Введите корректный год начала обучения!"
          );
          result = false;
        }
      }
    }

    return result;
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (validation(this) == true) {
      let nameStringArr = nameInput.value.trim().split(" ");
      let joinedName = nameStringArr.join("");
      const newStudent = {
        surname:
          nameStringArr[0].charAt(0).toUpperCase() + nameStringArr[0].slice(1),
        name:
          nameStringArr[1].charAt(0).toUpperCase() + nameStringArr[1].slice(1),
        lastname:
          nameStringArr[2].charAt(0).toUpperCase() + nameStringArr[2].slice(1),
        faculty: facultyInput.value.trim().toUpperCase(), 
        fullname: joinedName,
        studyStart: Number(studyYearInput.value),
        endyear: Number(studyYearInput.value) + 4,
        birthday: dateOfBirthInput.valueAsDate,
      };
      const createStd = async () => {
        await studentsPost(newStudent);
        studentsArray.push(newStudent)
        addOneStudent(newStudent);
        nameInput.value = "";
        dateOfBirthInput.value = "";
        facultyInput.value = "";
        studyYearInput.value = "";
      }
createStd()
    }
  });

  function dateOfBirth(date) {
    return (
      ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) |
      0
    );
  }

  function formatDate(date = new Date()) {
    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    let yy = date.getFullYear();
    if (yy < 10) yy = "0" + yy;

    return dd + "." + mm + "." + yy;
  }


  function sortUsers(arr, prop) {
    arr.sort(function(a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      }
      if (a[prop] < b[prop]) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });
  }

  function reverseUsers(arr, prop) {
    arr.reverse(function(a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      }
      if (a[prop] < b[prop]) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });
  }

  function sort(button, arr, prop) {
    button.addEventListener("click", function() {
      sortUsers(arr, prop);
      reverse(button, arr, prop);
      createStudentsTable(arr);
      return arr;
    });
  }

  function reverse(button, arr, prop) {
    button.addEventListener("click", function() {
      reverseUsers(arr, prop);
      createStudentsTable(arr);
    });
  }
  const nameSort = sort(nameSortButton, studentsArray, "surname");
  const facultySort = sort(facultySortButton, studentsArray, "faculty");
  const ageSort = sort(ageSortButton, studentsArray, "birthday");
  const studyYearsSort = sort(studyTimeSortButton, studentsArray, "studyStart");

  function numberInputLength(input) {
    input.addEventListener("input", function() {
      if (input.value.length > 4) {
        input.value = this.value.slice(0, 4);
      }
    });
  }

  return {
    nameSort,
    facultySort,
    ageSort,
    studyYearsSort
  };
});
