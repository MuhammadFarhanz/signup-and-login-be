Sure! Here are a few examples of how to use JWT tokens in a Next.js frontend application:

Storing JWT token in a cookie:
```javascript
import { useEffect } from 'react';
import { parseCookies } from 'nookies';
import jwtDecode from 'jwt-decode';

const HomePage = ({ token }) => {
  // Access token data
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    // Perform authenticated API requests using the token
    // ...
  }, []);

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <p>User ID: {decodedToken.userId}</p>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};

export default HomePage;
```
Using JWT token for API requests
```javascript
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const UserProfile = ({ token }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const decodedToken = jwtDecode(token);

    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div>
      <h1>User Profile</h1>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
```
In these examples, the JWT token is typically obtained after successful authentication and stored either in a cookie or local storage. Then, the token can be included in API requests as an authorization header to access protected routes or retrieve user-specific data. The jwt-decode library is used to decode the token and access the payload data.




