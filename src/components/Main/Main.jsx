import { useState, useEffect } from 'react';
import './Main.css';
import Popup from '../Popup/Popup.jsx';

function Main() {
  const [task, setTask] = useState({ title: '' });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('localStorageTasks'));
    return savedTasks ? savedTasks : [];
  });
  const [filter, setFilter] = useState('all');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleInputChange = (evt) => {
    setTask({ title: evt.target.value });
  };

  const handleAddTask = (evt) => {
    evt.preventDefault();
    if (task.title) {
      const newTask = { title: task.title, id: Date.now(), completed: false, description: '', date: '', time: '' };
      setTasks([...tasks, newTask]);
      setTask({ title: '' });
    }
  };

  const toggleTaskCompletion = (id, evt) => {
    evt.stopPropagation(); // Останавливаем всплытие события
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleFilterTasksChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  const handleOpenPopup = (task) => {
    setSelectedTask(task);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  useEffect(() => {
    localStorage.setItem('localStorageTasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="Main">
      <div className="toDoList">
        <h2 className="listTitle">Список задач</h2>
        <div className="filterButtons">
          <button className='filterButton' onClick={() => handleFilterTasksChange('all')}>Все</button>
          <button className='filterButton' onClick={() => handleFilterTasksChange('completed')}>Выполненные</button>
          <button className='filterButton' onClick={() => handleFilterTasksChange('incomplete')}>Невыполненные</button>
        </div>
        {filteredTasks.map((item) => (
          <div className="task" key={item.id} onClick={() => handleOpenPopup(item)}>
            <p className={`taskText ${item.completed ? 'completed' : ''}`}>{item.title}</p>
            <p>{item.date ? `Дата: ${item.date}` : ''} {item.time ? `Время: ${item.time}` : ''}</p>
            <button
              className="taskStatusButton"
              onClick={(evt) => toggleTaskCompletion(item.id, evt)} // Передаем событие для остановки всплытия
            >
              {item.completed ? '✓' : '✗'}
            </button>
          </div>
        ))}
      </div>
      <form className="addNewTask" onSubmit={handleAddTask}>
        <input
          className="addNewTaskInput"
          type="text"
          onChange={handleInputChange}
          value={task.title}
          placeholder="Введите задачу"
        />
        <button type="submit" className="addNewTaskButton">Добавить</button>
      </form>

      {isPopupOpen && (
        <Popup
          task={selectedTask}
          onClose={handleClosePopup}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
}

export default Main;
