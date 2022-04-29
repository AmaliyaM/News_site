import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import './style.css';

export default function SearchPanel(props) {
  const { filterChange } = props;
  const [stateFilter, setStateFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const handleChangeFilter = (event) => {
    setStateFilter(event.target.value);
  };

  const handleChangeInput = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClickAddNews = () => {
    dispatch({ type: 'SHOW_MODAL_ADD_NEWS', payload: true });
  };

  useEffect(() => {
    filterChange({ field: stateFilter.toLowerCase(), value: searchValue.toLowerCase() });
  }, [stateFilter, searchValue, filterChange]);

  return (
    <div className="controlContainer">
      <FormControl className="formControl">
        <InputLabel htmlFor="age-native-simple">Search by</InputLabel>
        <Select
          native
          value={stateFilter}
          onChange={handleChangeFilter}
          inputProps={{
            name: 'filter',
            id: 'filter-native-simple',
          }}
        >
          <option aria-label="All" value="All"> All</option>
          <option value="Author">Author</option>
          <option value="Tags">Tags</option>
        </Select>
      </FormControl>
      <Paper component="form" className="root">
        <InputBase
          value={searchValue}
          className="input"
          placeholder="Search news"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleChangeInput}
        />
        <Divider className="divider" orientation="vertical" />
      </Paper>
      <IconButton type="submit" onClick={handleClickAddNews} className="iconButton" aria-label="add">
        <AddCircleIcon />
      </IconButton>
    </div>
  );
}

SearchPanel.propTypes = {
  filterChange: PropTypes.func.isRequired,
};
