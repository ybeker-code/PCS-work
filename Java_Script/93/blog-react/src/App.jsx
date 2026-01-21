import { useState, useEffect } from 'react'
import './App.css'
import Heading from './Heading'
import SubTitle from './SubTitle'
import getData from './fetch'
import Path from './Path'
import BackButton from './backButton'
import Blogs from './Blogs'
import Posts from './Posts'
import Comments from './Comments'

function App() {

  const [blogsMap, setBlogsMap] = useState([]);
  const [subTitleText, setSubTitleText] = useState('');
  const [thePath, setThePath] = useState([]);
  const [current, setCurrent] = useState(0);
  const pages = ['Blogs', 'Posts', 'Comments'];
  const [blogsId, setBlogsId] = useState([]);
  let backButton;

  useEffect(() => {
    (async () => {
      const blogs = await getData(0);
      setBlogsMap(blogs.map(element => ({
        username: `Username:  ${element.username}`,
        companyName: `Company Name:  ${element.company.name}`,
        companyCatchPhrase: `Catch Phrase:  ${element.company.catchPhrase}`,
        companybs: `bs:  ${element.company.bs}`,
        website: `website:  ${element.website}`,
        email: `email:  ${element.email}`
      })))
      const temp = blogs.map(element => element.id);
      setBlogsId(temp);
    })();
  }, []);

  if (current > 0) {
    backButton = <BackButton thePath={thePath} setThePath={setThePath} current={current}
      setCurrent={setCurrent} pages={pages} />
  } else { backButton = null }

  return (
    <>
      <Heading />
      <SubTitle title={subTitleText} pages={pages} current={current} />

      {<Path thePath={thePath} setThePath={setThePath} />}
      {backButton}
      {/* {pageElements[current]} */}
      {current === 0 && (
        <Blogs
          blogsMap={blogsMap}
          blogsId={blogsId}
          setCurrent={setCurrent}
          thePath={thePath}
          setThePath={setThePath}
          current={current}
        />
      )}
      {current === 1 && (
        <Posts
          thePath={thePath}
          setThePath={setThePath}
          current={current}
          setCurrent={setCurrent}
        />
      )}
      {current === 2 && (
        <Comments thePath={thePath} current={current} />
      )}
    </>
  );
}

export default App
