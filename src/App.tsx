import './App.css'
import { Header } from '@components/Header'
import { Courses } from '@components/Courses'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Registration } from '@components/Registration';
import { CourseInfo } from '@components/CourseInfo';
import { Login } from '@components/Login';
import { CourseForm } from '@components/CourseForm/CourseForm';
import { mockedCoursesList } from '@constants';
import { useEffect, useState } from 'react';
import { PublicOnlyRoute } from '@components/RouteComponents/PublicOnlyRoute';
import { ProtectedRoute } from '@components/RouteComponents/ProtectedRoute';
import { useDispatch } from 'react-redux';
import { getCourses } from '@services';
import { setCourses } from '@store/coursesSlice';

function App() {
  const [allCourses, setAllCourses] = useState(mockedCoursesList);
  const dispatch = useDispatch();

  const fetchAllCourses = async () => {
    const courses = await getCourses();
    dispatch(setCourses(courses));
  }
  useEffect(() => {
    fetchAllCourses();
  });


  return (
    <>
      <Header />
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path='registration' element={<Registration />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='courses' element={<Courses />} />
          <Route path='courses/add' element={<CourseForm addCourse={setAllCourses} />} />
          <Route path='courses/:courseId' element={<CourseInfo />} />
        </Route>

        <Route path='*' element={<Navigate to={'/courses'} />} />
      </Routes>
    </>
  )
}

export default App
