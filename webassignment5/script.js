// Assignment #5 - JavaScript Basics
// Student: Nurzhan Bakirov | Group: SE-2524
// Each page has data-task="0" to "8". Only the corresponding task runs.

document.addEventListener('DOMContentLoaded', function () {
  const task = document.body.dataset.task;

  if (task === '0') {
    // Task 0: print the student's information and show an alert.
    console.log('Name: Nurzhan Bakirov');
    console.log('Group: SE-2524');
    const message = 'Hello, JavaScript World!';
    alert(message);
    document.getElementById('show-alert').addEventListener('click', function () {
      alert(message);
    });
  }

  if (task === '1') {
    // Task 1: different data types, arithmetic, and concatenation.
    const studentName = 'Nurzhan Bakirov'; // string
    const firstNumber = 12;               // number
    const secondNumber = 4;                // number
    const isStudent = true;                // boolean

    console.log('String:', studentName);
    console.log('Number:', firstNumber);
    console.log('Boolean:', isStudent);
    console.log('Addition:', firstNumber + secondNumber);
    console.log('Subtraction:', firstNumber - secondNumber);
    console.log('Multiplication:', firstNumber * secondNumber);
    console.log('Division:', firstNumber / secondNumber);
    console.log('Concatenation:', 'Hello, ' + studentName + '!');
  }

  if (task === '2') {
    // Task 2: change a paragraph with textContent after a click.
    const paragraph = document.getElementById('change-paragraph');
    document.getElementById('change-text').addEventListener('click', function () {
      paragraph.textContent = 'The paragraph text has been changed using JavaScript!';
    });
  }

  if (task === '3') {
    // Task 3: change a div's background and its text's font size.
    const block = document.getElementById('style-block');
    const blockText = document.getElementById('style-text');
    document.getElementById('change-color').addEventListener('click', function () {
      block.style.backgroundColor = '#e2b994';
    });
    document.getElementById('change-size').addEventListener('click', function () {
      blockText.style.fontSize = '24px';
    });
  }

  if (task === '4') {
    // Task 4: create and remove list elements.
    const list = document.getElementById('item-list');
    let nextItemNumber = 3;

    document.getElementById('add-item').addEventListener('click', function () {
      const item = document.createElement('li');
      item.textContent = 'Item ' + nextItemNumber;
      list.appendChild(item);
      nextItemNumber++;
    });
    document.getElementById('remove-item').addEventListener('click', function () {
      if (list.lastElementChild) {
        list.lastElementChild.remove();
      }
    });
  }

  if (task === '5') {
    // Task 5: mouseover changes color; mouseout restores it.
    const box = document.getElementById('mouse-box');
    box.addEventListener('mouseover', function () {
      box.style.backgroundColor = '#81543a';
      box.style.color = '#fffaf4';
    });
    box.addEventListener('mouseout', function () {
      box.style.backgroundColor = '#eadbcb';
      box.style.color = '#5d3b28';
    });
  }

  if (task === '6') {
    // Task 6: show the current input value on each keyup.
    const input = document.getElementById('keyboard-input');
    const preview = document.getElementById('keyboard-preview');
    input.addEventListener('keyup', function () {
      preview.textContent = input.value || 'Your text will appear here.';
    });
  }

  if (task === '7') {
    // Task 7: a basic calculator with four arithmetic operations.
    const first = document.getElementById('first-number');
    const second = document.getElementById('second-number');
    const resultOutput = document.getElementById('calculator-result');

    document.querySelectorAll('[data-operation]').forEach(function (button) {
      button.addEventListener('click', function () {
        if (first.value.trim() === '' || second.value.trim() === '') {
          resultOutput.textContent = 'Please enter two numbers.';
          return;
        }

        const a = Number(first.value);
        const b = Number(second.value);
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
          resultOutput.textContent = 'Please enter valid numbers.';
          return;
        }

        const operation = button.dataset.operation;
        let answer;
        if (operation === 'add') answer = a + b;
        if (operation === 'subtract') answer = a - b;
        if (operation === 'multiply') answer = a * b;
        if (operation === 'divide') {
          if (b === 0) {
            resultOutput.textContent = 'Cannot divide by zero.';
            return;
          }
          answer = a / b;
        }
        resultOutput.textContent = 'Result: ' + Number(answer.toPrecision(12));
      });
    });
  }

  if (task === '8') {
    // Task 8: data is stored only in a JavaScript array (not localStorage).
    const tasks = [];
    let nextId = 1;
    const form = document.getElementById('todo-form');
    const input = document.getElementById('new-task');
    const list = document.getElementById('todo-list');
    const count = document.getElementById('todo-count');
    const empty = document.getElementById('todo-empty');

    function renderTasks() {
      list.innerHTML = '';
      empty.hidden = tasks.length !== 0;
      count.textContent = tasks.length + (tasks.length === 1 ? ' task' : ' tasks');

      tasks.forEach(function (taskItem) {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = taskItem.completed;
        checkbox.setAttribute('aria-label', 'Mark ' + taskItem.text + ' as completed');
        checkbox.addEventListener('change', function () {
          taskItem.completed = checkbox.checked;
          renderTasks();
        });

        const title = document.createElement('label');
        title.textContent = taskItem.text;
        if (taskItem.completed) title.classList.add('completed');
        title.addEventListener('click', function () {
          taskItem.completed = !taskItem.completed;
          renderTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('aria-label', 'Delete ' + taskItem.text);
        deleteButton.addEventListener('click', function () {
          const index = tasks.findIndex(function (item) { return item.id === taskItem.id; });
          if (index !== -1) tasks.splice(index, 1);
          renderTasks();
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(title);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
      });
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const value = input.value.trim();
      if (value === '') {
        input.focus();
        return;
      }
      tasks.push({ id: nextId++, text: value, completed: false });
      input.value = '';
      renderTasks();
      input.focus();
    });

    renderTasks();
  }
});
