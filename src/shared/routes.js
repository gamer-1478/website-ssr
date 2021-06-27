import Home from './Component/pages/Home'
import AboutMe from './Component/pages/about/AboutMe'
import Testimonials from './Component/pages/testimonial/Testimonials'
import GithubRepositories from './Component/pages/gitrepos/GithubRepositories'
import CyborticsHumanoids from './Component/pages/cybortics/CyborticsHumanoid'
import { useEffect } from 'react'
import React from 'react'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about-me',
    exact: true,
    component: AboutMe,
  },
  {
    path: '/testimonials',
    exact: true,
    component: Testimonials
  },
  {
    path: '/github-repos',
    exact: true,
    component: GithubRepositories
  },
  {
    path: '/ai',
    exact: true,
    component: Aihome
  },
  {
    path: '/cybortics-humanoid',
    exact: true,
    component: CyborticsHumanoids
  }
]
function Aihome() {
  return (<>{useEffect(() => {
    window.location.href = "https://sway.office.com/92QqdnEbHCOkIfjA?ref=Link"
  }, [])}</>)
  
}

export default routes