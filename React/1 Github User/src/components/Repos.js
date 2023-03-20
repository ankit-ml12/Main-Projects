import React from 'react'
import styled from 'styled-components'
import { GithubContext, useGlobalContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = useGlobalContext()

  let languages = repos.reduce((total, item) => {
    const { languages } = item
    if (!languages) return total
    if (!total[languages]) {
      total[languages] = { label: languages, value: 1 }
    } else {
      total[languages] = {
        ...total[languages],
        value: total[languages].value + 1,
      }
    }
    return total
  }, {})
  languages = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={languages} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
