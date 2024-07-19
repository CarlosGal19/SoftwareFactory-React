import Forums from '../../components/Home/Forums';
import Posts from '../../components/Home/Posts';
import Friends from '../../components/Home/Friends';

const Home = () => {

  return (
    <>
      <div className='md:flex'>
        <Forums />
        <div className="my-28 mx-8 w-3/5 text-center">
          <h1 className='text-6xl font-bold mb-24'>Welcome to most recent UTMA info</h1>
          <Posts />
        </div>
        <Friends />
    </div>
    </>

  )
}

export default Home;
