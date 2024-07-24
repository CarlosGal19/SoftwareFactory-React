import Forums from '../../components/Home/Forums';
import Posts from '../../components/Home/Posts';
import Friends from '../../components/Home/Friends';

const Home = () => {

  return (
    <>
      <div className='md:flex'>
        <Forums />
        <div className="mt-16 mx-8 w-2/3 text-center">
          <h2 className='text-8xl font-bold mt-2'>Welcome to most recent UTMA info</h2>
          <Posts />
        </div>
        <Friends />
    </div>
    </>

  )
}

export default Home;
