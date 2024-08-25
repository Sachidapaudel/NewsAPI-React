import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?q=trump&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
      document.title = `${props.category} - NewsSpice`;
    updateNews();
     // eslint-disable-next-line
    }, []);

  const fetchMoreData = async () => {
    // Update page state before making the request
    const url = `https://newsapi.org/v2/top-headlines?q=trump&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page+1);  // Correctly update the page using the previous state
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles)); // Concatenate new articles with existing ones
    setTotalResult(parsedData.totalResults); // Update the total result count
  };

  return (
    <>
      <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px'}}>NewsSpice -- Top {props.category} Headlines </h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResult}
        loader={<Spinner />}
      >
        <div className="container">
          <div className='row'>
            {articles && articles.length > 0 ? (
              articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title || ""}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imgUrl={element.urlToImage || ""}
                    url={element.url}
                    author={element.author || "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))
            ) : (
              <p>No articles found</p>
            )}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  pageSize: 4,
  category: 'general',
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  apiKey: PropTypes.string.isRequired,
};

export default News;
