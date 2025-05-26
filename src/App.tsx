import './App.css'
import { Header } from '@components/Header'
import { Courses } from '@components/Courses'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Registration } from '@components/Registration';
import { CourseInfo } from '@components/CourseInfo';
import { Login } from '@components/Login';
import { CourseForm } from '@components/CourseForm/CourseForm';
import { useEffect } from 'react';
import { PublicOnlyRoute } from '@components/RouteComponents/PublicOnlyRoute';
import { ProtectedRoute } from '@components/RouteComponents/ProtectedRoute';
import { getAuthors } from '@services';
import { useAuthors } from './hooks/useAuthors';
import { useCourses } from '@hooks';

function App() {
  const { getCourses } = useCourses()
  const { setAuthors } = useAuthors();

  const fetchAllAuthors = async () => {
    const authors = await getAuthors();
    setAuthors(authors.result);
  }

  useEffect(() => {
    getCourses();
    fetchAllAuthors();
  }, []);


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
          <Route path='courses/add' element={<CourseForm />} />
          <Route path='courses/:courseId' element={<CourseInfo />} />
        </Route>

        <Route path='*' element={<Navigate to={'/courses'} />} />
      </Routes>
    </>
  )
}

export default App
