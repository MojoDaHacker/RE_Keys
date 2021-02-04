import React from 'react'
import '../assets/scss/App.scss'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/Banner'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showcase : {
        Component: false,
        contentKey: null
      }
    }
  }

  render() {
    const portfolioContent = this.props.data.allPortfolioJson.nodes
    const portfolioItems = portfolioContent.map(val => val.name)
    return (
      <Layout location="/">
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title="Mckenzie's Keys"
          meta={[
            { name: 'description', content: 'Real Estate Services by Matthew McKenzie' },
            { name: 'keywords', content: 'Real Estate, Investing, Buying, Selling, Rentals' },
          ]}
        />
        <Banner portfolioItems={portfolioItems} setShowcase={(Component, key) => this.setState({showcase: {Component: Component, contentKey: key}}) }/>
        {this.state.showcase.Component !== false ? <this.state.showcase.Component content={portfolioContent} contentKey={this.state.showcase.contentKey}/> : null}
      </Layout>
    )
  }
}

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
      }
    }
    allPortfolioJson(filter: {show: {eq: true}}) {
      nodes {
        id
        name
        title
        pictures {
          src
          caption
        }
        textContent
      }
    }
  }
`

export default Home
