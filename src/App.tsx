import { useState } from 'react'
import './App.css'
import { Header } from './components/Header/'
import { Courses } from './components/Courses'
import { mockedCoursesList } from "./constants";
import { CourseInfo } from './components/CourseInfo';
import { SearchBar } from './common/SearchBar';

function App() {
  const [showCourseCard, setShowCourseCard] = useState<string | null>(null);
  const [coursesList, setCoursesList] = useState(mockedCoursesList);
  const [searchValue, setSearchValue] = useState<string>('');

  const showCourse = (id: string) => {
    setShowCourseCard(id)
  }

  const loginAction = () => {

  }

  const backAction = () => {
    setShowCourseCard(null);
  }

  const handleSearchByButtonClick = (searchInputValue: string) => {
    const list = coursesList;
    setCoursesList(() => {
      if (!searchInputValue.trim().length) return mockedCoursesList;
      return list.filter(item => item.title.toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase()))
    })
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if(!e.target.value.trim()) {
      setCoursesList(mockedCoursesList);
    }
  }


  return (
    <>
      <Header handleClick={loginAction} />
      <SearchBar handleSearch={handleSearchByButtonClick} searchValue={searchValue} handleSearchInput={handleSearchInput} />
      {!showCourseCard &&
        <Courses
          coursesList={coursesList}
          buttonClick={showCourse}
        />}
      {showCourseCard && <CourseInfo coursesList={mockedCoursesList} onBack={backAction} showCourseId={showCourseCard!} />}
    </>
  )
}

export default App
