import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

import axiosClient from '../../config/axios';

import TopicItem from '../../components/Admin/TopicItem';
import { TopicType } from '../../Types/Types';
import useAuth from "../../hooks/useAuth";

const Topics: FC = () => {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { jwt } = useAuth();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axiosClient.get('/topics', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setTopics(response.data.topics);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [jwt]);


  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Topics</h1>
      <Link
        to="/admin/create-topic"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 mb-4 inline-block"
      >
        Create New Topic
      </Link>
      <div className="space-y-4">
        {
          loading && (
            <p className="text-lg text-gray-800">Loading topics...</p>
          )
        }
        {
          topics.length === 0 && (
            <p className="text-lg text-gray-800">No topics found.</p>
          )
        }
        {topics.map((topic: TopicType) => (
          <TopicItem key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default Topics;
