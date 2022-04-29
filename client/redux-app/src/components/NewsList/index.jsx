import React, { useMemo, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import PropTypes from 'prop-types';

import NewsItem from '../NewsItem';

import './style.css';

export default function NewsList(props) {
  const { filter, dataNews } = props;
  const [page, setPage] = useState(1);

  const filteredNewsList = useMemo(() => {
    const { field, value } = filter;
    switch (field) {
      case 'author':
        return dataNews.filter((item) => item.author?.toLowerCase().includes(value));
      case 'tags':
        return dataNews.filter((item) => item.tags?.toLowerCase().includes(value));
      default:
        return dataNews.filter((item) => item.author?.toLowerCase().includes(value)
          || item.tags?.toLowerCase().includes(value)
          || item.text?.toLowerCase().includes(value)
          || item.theme?.toLowerCase().includes(value));
    }
  }, [filter, dataNews]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const paginatedNewsList = useMemo(() => filteredNewsList.slice((page - 1) * 10, page * 10 - 1),
    [page, filteredNewsList]);

  return (
    <div className="mainContainer">
      {paginatedNewsList.map((news) => (
        <NewsItem
          key={news.id}
          news={news}
        />
      ))}
      {Boolean(filteredNewsList.length) && (
      <Pagination
        count={Math.ceil(filteredNewsList.length / 10)}
        page={page}
        onChange={handleChange}
      />
      )}

    </div>
  );
}
NewsList.propTypes = {
  filter: PropTypes.string.isRequired,
  dataNews: PropTypes.arrayOf(PropTypes.shape({
    author_id: PropTypes.number,
    author_name: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.number,
    tags: PropTypes.string,
    text: PropTypes.string,
    theme: PropTypes.string,
    updatedAt: PropTypes.string,
  })).isRequired,
};
