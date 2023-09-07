import Feed from '@components/Feed';
const Home = () => {
  return (
    <section className="w-full flex-col flex-center">
        <h1 className="head_text text-center">
            Create & Share
            <br className="max-md:hidden"/>
            <span className="violet_gradient text-center"> AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">Create and Discover AI prompts with the all new Open-Source AI-powered Prompting tool.</p>
        <Feed />
    </section>
  )
}

export default Home;