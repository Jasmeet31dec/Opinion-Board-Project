import { createContext, useContext, useEffect, useState } from 'react';
import { useNotification } from '../hooks/useNotification';
import { UserContext } from './userContext';

export const OpinionsContext = createContext({
  opinions: null,
  sortedOpinions: null,
  loadUserOpinions: () => { },
  userOpinions: null,
  setSortedOpinions: () => { },
  mostVoted: () => { },
  latestOpinions: () => { },
  categoryFiltering: () => { },
  searching: () => { },
  addOpinion: (opinion) => { },
  deleteOpinion: (id) => { },
  upvoteOpinion: (id) => { },
  downvoteOpinion: (id) => { },
});

export function OpinionsContextProvider({ children }) {
  const { user } = useContext(UserContext);
  const { showNotification } = useNotification();
  const [opinions, setOpinions] = useState();
  const [sortedOpinions, setSortedOpinions] = useState(null);
  const [userOpinions, setUserOpinions] = useState(null);

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch('http://localhost:8080/opinion');
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  useEffect(() => {
    async function loadUserOpinions(userEmail) {
      try {
        const response = await fetch("http://localhost:8080/opinion/email/" + userEmail);
        if (!response.ok) {
          showNotification(
            "Error occurred!",
            "something went wrong."
          );
          return;
        }
        const opinions = await response.json();
        setUserOpinions(opinions);
      } catch (e) {
        console.log('user opinions not fetched');
      }
    }

    if (user?.email) {
      const userEmail = user.email;/*user? user.email : 'taran@gmail.com';*/
      loadUserOpinions(userEmail);
    }
  }, [user?.email,opinions]);

  async function mostVoted() {
    const response = await fetch('http://localhost:8080/opinion/mostVoted');
    if (!response.ok) {
      showNotification(
        "Error occurred!",
        "something went wrong."
      );
      return;
    }

    const savedOpinion = await response.json();
    setSortedOpinions(savedOpinion);
  }

  async function latestOpinions() {
    const response = await fetch('http://localhost:8080/opinion/latest');
    if (!response.ok) {
      showNotification(
        "Error occurred!",
        "something went wrong."
      );
      return;
    }

    const savedOpinion = await response.json();
    setSortedOpinions(savedOpinion);
  }

  //category filtering
  async function categoryFiltering(categoryName) {
    const response = await fetch('http://localhost:8080/opinion/category/' + categoryName);
    if (!response.ok) {
      showNotification(
        "Error occurred!",
        "something went wrong."
      );
      return;
    }

    const savedOpinion = await response.json();
    setSortedOpinions(savedOpinion);
  }

  //searching
  async function searching(searchQuery) {
    const response = await fetch(`http://localhost:8080/opinion/search/${searchQuery}`);
    if (!response.ok) {
      showNotification(
        "Error occurred!",
        "something went wrong."
      );
      return;
    }

    const savedOpinion = await response.json();
    setSortedOpinions(savedOpinion);
  }

  async function addOpinion(enteredOpinionData) {
    const response = await fetch('http://localhost:8080/opinion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
    setSortedOpinions(null);
  }

  //delete opinion
  async function deleteOpinion(id) {
    const response = await fetch('http://localhost:8080/opinion/' + id,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      return;
    }

    setOpinions((prev) => {
      return prev.filter((o)=> o._id !== id )
    });

    setUserOpinions((prev) => {
      return prev.filter((o)=> o._id !== id )
    });

    showNotification(
      "Successfully deleted",
      ""
    );
  }

  async function upvoteOpinion(id, userId) {
    const response = await fetch(`http://localhost:8080/opinion/${id}/upvotes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId
      })
    });

    if (!response.ok) {
      if (response.status === 400) {
        /*alert("Already upvoted");*/
        showNotification(
          "Already Upvoted!",
          "You've already cast your vote on this opinion."
        );
      } else {
        showNotification(
          "Upvoted Successfully",
          "you have switched from downvote to upvote."
        );
      }
      return;
    }

    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes + 1 };
        }
        return opinion;
      });
    });
  }

  async function downvoteOpinion(id, userId) {
    const response = await fetch(`http://localhost:8080/opinion/${id}/downvotes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId
      })
    });

    if (!response.ok) {
      if (response.status === 400) {
        /*alert("Already downvoted");*/
        showNotification(
          "Already Downvoted!",
          "You've already cast your vote on this opinion."
        );
      } else {
        showNotification(
          "Downvoted Successfully",
          "you have switched from upvote to downvote."
        );
      }
      return;
    }
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes - 1 };
        }
        return opinion;
      });
    });
  }

  const contextValue = {
    opinions: opinions,
    sortedOpinions: sortedOpinions,
    userOpinions: userOpinions,
    setSortedOpinions,
    latestOpinions,
    mostVoted,
    categoryFiltering,
    searching,
    addOpinion,
    upvoteOpinion,
    deleteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}
