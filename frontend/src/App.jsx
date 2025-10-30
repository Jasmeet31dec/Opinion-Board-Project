import { Header } from './components/Header';
import { Opinions } from './components/Opinions';
import { NewOpinion } from './components/NewOpinion';
import { OpinionsContextProvider } from './store/opinions-context';

import { Fragment, useState } from 'react';
import Options from './components/security_components/Options';
import { UserProvider } from './store/userContext';
import { NotificationProvider } from './store/notification-context';
import Filtering from './components/Filtering';
import ProfilePage from './components/ProfilePage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileView, setProfileView] = useState(false);
  const [userId, setUserId] = useState(null);
  return (
    <NotificationProvider>
      <UserProvider>
        {!loggedIn ?
          <Options loggedIn={setLoggedIn} />
          : <>
            <Header loggedIn={setLoggedIn} setProfile={setProfileView} profile={profileView} />
            <main>
              <OpinionsContextProvider>
                {profileView ? <ProfilePage /> : <>
                  <NewOpinion />
                  <Filtering />
                  <Opinions />
                </>}
              </OpinionsContextProvider>
            </main>
          </>}
      </UserProvider>
    </NotificationProvider>
  );
}

export default App;
