import React from "react";
import { useGetUsersQuery } from "../store/user/userSlice";
import { User } from "../types/type";

const ExampleComponent: React.FC = () => {
  const { data, error, isLoading } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred!</div>;

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {data?.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleComponent;
