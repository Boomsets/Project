import { useEffect, useState } from 'react';
import './Popup.css';

function Popup({ task, onClose, onSave }) {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      onClose();
      onSave(updatedTask); 
    }
  };

  const handleOverlayClick = (evt) => {
    if (evt.target.className === 'popupOverlay') {
      onClose();
      onSave(updatedTask); 
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [updatedTask]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUpdatedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault(); 
    onClose();
    onSave(updatedTask); 
  };

  return (
    <div className="popupOverlay" onClick={handleOverlayClick}>
      <div className="popup">
        <h2>Редактировать задачу</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={handleChange}
            placeholder="Название задачи"
          />
          <textarea
            name="description"
            value={updatedTask.description}
            onChange={handleChange}
            placeholder="Описание задачи"
          />
          <input
            type="date"
            name="date"
            value={updatedTask.date}
            onChange={handleChange}
          />
          <input
            type="time"
            name="time"
            value={updatedTask.time}
            onChange={handleChange}
          />
          <button type="submit" className="saveButton">Сохранить</button>
        </form>
        <button className="closeButton" onClick={() => {
          onClose();
          onSave(updatedTask); 
        }}>✖</button>
      </div>
    </div>
  );
}

export default Popup;
