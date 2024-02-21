import "./App.css";
import {useState} from "react";
import {useHotkeys} from "./utils/hotkeys";

const IPSEM_LONG =
  "Inderdaad, ik ken vele mensen, die nogal ophebben met hun Amsterdamse neven, vooral als ze tot 'Lezers in Felix behoren, of als ze een rijtuig houden; maar ik heb dikwijls verbaasd gestaan over mijn verregaande koelheid omtrent de persoon van mijn neef Nurks; en niets verschrikkelijker, dan wanneer hij mij zaterdagmiddag per diligence een steen stond met een brief er aan, inhoudende dat hij (mits het weer goedbleef en er niet, maar dat kwam er nooit, het een of ander in de weg kwam) met mij de dag in de Haarlemmerhout zou komen doorbrengen; niet dat ik iets tegen het gemelde bos heb, maar wel tegen ZEd.";
const IPSUM =
  "Onbegrijpelijk veel mensen hebben familiebetrekkingen, vrienden of kennissen te Amsterdam. Het is een verschijnsel dat ik eenvoudig toeschrijf aan de veelheid der inwoners van die hoofdstad. Ik had er voor een paar jaren nog een verre neef. Waar hij nu is, weet ik niet. Ik geloof dat hij naar de West gegaan is. Misschien heeft de een of ander van mijn lezers hem wel brieven meegegeven.";

function App() {
  const [tab, setCurrentTabs] = useState([0, 0]);

  const openMenu = () => {
    alert("Je heb het menu geopend");
  };

  const toMainContent = () => {
    focusElement(document.querySelector("main"));
  };

  const leaveDocument = () => {
    alert("Je hebt het document verlaten!");
  };

  const focusElement = (element: HTMLOrSVGElement | null) => {
    if (element == null) {
      return;
    }

    if (element.focus) {
      element.focus();
    }
  };

  const focusElementByTab = (tab: string) => {
    console.log(tab);
    const element = document.querySelector(
      `[data-tab-id='${tab}']`
    ) as HTMLOrSVGElement | null;

    focusElement(element);
  };

  const min = 1;
  const max = 5;

  useHotkeys("m", openMenu);

  useHotkeys("f", leaveDocument);

  useHotkeys("space", toMainContent);

  useHotkeys("up", () => focusElement(document.getElementById("nav")));
  useHotkeys("down", () => focusElement(document.getElementById("footer")));

  useHotkeys("left", () => focusElementByTab(`${tab[0] - 1}-${1}`));
  useHotkeys("right", () => focusElementByTab(`${tab[0] + 1}-${1}`));

  useHotkeys("shift+left", () => focusElementByTab(`${min}-${1}`));
  useHotkeys("shift+right", () => focusElementByTab(`${max}-${1}`));

  const renderTab = (
    x: number,
    y: number,
    as: "div" | "aside" | "main" | "footer" | "nav",
    content?: string
  ) => {
    const tabY = y + 1;
    const tabX = x + 1;
    const tab = `${tabX}-${tabY}`;
    const Element = as;

    return (
      <Element
        tabIndex={0}
        data-tab-id={tab}
        aria-label={content}
        className="text-center focus:bg-red-300 ring-1 ring-red-200 flex flex-col py-5 items-center justify-center focus:outline-none"
        onFocus={() => setCurrentTabs([tabX, tabY])}
      >
        <h2 aria-label="Titel">{content}</h2>
        <p aria-label="Hoofdtekst">{as === "main" ? IPSEM_LONG : IPSUM}</p>
      </Element>
    );
  };

  return (
    <>
      <div className="absolute left-0 right-0">
        <h1
          aria-label="Document"
          role="contentinfo"
          aria-description="Navigeer door gebruik te maken van de pijljes op je toetsenbord."
        >
          The Next Web, Navigeer door gebruik te maken van de pijljes op je
          toetsenbord.
        </h1>
        <button
          className="focus:text-red-500 focus:outline-none"
          onClick={openMenu}
        >
          Ga naar het menu, sneltoets: "M"
        </button>
        <button
          className="focus:text-red-500 focus:outline-none"
          onClick={toMainContent}
        >
          Ga naar de inhoud, sneltoets: "spatie"
        </button>
        <button
          className="focus:text-red-500 focus:outline-none"
          onClick={leaveDocument}
        >
          Verlaat dit document, sneltoets: "F"
        </button>
      </div>
      <div className="h-screen grid  grid-rows-[auto,1fr,auto]">
        <header
          autoFocus
          tabIndex={0}
          onFocus={() => setCurrentTabs([3, 1])}
          id="nav"
          aria-label="Introductie"
          className="text-center focus:bg-red-300 ring-1 ring-red-200 flex flex-col py-5 items-center justify-center focus:outline-none"
        >
          <h2 aria-label="Titel">Introductie</h2>
          <p aria-label="Hoofdtekst">{IPSUM}</p>
        </header>

        <div className="grid grid-cols-5 justify-center">
          {renderTab(0, 0, "aside", "Notities onderzoek")}
          {renderTab(1, 0, "aside", "College")}
          {renderTab(2, 0, "main", "Hoofd Inhoud")}
          {renderTab(3, 0, "aside", "Notities")}
          <aside
            tabIndex={0}
            data-tab-id="5-1"
            aria-label={"Mijn mening"}
            className="text-center focus:bg-red-300 ring-1 ring-red-200 flex flex-col py-5 items-center justify-center focus:outline-none"
            onFocus={() => setCurrentTabs([5, 1])}
          >
            <h2 aria-label="Titel">Mijn mening over het prototype</h2>
            <label htmlFor="story">Vertel ons je mening:</label>
            <textarea
              id="story"
              name="story"
              className="ring-1 ring-red-300"
              rows={5}
              cols={33}
              placeholder="Ik vond het..."
            ></textarea>
            <button type="submit" aria-label="Verstuur" className="bg-red-100">
              Verstuur mening
            </button>
          </aside>
        </div>
        <footer
          tabIndex={0}
          onFocus={() => setCurrentTabs([3, 1])}
          id="footer"
          aria-label="Bronnen"
          className="text-center focus:bg-red-300 ring-1 ring-red-200 flex flex-col py-5 items-center justify-center focus:outline-none"
        >
          <h2 aria-label="Titel">Bronnen</h2>
          <ul role="list">
            <li role="listitem">
              <a
                target="_blank"
                href="https://nos.nl/artikel/2509735-explosief-in-tas-aangehouden-man-vlaardingen-verband-met-aanslagen-loodgieter-onderzocht"
              >
                Bron Nos
              </a>
            </li>
            <li role="listitem">
              <a
                target="_blank"
                href="https://nos.nl/artikel/2509735-explosief-in-tas-aangehouden-man-vlaardingen-verband-met-aanslagen-loodgieter-onderzocht"
              >
                Bron 2
              </a>
            </li>
            <li role="listitem">
              <a
                target="_blank"
                href="https://nos.nl/artikel/2509735-explosief-in-tas-aangehouden-man-vlaardingen-verband-met-aanslagen-loodgieter-onderzocht"
              >
                Bron 3
              </a>
            </li>
            <li role="listitem">
              <a
                target="_blank"
                href="https://nos.nl/artikel/2509735-explosief-in-tas-aangehouden-man-vlaardingen-verband-met-aanslagen-loodgieter-onderzocht"
              >
                Bron 4
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default App;
