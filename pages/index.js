import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Link from 'next/link';
import Layout from '../components/Layout';
import StoryList from '../components/StoryList';

class Index extends React.Component {

  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;

    try {
      page = Number(query.page) || 1;
      const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
      stories = await response.json();
    } catch (err) {
      console.log(err);
      stories = [];
    }

    return { stories, page };
  }

  render() {

    const { stories, page } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503}/>;
    }

    return (
      <Layout title="Hacker News" description="A hacker news clone made with next js">
        <StoryList stories={stories} />
        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Next page</a>
          </Link>
        </footer>
      </Layout>
    )
  }
}

export default Index;