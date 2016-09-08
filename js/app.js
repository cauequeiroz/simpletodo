/*
  ------------------------------
	
	Simple To-do
 	Developed by Caue Queiroz

 	Goals: 
 	Create a todo list that can be able to:
 	- Add new tasks
 	- List added tasks
 	- Complete a task
 	- Remove a task
 	- Store everything on localStorage
 	- Complete multiple tasks with SHIFT key pressed

  ------------------------------
*/
(function() {

	var Model = {
		init: function() {
			if ( !localStorage.simpletodo ) {
				localStorage.simpletodo = JSON.stringify([
					{id: 0, name: 'Do something', complete: false},
					{id: 1, name: 'Do something else', complete: true},
					{id: 2, name: 'Do more stuff', complete: true},
					{id: 3, name: 'Do that again', complete: false},
					{id: 4, name: 'Do another stuff', complete: false}
				]);
			}

			this.tasks = JSON.parse(localStorage.simpletodo);
			this.lastTaskID = this.tasks[this.tasks.length-1].id;
		},

		tasks: null,
		lastTaskID: 0,

		addTask: function(name) {
			this.tasks.push({
				id: ++this.lastTaskID,
				name: name,
				complete: false
			});

			this.updateLocalStorage();
		},

		updateLocalStorage: function() {
			localStorage.simpletodo = JSON.stringify(this.tasks);
		}
	}

	var View = {
		init: function() {
			this.$input = document.querySelector('.app-insert input');
			this.$list  = document.querySelector('.app-list ul');

			this.$input.addEventListener('keyup', function(e) {
				if ( e.keyCode === 13 && this.value !== '' ) {
					Octopus.addTask(this.value);
					this.value = '';
				}
			}, false);

			this.render();
		},

		render: function() {
			this.$list.innerHTML = '';

			var tasks = Octopus.getTasks(),
				$li   = null,
				$a    = null;

			for ( var i in tasks ) {
				$li = document.createElement('li');
				$li.setAttribute('class', 'task');
				$li.setAttribute('data-id', tasks[i].id);
				$li.innerText = tasks[i].name;

				if ( tasks[i].complete ) {
					$li.classList.add('task-complete');
				}

				$a = document.createElement('a');
				$a.setAttribute('href', 'javascript:;');
				$a.setAttribute('class', 'remove-task');
				$a.innerText = 'remove';

				$li.appendChild($a);
				this.$list.appendChild($li);
			}
		}
	}

	var Octopus = {
		init: function() {
			Model.init();
			View.init();
		},

		addTask: function(name) {
			Model.addTask(name);
			View.render();
		},

		getTasks: function() {
			return Model.tasks;
		}
	}

	// Initialize application
	Octopus.init();

})();