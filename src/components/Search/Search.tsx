import Fuse, {FuseOptionKey, IFuseOptions} from "fuse.js";
import {useHotkeys} from "../../utils/hotkeys";
import {useEffect, useRef, useState} from "react";
interface SearchProps<T> {
  list: ReadonlyArray<T>;
  keys: FuseOptionKey<T>[];
  onResult?: (results: T[]) => void;
}

function Search<T>({list, keys, onResult = () => {}}: SearchProps<T>) {
  const ref = useRef(null);
  const [query, setQuery] = useState<string | null>(null);
  const [key, setKey] = useState<FuseOptionKey<T> | null>(null);

  const setFocus = () => {
    if (ref.current === null) {
      return;
    }

    const element = ref.current as HTMLDivElement;

    element.focus();
  };

  useHotkeys("cmd+f", (event) => {
    event.preventDefault();
    setFocus();

    return false;
  });

  useEffect(() => {
    const search = (query: string, key: FuseOptionKey<T> | null) => {
      const options: IFuseOptions<T> = {
        includeScore: true,
        keys: key ? [key] : keys,
        threshold: key ? 0.2 : 0.5,
      };

      const fuse = new Fuse(list, options);
      const result = fuse.search(query);
      console.log(result);

      const documents: T[] = result.map((result) => result.item) || [];
      onResult(query.length > 1 ? documents : (list as T[]));
    };

    search(query || "", key);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, key]);

  return (
    <div
      ref={ref}
      tabIndex={0}
      data-testid="Search"
      data-component-name="Search"
      aria-labelledby="zoeken"
      id="search-box"
      className="ring-1 ring-red-300 py-3 focus:outline-none focus:bg-red-300"
    >
      <h2 id="zoeken">Zoeken in documenten</h2>
      <label htmlFor="search-key">Kies een zoektype:</label>
      <select
        id="search-key"
        className="ring-1 ring-red-200 focus:outline-none focus:bg-red-200"
        onChange={(event) => {
          const targetKey = event.target.value;
          setKey(targetKey !== "0" ? targetKey : null);
        }}
      >
        <option value="0">alles</option>
        {keys.map((key, i) => (
          <option key={i} value={key.toString()}>
            {key.toString()}
          </option>
        ))}
      </select>

      <label htmlFor="search-query">Zoek op tekst:</label>
      <input
        id="search-query"
        className="ring-1 ring-red-200 focus:outline-none focus:bg-red-200"
        type="text"
        value={query || ""}
        onChange={(event) => {
          const query = event.target.value;

          setQuery(query.length > 0 ? query : null);
        }}
      />
      <button
        className="ring-1 ring-red-200 focus:outline-none focus:bg-red-200"
        onClick={() => {
          setQuery(null);
          setKey(null);
        }}
      >
        Wis huidige zoekopdracht
      </button>
    </div>
  );
}

export default Search;
