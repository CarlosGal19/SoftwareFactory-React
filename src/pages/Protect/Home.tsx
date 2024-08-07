import Forums from '../../components/Home/Forums';
import Posts from '../../components/Home/Posts';
import FriendSuggestion from '../../components/Home/FriendSuggestion';

const Home = () => {

  return (
    <>
      <div className='md:flex'>
        <Forums />
        <div className="mt-16 h-auto w-2/3 text-center">
          <h2 className='text-5xl font-bold mt-2'>Welcome to Uconnect Alpha</h2>
          <Posts />
        </div>
        <FriendSuggestion />
      </div>
    </>

  )
}

export default Home;
