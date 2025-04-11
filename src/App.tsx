import './App.css'
import { Header } from '@components/Header'
import { Courses } from '@components/Courses'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Registration } from '@components/Registration';
import { CourseInfo } from '@components/CourseInfo';
import { Login } from '@components/Login';
import { CourseForm } from '@components/CourseForm/CourseForm';
import { mockedCoursesList } from '@constants';
import { useState } from 'react';

function App() {
  const [allCourses, setAllCourses] = useState(mockedCoursesList);
  console.log('all courses ', allCourses)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/courses' element={<Courses courses={allCourses} />} />
        <Route path='/courses/add' element={<CourseForm addCourse={setAllCourses} />} />
        <Route path='/courses/:courseId' element={<CourseInfo courses={allCourses} />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to={'/courses'} />} />
      </Routes>
    </>
  )
}

export default App
