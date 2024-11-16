import { useState, useEffect, useCallback } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { v4 as uuidv4 } from 'uuid';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { BrandInput } from '../../../../components/inputs/BrandInput';
import { SearchIcon } from '../../../../components/interface/icons/SearchIcon';
import '../styles.css';

export const GiphyEditor = () => {
  const [queryGiphyText, setQueryGiphyText] = useState('');
  const [giphyData, setGiphyData] = useState([]);

  const fetchGifs = useCallback(
    async (offset) => {
      const giphyFetch = new GiphyFetch(process.env.REACT_APP_GIPHY_API);
      const result = await giphyFetch.search(queryGiphyText, { offset, limit: 20 });
      setGiphyData(result.data);
      return result;
    },
    [queryGiphyText],
  );

  useEffect(() => {
    fetchGifs(10).then((r) => r);
  }, [fetchGifs]);

  return (
    <div className="giphy-editor-container">
      <div className="giphy-search-wrapper">
        <BrandInput
          leftIcon={<SearchIcon />}
          // rightIcon={<CloseIcon onClick={() => {}} />}
          value={queryGiphyText}
          onChange={({ target: { value } }) => setQueryGiphyText(value)}
          placeholder="Type to search here"
        />
      </div>
      <ReactSortable
        list={giphyData}
        setList={(sortedGifs) => setGiphyData(sortedGifs)}
        clone={(item) => ({ ...item, id: uuidv4() })}
        animation={200}
        group={{
          name: 'giphy-block',
          pull: 'clone',
          put: false,
        }}
        className="giphy-image-container">
        {giphyData.length &&
          giphyData.map((gif) => {
            return (
              <img
                key={gif.id}
                src={gif.images.fixed_height.webp}
                alt={gif.title}
                height={125}
                width={125}
                className="giphy-image"
              />
            );
          })}
      </ReactSortable>
    </div>
  );
};
