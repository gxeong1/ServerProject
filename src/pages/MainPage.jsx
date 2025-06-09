import { useState } from 'react';
import CalendarComponents from '../components/CalendarComponents'
import Sidebar from '../components/SideBar';
import ScheduleCreate from '../components/ScheduleCreate';
import CreateButton from '../components/CreateButton';
import Popup from '../components/PopUp';

const MainPage = () => {
  return (
    <div>
      <Popup/>
      <Sidebar></Sidebar>
      <CalendarComponents />
    </div>
  );
};

export default MainPage;