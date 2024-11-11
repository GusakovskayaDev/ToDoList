// Получение доступа к необходимым элементам
const tasks_container = document.querySelector('.tasks_container');
const title = document.getElementById('title');
const desc = document.getElementById('desc');
const add = document.querySelector('.add');
const clear = document.querySelector('.clear');
const complitiedTasks_container = document.querySelector('.complitiedTasks_container');
const popup_block = document.querySelector('.popup_block');

// Собрала в кучу прослушивателей событий
function addEventListeners() {

	const tasks = document.querySelectorAll('.divLeft');
	const popup_block = document.querySelector('.popup_block');
	const popupTitle = document.getElementById('titleHere');
	const descHere = document.getElementById('descHere');

	// Открываем Попап окно
	tasks.forEach(element => {
			element.addEventListener('click', () => {
			popupTitle.innerHTML = element.data.title;
			descHere.innerHTML = element.data.description;
			popup_block.classList.add("displayBlock");
		})
	});

	// Закрываем окно
	const closePopup = document.querySelectorAll('.closePopup');
	closePopup.forEach(element => {
		element.addEventListener('click', () => {
			popup_block.classList.remove("displayBlock");
		})
	});

	// Закрываем окно по нажатию на область
	const popup_container = document.querySelector('.popup_container');
	document.addEventListener('mousedown', (event) => {
		if (!popup_container.contains(event.target)) {
			popup_block.classList.remove("displayBlock");
		}
	});
}

// Модуль, хранящий в себе методы по работе с данными
const dataManager = {
	// Объект, хранящий задачи
	data: [],

	// Вывод записей на страницу
	displayRecord(record) {
    const divTask = document.createElement('div');
    divTask.classList.add('divTask');

		const divLeft = document.createElement('div');
		divLeft.classList.add('divLeft');
		divLeft.data = {title: record.title, description: record.description, completed: record.completed}
		const divRight = document.createElement('div');
		const button = document.createElement('button');
		button.classList.add('delete');
		button.innerHTML = 'Delete';
		button.data = record.title;

    const h2 = document.createElement('h2');
    h2.innerHTML = record.title;

    const p = document.createElement('p');
    p.innerHTML = record.description;

    const divTitle = document.createElement('div');
    divTitle.classList.add('divTitle');

    const completed = document.createElement('p');
    completed.classList.add('completed');
    completed.innerHTML = record.completed ? 'Completed &#x2713;' : '';
	

		divRight.appendChild(button);

		divTitle.appendChild(h2);
		divTitle.appendChild(completed);

		divLeft.appendChild(divTitle);
		divLeft.appendChild(p);

		divTask.appendChild(divLeft);
		divTask.appendChild(divRight);

    tasks_container.appendChild(divTask);

		if(record.completed){
			complitiedTasks_container.appendChild(divTask);
		}

		// Добавляем обработчик удаления
		button.addEventListener('click', () => {
		const index = this.data.findIndex(element => element.title === button.data);
		if (index !== -1) {
			this.removeRecord(index);
			divTask.remove(); // Удаляем элемент из DOM
		}
	});

		// Помечаем задачу сделанной
		const take = document.querySelectorAll('.take');
		take.forEach(element => {
			element.addEventListener('click', () => {
				const titleHere = document.getElementById('titleHere');
				const descHere = document.getElementById('descHere');
				const index = this.data.findIndex(element => element.title === titleHere.innerHTML);
				this.updateRecord(index, {
					title: titleHere.innerHTML,
					description: descHere.innerHTML,
          completed: true
        });
				popup_block.classList.remove("displayBlock");
			})
		});

		// Обновляем данные на странице
		addEventListeners();
  },
	
	// Инициализация данных из localStorage
  async init() {
		tasks_container.innerHTML = '';
		complitiedTasks_container.innerHTML = '';
    const storedData = localStorage.getItem('myData');
    this.data = storedData ? JSON.parse(storedData) : [];
		this.data.forEach(record => this.displayRecord(record));
  },

	// Добавление записи
	 addRecord(record) {
    this.data.push(record);
    this.save();
		this.displayRecord(record);
  },

	// Обновление записи
	updateRecord(index, updatedRecord) {
    this.data[index] = updatedRecord;
    this.save();
		this.init();
  },

	// Удаление записи по индексу
	removeRecord(index) {
		this.data.splice(index, 1);
		this.save();
	},

	// Сохранение данных в localStorage
  save() {
    localStorage.setItem('myData', JSON.stringify(this.data));
  },
}
dataManager.init();

// Добавляем слушателя на кнопку добавления задачи
add.addEventListener('click', () => {
	let letTitle = title.value;
	let letDesc = desc.value;

	let addThis = {
		title: letTitle,
		description: letDesc,
		completed: false,
	}
	dataManager.addRecord(addThis);
	title.value = '';
	desc.value = '';
});

 // Отчистить поля
clear.addEventListener('click', () => {
	title.value = '';
	desc.value = '';
});

