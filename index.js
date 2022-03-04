showNotes();
      let add = document.getElementById(`add`);
      let remove = document.getElementById(`remove`);

      add.addEventListener(`click`, () => {
        locStorageInitialization();
        console.log(notes);
      });

      document.getElementById(`task`).addEventListener(`keyup`, (e) => {
        if (e.keyCode === 13) {  // keyCode for enter is 13
            e.preventDefault();
            locStorageInitialization();
          }
      });
      remove.addEventListener(`click`, (e) => {
        let inputTextValue = document.getElementById(`task`);
        notes = localStorage.getItem("notes");
        let ul = document.querySelector(`#list`);
        if (notes == null) {
          notesArr = [];
        } else {
          notesArr = JSON.parse(notes);
        }
        if (ul.childElementCount > 0) {
          console.log(ul.childElementCount);
          let lastChild = ul.lastElementChild;
          ul.removeChild(lastChild);
          notesArr.pop();
          console.log(notesArr);
          localStorage.setItem("notes", JSON.stringify(notesArr));
          showNotes();
        } else {
          inputTextValue.value = "";
          alert("Task list is already empty");
        }
      });

      function showNotes() {
        notes = localStorage.getItem("notes");
        let ul = document.querySelector(`#list`);
        if (notes == null) {
          notesArr = [];
        } else {
          notesArr = JSON.parse(notes);
        }
        let html = "";
        notesArr.forEach((element, index) => {
          let inputTextValue = document.getElementById(`task`);
          html += `<li class="items">
            <div class="items-content">
              <p>${index + 1}.  ${element}</p>
            </div>
            <div class="items-btns">
              <button class="btn btn-edit">Edit</button>
              <button class="btn btn-delete">Delete</button>
            </div>
          </li>`;
          if (notesArr.length != 0) {
            ul.innerHTML = html;
          }
          inputTextValue.value = "";
        });
      }
      function locStorageInitialization(){
        let inputTextValue = document.getElementById(`task`);
        let notes = localStorage.getItem("notes");
        if (notes == null) {
          notesArr = [];
        } else {
          notesArr = JSON.parse(notes);
        }
        
        if(/^\s+[A-z 0-9]/.test(inputTextValue.value)){
          alert("Please don't give spaces at the beginning of the sentence")

        }
        else if (/^\s+/.test(inputTextValue.value) || inputTextValue.value.length <= 0) {
          alert("write down your task first");
        } else {
          notesArr.push(inputTextValue.value);
          localStorage.setItem("notes", JSON.stringify(notesArr));
          showNotes();
        }

      }
