// src/CustomForm.js
import React from 'react';

const CustomForm = () => (
  <div>
    <label>Event Title:</label>
    <input type="text" id="event_title" name="event_title" />
    <br />
    <label>Description:</label>
    <textarea id="event_description" name="event_description"></textarea>
    <br />
    <button type="button" onClick={() => alert('Form Submitted')}>Submit</button>
  </div>
);

export default CustomForm;
