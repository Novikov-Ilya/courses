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
import { PublicOnlyRoute } from '@components/RouteComponents/PublicOnlyRoute';
import { ProtectedRoute } from '@components/RouteComponents/ProtectedRoute';

function App() {
  const [allCourses, setAllCourses] = useState(mockedCoursesList);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/registration' element={<PublicOnlyRoute />}>
          <Route path='' element={<Registration />} />
        </Route>
        <Route path='/login' element={<PublicOnlyRoute />}>
          <Route path='' element={<Login />} />
        </Route>
        <Route path='/courses' element={<ProtectedRoute />}>
          <Route path='' element={<Courses courses={allCourses} />} />
          <Route path='/courses/add' element={<CourseForm addCourse={setAllCourses} />} />
          <Route path='/courses/:courseId' element={<CourseInfo courses={allCourses} />} />
        </Route>

        <Route path='*' element={<Navigate to={'/courses'} />} />
      </Routes>
    </>
  )
}

export default App
