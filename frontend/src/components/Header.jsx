
export function Header({ loggedIn, profile, setProfile }) {

  function handleLogOut() {
    loggedIn(false);
    setProfile(false);
  }

  function handleProfileButtonClick() {
    setProfile(prevValue => !prevValue);
  }
  
  return (
    <header>
      <div id="main-header">
        <h1>OpinionBoard</h1>
        <p>
          Strong opinions, judged by anonymous internet users. What could possibly
          go wrong?
        </p>
        <div className="header-buttons">
          <button
            className={`profile-button ${profile === 'profile' ? 'active' : ''}`}
            onClick={handleProfileButtonClick}
            title="My Profile"
          >
            {/* --- NEW SVG ICON --- */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A1.5 1.5 0 0 1 18 21.75H6a1.5 1.5 0 0 1-1.499-1.632Z" />
            </svg>
          </button>
          <button className="logout-button" onClick={handleLogOut}>Log out</button>
        </div>

      </div>
    </header>


  );
}
