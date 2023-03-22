import React, { useState, useEffect, useContext } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [requests, setRequests] = useState(0)
  const [isloading, setIsLoading] = useState(false)
  const [error, setError] = useState({ show: false, msg: '' })

  const searchGitHubUser = async (user) => {
    //toggleError
    toggleError()

    //setLoading
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )
    if (response) {
      setGithubUser(response.data)
      const { login, followers_url } = response.data
      //repos
      console.log('`1', `${rootUrl}/users/repos?per_page=100`)
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) =>
        setRepos(response.data)
      )
      //followers
      axios(`${followers_url}?per_page=100`).then((response) =>
        setFollowers(response.data)
      )
    } else {
      toggleError(true, 'There is no user with this username')
    }
    checkRequests()
    setIsLoading(false)
  }

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then((data) => {
        let {
          rate: { remaining },
        } = data.data
        // remaining = 0
        setRequests(remaining)
        if (remaining == 0) {
          toggleError(true, 'sorry, you exceeded your hourly rate limit!')
        }
      })
      .catch((err) => console.log(err))
  }
  function toggleError(show = false, msg = '') {
    setError({ show, msg })
  }
  useEffect(() => {
    checkRequests()
  }, [])

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGitHubUser,
        isloading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}
export const useGlobalContext = () => useContext(GithubContext)

export { GithubContext, GithubProvider }
