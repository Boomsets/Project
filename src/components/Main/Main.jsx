import { useState, useEffect } from 'react';
import './Main.css';

function Main() {
  const [task, setTask] = useState({ title: '' });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('localStorageTasks'));
    return savedTasks ? savedTasks : [];
  });
  
  const [filter, setFilter] = useState('all'); // Фильтр задач

  const handleInputChange = (evt) => {
    setTask({ title: evt.target.value });
  };

  const handleAddTask = (evt) => {
    evt.preventDefault();
    if (task.title) {
      const newTask = { title: task.title, id: Date.now(), completed: false };
      setTasks([...tasks, newTask]);
      setTask({ title: '' });
    }
  };

  const toggleTaskCompletion = (id) => {
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
          <div className="task" key={item.id}>
            <p className={`taskText ${item.completed ? 'completed' : ''}`}>{item.title}</p>
            <button className="taskStatusButton" onClick={() => toggleTaskCompletion(item.id)}>
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
    </div>
  );
}

export default Main;