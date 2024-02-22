import {useState} from "react";
import {toSnakecase} from "../../utils/id";
import {useHotkeys} from "../../utils/hotkeys";
import Search from "../Search/Search";

interface DocumentsOverviewProps {}

interface DocumentData {
  title: string;
  tags: string[];
}

// const TAG_OPTIONS = [
//   "Onderzoek",
//   "User Experience Design",
//   "User Interface Design",
//   "Concepting",
//   "Testen",
// ];

const DOCUMENTS_DATA: DocumentData[] = [
  {
    title: "Voorstel voor Gebruikersinterface Ontwerp",
    tags: ["User Interface Design", "Concepting"],
  },
  {
    title: "Analyse van Gebruikersbehoeften",
    tags: ["Onderzoek", "User Experience Design"],
  },
  {
    title: "Wireframes voor Mobiele Applicatie",
    tags: ["User Interface Design", "Concepting"],
  },
  {
    title: "Kleurpalet en Typografie Onderzoek",
    tags: ["Onderzoek", "User Interface Design"],
  },
  {
    title: "Interactieontwerp voor Webapplicatie",
    tags: ["User Interface Design", "Concepting"],
  },
  {
    title: "Gebruikerservaringsonderzoek",
    tags: ["Onderzoek", "User Experience Design"],
  },
  {
    title: "Prototyping en Testenplan",
    tags: ["Testen", "User Interface Design"],
  },
  {
    title: "Evaluatie van Bestaande Interfaces",
    tags: ["Testen", "User Interface Design"],
  },
  {
    title: "Visueel Ontwerp voor Website Redesign",
    tags: ["User Interface Design", "Concepting"],
  },
  {
    title: "Gebruikershandleiding voor Ontwerptools",
    tags: ["User Interface Design", "Concepting"],
  },
  {
    title: "Implementatie van Ontwerpelementen",
    tags: ["Implementatie", "User Interface Design"],
  },
  {
    title: "Kwaliteitsborging en Debugging",
    tags: ["Testing", "User Interface Design"],
  },
  {
    title: "Gebruikerstesten en Feedbackverwerking",
    tags: ["Testing", "User Experience Design"],
  },
  {
    title: "Optimalisatie van Gebruikerservaring",
    tags: ["Optimalisatie", "User Experience Design"],
  },
  {
    title: "Ontwikkeling van Stijlgids",
    tags: ["Documentation", "User Interface Design"],
  },
  {
    title: "Gebruikersacceptatietesten",
    tags: ["Testing", "User Experience Design"],
  },
  {
    title: "Iteratieff Ontwerpproces",
    tags: ["Iteratief", "User Interface Design"],
  },
];

function DocumentsOverview({}: DocumentsOverviewProps) {
  const [filteredDocuments, setFilteredDocuments] = useState<
    DocumentData[] | null
  >(null);

  // const filterByTag = (tag: string) => {
  //   const filtered = DOCUMENTS_DATA.filter((document) => {
  //     const tags = document.tags.map(toSnakecase);
  //     return tags.includes(tag);
  //   });
  //   console.log(filtered);

  //   if (filtered.length < 1) {
  //     setFilteredDocuments(null);
  //     return;
  //   }

  //   setFilteredDocuments(filtered);
  // };

  const onResult = (results: DocumentData[]) => {
    console.log();
    setFilteredDocuments(results);
  };

  useHotkeys("space", () => {
    toMainContent();
  });

  const toMainContent = () => {
    const element = document.getElementById("document-0") as HTMLUListElement;
    element.focus();
  };

  const toSearch = () => {
    const element = document.getElementById("search-box") as HTMLUListElement;
    element.focus();
  };

  return (
    <main
      data-testid="DocumentsOverview"
      data-component-name="DocumentsOverview"
      aria-labelledby="documenten"
      role="region"
    >
      <div className="absolute left-0 right-0">
        <h1
          role="contentinfo"
          aria-description="Navigeer door gebruik te maken van de pijljes op je toetsenbord."
        >
          Documenten
        </h1>
        <div className="flex" role="menu">
          <button
            role="menuitem"
            className="focus:text-red-500 focus:outline-none"
            onClick={toSearch}
          >
            Ga naar het menu, sneltoets: "command + f"
          </button>
          <button
            role="menuitem"
            className="focus:text-red-500 focus:outline-none"
            onClick={toMainContent}
          >
            Ga naar de inhoud, sneltoets: "space"
          </button>
        </div>
      </div>
      <Search
        list={DOCUMENTS_DATA}
        keys={["tags", "title"]}
        onResult={onResult}
      />

      {/* <div>
        <label htmlFor="tag-filter">Filter met tag</label>
        <select
          id="tag-filter"
          onChange={(value) => {
            const tag = value.target.value;
            filterByTag(tag);
          }}
          defaultValue={0}
        >
          <option value={0}>Geen filter</option>
          {TAG_OPTIONS.map((tag, i) => (
            <option key={i} value={toSnakecase(tag)}>
              {tag}
            </option>
          ))}
        </select>
      </div> */}

      <ul id="main-content" aria-live="polite" className="flex flex-col">
        {filteredDocuments?.length || 0 > 0 ? (
          (filteredDocuments || DOCUMENTS_DATA).map((document, i) => {
            const id = toSnakecase(document.title);

            return (
              <li key={i}>
                <a
                  id={`document-${0}`}
                  aria-labelledby={id}
                  href="/document"
                  className="flex flex-col text-left focus:bg-red-300 focus:outline-none ring-1 ring-red-300"
                >
                  <h2 id={id} className="font-bold">
                    {document.title}
                  </h2>
                  <ul
                    className="flex gap-x-2"
                    aria-label={`Tags: ${document.tags.join(", ")}`}
                  >
                    {document.tags.map((tag, i) => (
                      <li key={i}>
                        <em>{tag}</em>
                      </li>
                    ))}
                  </ul>
                </a>
              </li>
            );
          })
        ) : (
          <div role="alert">Geen resultaten gevonden...</div>
        )}
      </ul>
    </main>
  );
}

export default DocumentsOverview;
