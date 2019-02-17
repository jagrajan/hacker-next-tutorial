import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Layout from '../components/Layout';


class Story extends React.Component {

  static async getInitialProps({ req, res, query }) {

    let story;

    try {
      const storyId = query.id;
      const response = await fetch(`http://node-hnapi.herokuapp.com/item/${storyId}`);
      story = await response.json();
      
    } catch (err) {
      console.log(err);
      story = null;
    }

    return { story };
  }

  render() {

    const { story } = this.props;

    if (!story) {
      return <Error statusCode={503}/>;
    }

    return <Layout title={story.title}>
      <main>
        <h1 className="story-title"><a href={story.url}>{story.title}</a></h1>
        <strong>{story.points} points</strong>
        <strong>{story.comments_count} comments</strong>
      </main>
      Story
    </Layout>

    
  }
}

export default Story;